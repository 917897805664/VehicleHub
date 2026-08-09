package com.vehiclerental.backend.service.vehicleownerservices;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleChargeResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleDocumentResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleIdResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleMediaResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehiclePricingRequest;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleCharges;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDocuments;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleFeatures;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleMedia;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleChargesRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDetailsRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDocumentsRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleFeaturesRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleMediaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleDetailsService {

    private final VehicleDetailsRepository vehicleDetailsRepository;
    private final VehicleFeaturesRepository vehicleFeaturesRepository;
    private final VehicleMediaRepository vehicleMediaRepository;
    private final VehicleDocumentsRepository vehicleDocumentsRepository;
    private final VehicleChargesRepository vehicleChargesRepository;

    // =========================================================
    // STEP 1
    // =========================================================

    @Transactional
    public VehicleIdResponse addVehicle(AddVehicleRequest request) {

        VehicleDetails vehicle;

        // Existing vehicle = UPDATE
        // No vehicle ID = INSERT
        if (request.getVehicleId() != null) {
            vehicle = getVehicle(request.getVehicleId());
        } else {
            vehicle = new VehicleDetails();
        }

        vehicle.setVehicleName(request.getVehicleName());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setManufacturingYear(request.getManufacturingYear());
        vehicle.setVehicleNo(request.getVehicleNo());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setTransmission(request.getTransmission());
        vehicle.setEngineCapacity(request.getEngineCapacity());
        vehicle.setColor(request.getColor());
        vehicle.setSeatingCapacity(request.getSeatingCapacity());
        vehicle.setMileage(request.getMileage());

        vehicle.setDescription(
                request.getDescription() == null
                        ? ""
                        : request.getDescription().trim()
        );

        VehicleDetails savedVehicle =
                vehicleDetailsRepository.saveAndFlush(vehicle);

        // Remove old features if Step 1 is submitted again.
        vehicleFeaturesRepository.deleteByVehicle(savedVehicle);

        if (request.getFeatures() != null &&
                !request.getFeatures().isEmpty()) {

            Set<String> uniqueFeatures =
                    new HashSet<>(request.getFeatures());

            for (String feature : uniqueFeatures) {

                if (feature == null ||
                        feature.trim().isEmpty()) {
                    continue;
                }

                VehicleFeatures vehicleFeature =
                        new VehicleFeatures();

                vehicleFeature.setFeatureName(
                        feature.trim()
                );

                vehicleFeature.setVehicle(
                        savedVehicle
                );

                vehicleFeaturesRepository.save(
                        vehicleFeature
                );
            }
        }

        return new VehicleIdResponse(
                savedVehicle.getId()
        );
    }

    // =========================================================
    // STEP 2
    // PHOTOS + VIDEOS
    // =========================================================

    @Transactional
    public VehicleMediaResponse saveVehicleMedia(
            Long vehicleId,
            List<MultipartFile> files,
            List<String> categories,
            List<String> mediaTypes)
            throws IOException {

        VehicleDetails vehicle =
                getVehicle(vehicleId);

        // Prevent duplicate media when Step 2 is saved again.
        vehicleMediaRepository.deleteByVehicle(vehicle);

        int uploadedFiles = 0;

        if (files == null || files.isEmpty()) {
            return new VehicleMediaResponse(
                    vehicleId,
                    0
            );
        }

        for (int i = 0; i < files.size(); i++) {

            MultipartFile file = files.get(i);

            if (file == null || file.isEmpty()) {
                continue;
            }

            String category = "ADDITIONAL";

            if (categories != null &&
                    categories.size() > i &&
                    categories.get(i) != null) {

                category = categories.get(i);
            }

            String mediaType = "PHOTO";

            if (mediaTypes != null &&
                    mediaTypes.size() > i &&
                    mediaTypes.get(i) != null) {

                mediaType = mediaTypes.get(i);
            }

            VehicleMedia media =
                    new VehicleMedia();

            media.setVehicle(vehicle);

            media.setMediaType(
                    mediaType.trim().toUpperCase()
            );

            media.setMediaCategory(
                    category.trim().toUpperCase()
            );

            media.setFileName(
                    file.getOriginalFilename()
            );

            media.setContentType(
                    file.getContentType()
            );

            media.setFileSize(
                    file.getSize()
            );

            media.setFileData(
                    file.getBytes()
            );

            vehicleMediaRepository.save(media);

            uploadedFiles++;
        }

        return new VehicleMediaResponse(
                vehicleId,
                uploadedFiles
        );
    }

    // =========================================================
    // STEP 3
    // DOCUMENTS
    // =========================================================

    @Transactional
    public VehicleDocumentResponse saveVehicleDocuments(
            Long vehicleId,
            List<MultipartFile> files,
            List<String> documentTypes)
            throws IOException {

        VehicleDetails vehicle =
                getVehicle(vehicleId);

        // Prevent duplicate documents.
        vehicleDocumentsRepository.deleteByVehicle(vehicle);

        int uploadedDocuments = 0;

        if (files == null || files.isEmpty()) {
            return new VehicleDocumentResponse(
                    vehicleId,
                    0
            );
        }

        for (int i = 0; i < files.size(); i++) {

            MultipartFile file = files.get(i);

            if (file == null || file.isEmpty()) {
                continue;
            }

            if (file.getSize() >
                    5 * 1024 * 1024) {

                throw new IllegalArgumentException(
                        "File size cannot exceed 5MB: "
                                + file.getOriginalFilename()
                );
            }

            String contentType =
                    file.getContentType();

            if (contentType == null ||
                    !(contentType.equals(
                            "application/pdf")
                      || contentType.equals(
                            "image/jpeg")
                      || contentType.equals(
                            "image/png"))) {

                throw new IllegalArgumentException(
                        "Only PDF, JPG and PNG files are allowed."
                );
            }

            String documentType = "OTHER";

            if (documentTypes != null &&
                    documentTypes.size() > i &&
                    documentTypes.get(i) != null) {

                documentType =
                        documentTypes.get(i);
            }

            VehicleDocuments document =
                    new VehicleDocuments();

            document.setVehicle(vehicle);

            document.setDocumentType(
                    documentType.trim().toUpperCase()
            );

            document.setFileName(
                    file.getOriginalFilename()
            );

            document.setContentType(
                    contentType
            );

            document.setFileSize(
                    file.getSize()
            );

            document.setFileData(
                    file.getBytes()
            );

            vehicleDocumentsRepository.save(
                    document
            );

            uploadedDocuments++;
        }

        return new VehicleDocumentResponse(
                vehicleId,
                uploadedDocuments
        );
    }

    // =========================================================
    // STEP 4
    // ALL RENT + CHARGES
    // =========================================================

    @Transactional
    public VehicleChargeResponse saveVehicleCharges(
            Long vehicleId,
            VehiclePricingRequest request) {

        VehicleDetails vehicle =
                getVehicle(vehicleId);

        // Replace old Step 4 values.
        vehicleChargesRepository.deleteByVehicle(vehicle);

        int savedCharges = 0;

        savedCharges += saveIfPresent(
                vehicle,
                "HOURLY_RENT",
                request.getHourlyRent()
                // "HOUR",
                // "Base hourly rent"
        );

        savedCharges += saveIfPresent(
                vehicle,
                "DAILY_RENT",
                request.getDailyRent()
                // "DAY",
                // "Base daily rent"
        );

        savedCharges += saveIfPresent(
                vehicle,
               "WEEKLY_RENT",
                request.getWeeklyRent()
                // "WEEK",
                // "Base weekly rent"
        );

        savedCharges += saveIfPresent(
                vehicle,
                "MONTHLY_RENT",
                request.getMonthlyRent()
                // "MONTH",
                // "Base monthly rent"
        );

        // savedCharges += saveIfPresent(
        //         vehicle,
        //         "EXTRA_KM",
        //         request.getExtraKm(),
        //         "KM",
        //         "Extra kilometer charge"
        // );

        // savedCharges += saveIfPresent(
        //         vehicle,
        //         "FREE_KM_PER_DAY",
        //         request.getFreeKmPerDay(),
        //         "KM/DAY",
        //         "Free kilometers per day"
        // );

        savedCharges += saveIfPresent(
                vehicle,
                "SECURITY_DEPOSIT",
                request.getSecurityDeposit()
                // "FIXED",
                // "Refundable security deposit"
        );

        savedCharges += saveIfPresent(
                vehicle,
                "CLEANING_CHARGES",
                request.getCleaningCharges()
                // "FIXED",
                // "Cleaning charge"
        );

        savedCharges += saveIfPresent(
                vehicle,
                "LATE_RETURN_CHARGES",
                request.getLateReturnCharges()
                // "HOUR",
                // "Late return charge"
        );

        savedCharges += saveIfPresent(
                vehicle,
                "CANCELLATION_CHARGES",
                request.getCancellationCharges()
                // "PERCENT",
                // "Cancellation charge percentage"
        );

        if (request.isEnableDriverCharges()) {

            savedCharges += saveIfPresent(
                    vehicle,
                    "DRIVER_CHARGES",
                    request.getDriverCharges()
                //     "DAY",
                //     "Driver charge per day"
            );
        }

        if (request.isEnableHomeDeliveryCharges()) {

            savedCharges += saveIfPresent(
                    vehicle,
                    "HOME_DELIVERY_CHARGES",
                    request.getHomeDeliveryCharges()
                //     "FIXED",
                //     "Home delivery charge"
            );
        }

        // if (request.isEnablePickUpCharges()) {

        //     savedCharges += saveIfPresent(
        //             vehicle,
        //             "PICKUP_CHARGES",
        //             request.getPickUpCharges()
        //         //     "FIXED",
        //         //     "Pickup charge"
        //     );
        // }

        // if (request.isEnableTollCharges()) {

        //     savedCharges += saveIfPresent(
        //             vehicle,
        //             "TOLL_CHARGES",
        //             request.getTollCharges()
        //         //     "FIXED",
        //         //     "Toll charge"
        //     );
        // }

        // if (request.isEnableParkingCharges()) {

        //     savedCharges += saveIfPresent(
        //             vehicle,
        //             "PARKING_CHARGES",
        //             request.getParkingCharges()
        //         //     "FIXED",
        //         //     "Parking charge"
        //     );
        // }

        // if (request.isEnableNightCharges()) {

        //     savedCharges += saveIfPresent(
        //             vehicle,
        //             "NIGHT_CHARGES",
        //             request.getNightCharges()
        //         //     "FIXED",
        //         //     "Night charge"
        //     );
        // }

        return new VehicleChargeResponse(
                vehicleId,
                savedCharges
        );
    }

    private int saveIfPresent(
            VehicleDetails vehicle,
            String chargeType,
            Double amount
        //     String unit,
        //     String description
        ) {

        if (amount == null) {
            return 0;
        }

        VehicleCharges charge =
                new VehicleCharges();

        charge.setVehicle(vehicle);
        charge.setChargeType(chargeType);
        charge.setAmount(amount);
        // charge.setUnit(unit);
        // charge.setDescription(description);

        vehicleChargesRepository.save(charge);

        return 1;
    }

    private VehicleDetails getVehicle(
            Long vehicleId) {

        return vehicleDetailsRepository
                .findById(vehicleId)
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                "Vehicle not found with ID: "
                                        + vehicleId
                        )
                );
    }
}