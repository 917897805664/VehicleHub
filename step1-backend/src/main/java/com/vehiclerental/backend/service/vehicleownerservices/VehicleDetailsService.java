package com.vehiclerental.backend.service.vehicleownerservices;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleChargeCatalogResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleChargeResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleDocumentCatalogResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleDocumentResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleFeatureCatalogResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleIdResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleMediaCatalogResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleMediaResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehiclePricingRequest;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleCatalogResponse;
import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleCharges;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDocuments;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleFeatures;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleMedia;
import com.vehiclerental.backend.repository.VehicleOwnerRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleChargesRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDetailsRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDocumentsRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleFeaturesRepository;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleMediaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleDetailsService {

    private final VehicleDetailsRepository vehicleDetailsRepository;

    private final VehicleOwnerRepository vehicleOwnerRepository;

    private final VehicleFeaturesRepository vehicleFeaturesRepository;

    private final VehicleMediaRepository vehicleMediaRepository;

    private final VehicleDocumentsRepository vehicleDocumentsRepository;

    private final VehicleChargesRepository vehicleChargesRepository;


    // =========================================================
    // STEP 1
    // ADD / UPDATE VEHICLE
    // =========================================================

    public VehicleIdResponse addVehicle(AddVehicleRequest request) {

        VehicleDetails vehicle;

        if (request.getVehicleId() != null) {

            vehicle = vehicleDetailsRepository
                    .findById(request.getVehicleId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Vehicle not found with ID: "
                                            + request.getVehicleId()
                            )
                    );

        } else {

            vehicle = new VehicleDetails();
        }


        if (request.getOwnerId() != null) {
            VehicleOwner owner = vehicleOwnerRepository.findById(request.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Owner not found with ID: " + request.getOwnerId()));
            vehicle.setOwner(owner);
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
        vehicle.setDescription(request.getDescription());


        VehicleDetails savedVehicle =
                vehicleDetailsRepository.save(vehicle);


        // =====================================================
        // FEATURES
        // =====================================================

        if (request.getFeatures() != null) {

            vehicleFeaturesRepository
                    .deleteByVehicle(savedVehicle);

            Set<String> features =
                    request.getFeatures();

            for (String featureName : features) {

                if (featureName == null ||
                        featureName.trim().isEmpty()) {

                    continue;
                }

                VehicleFeatures feature =
                        new VehicleFeatures();

                feature.setFeatureName(
                        featureName.trim()
                );

                feature.setVehicle(
                        savedVehicle
                );

                vehicleFeaturesRepository.save(
                        feature
                );
            }
        }


        return new VehicleIdResponse(
                savedVehicle.getId()
        );
    }


    // =========================================================
    // STEP 2
    // SAVE VEHICLE MEDIA
    // =========================================================

    public VehicleMediaResponse saveVehicleMedia(
            Long vehicleId,
            List<MultipartFile> files,
            List<String> viewTypes,
            List<String> mediaTypes
    ) throws IOException {

        VehicleDetails vehicle =
                getVehicleEntity(vehicleId);


        if (files == null || files.isEmpty()) {

            return new VehicleMediaResponse(
                    vehicleId,
                    0
            );
        }


        int savedFiles = 0;


        for (int i = 0; i < files.size(); i++) {

            MultipartFile file =
                    files.get(i);

            if (file == null ||
                    file.isEmpty()) {

                continue;
            }


            VehicleMedia media =
                    new VehicleMedia();

            media.setVehicle(vehicle);

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


            String viewType = null;

            if (viewTypes != null &&
                    i < viewTypes.size()) {

                viewType =
                        viewTypes.get(i);
            }

            media.setMediaCategory(
                    viewType
            );


            String mediaType = null;

            if (mediaTypes != null &&
                    i < mediaTypes.size()) {

                mediaType =
                        mediaTypes.get(i);
            }


            if (mediaType == null ||
                    mediaType.trim().isEmpty()) {

                String contentType =
                        file.getContentType();

                if (contentType != null &&
                        contentType.startsWith("video")) {

                    mediaType = "VIDEO";

                } else {

                    mediaType = "IMAGE";
                }
            }


            media.setMediaType(
                    mediaType
            );


            vehicleMediaRepository.save(
                    media
            );

            savedFiles++;
        }


        return new VehicleMediaResponse(
                vehicleId,
                savedFiles
        );
    }


    // =========================================================
    // STEP 3
    // SAVE DOCUMENTS
    // =========================================================

    public VehicleDocumentResponse saveVehicleDocuments(
            Long vehicleId,
            List<MultipartFile> files,
            List<String> documentTypes
    ) throws IOException {

        VehicleDetails vehicle =
                getVehicleEntity(vehicleId);


        if (files == null ||
                files.isEmpty()) {

            return new VehicleDocumentResponse(
                    vehicleId,
                    0
            );
        }


        int savedDocuments = 0;


        for (int i = 0; i < files.size(); i++) {

            MultipartFile file =
                    files.get(i);

            if (file == null ||
                    file.isEmpty()) {

                continue;
            }


            VehicleDocuments document =
                    new VehicleDocuments();

            document.setVehicle(vehicle);

            document.setFileName(
                    file.getOriginalFilename()
            );

            document.setContentType(
                    file.getContentType()
            );

            document.setFileSize(
                    file.getSize()
            );

            document.setFileData(
                    file.getBytes()
            );


            String documentType =
                    "OTHER";


            if (documentTypes != null &&
                    i < documentTypes.size() &&
                    documentTypes.get(i) != null &&
                    !documentTypes.get(i)
                            .trim()
                            .isEmpty()) {

                documentType =
                        documentTypes.get(i);
            }


            document.setDocumentType(
                    documentType
            );


            vehicleDocumentsRepository.save(
                    document
            );

            savedDocuments++;
        }


        return new VehicleDocumentResponse(
                vehicleId,
                savedDocuments
        );
    }


    // =========================================================
    // STEP 4
    // SAVE PRICING
    // =========================================================

    public VehicleChargeResponse saveVehicleCharges(
            Long vehicleId,
            VehiclePricingRequest request
    ) {

        VehicleDetails vehicle =
                getVehicleEntity(vehicleId);


        vehicleChargesRepository
                .deleteByVehicle(vehicle);


        int savedCharges = 0;


        savedCharges += saveCharge(
                vehicle,
                "hourlyRent",
                request.getHourlyRent()
        );

        savedCharges += saveCharge(
                vehicle,
                "dailyRent",
                request.getDailyRent()
        );

        savedCharges += saveCharge(
                vehicle,
                "weeklyRent",
                request.getWeeklyRent()
        );

        savedCharges += saveCharge(
                vehicle,
                "monthlyRent",
                request.getMonthlyRent()
        );

        savedCharges += saveCharge(
                vehicle,
                "securityDeposit",
                request.getSecurityDeposit()
        );

        savedCharges += saveCharge(
                vehicle,
                "cleaningCharges",
                request.getCleaningCharges()
        );

        savedCharges += saveCharge(
                vehicle,
                "lateReturnCharges",
                request.getLateReturnCharges()
        );

        savedCharges += saveCharge(
                vehicle,
                "cancellationCharges",
                request.getCancellationCharges()
        );


        if (request.isEnableDriverCharges()) {

            savedCharges += saveCharge(
                    vehicle,
                    "driverCharges",
                    request.getDriverCharges()
            );
        }


        if (request.isEnableHomeDeliveryCharges()) {

            savedCharges += saveCharge(
                    vehicle,
                    "homeDeliveryCharges",
                    request.getHomeDeliveryCharges()
            );
        }


        return new VehicleChargeResponse(
                vehicleId,
                savedCharges
        );
    }


    // =========================================================
    // SAVE ONE CHARGE
    // =========================================================

    private int saveCharge(
            VehicleDetails vehicle,
            String chargeType,
            Double amount
    ) {

        if (amount == null) {
            return 0;
        }


        VehicleCharges charge =
                new VehicleCharges();

        charge.setVehicle(vehicle);

        charge.setChargeType(
                chargeType
        );

        charge.setAmount(
                amount
        );


        vehicleChargesRepository.save(
                charge
        );


        return 1;
    }


    // =========================================================
    // GET ALL VEHICLES
    // CUSTOMER DASHBOARD
    // OWNER DASHBOARD
    // =========================================================

    @Transactional(readOnly = true)
    public List<VehicleCatalogResponse>
    getAllVehicleCatalog() {

        List<VehicleDetails> vehicles =
                vehicleDetailsRepository.findAll();


        if (vehicles.isEmpty()) {

            return Collections.emptyList();
        }


        return vehicles.stream()
                .map(this::buildVehicleCatalog)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VehicleCatalogResponse> getVehicleCatalogByOwnerId(Long ownerId) {
        if (ownerId == null) {
            return Collections.emptyList();
        }

        VehicleOwner owner = vehicleOwnerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found with ID: " + ownerId));

        List<VehicleDetails> vehicles = vehicleDetailsRepository.findByOwner(owner);

        if (vehicles.isEmpty()) {
            return Collections.emptyList();
        }

        return vehicles.stream()
                .map(this::buildVehicleCatalog)
                .collect(Collectors.toList());
    }


    // =========================================================
    // GET ONE VEHICLE
    // VIEW VEHICLE DETAILS
    // =========================================================

    @Transactional(readOnly = true)
    public VehicleCatalogResponse
    getVehicleCatalogById(Long vehicleId) {

        VehicleDetails vehicle =
                vehicleDetailsRepository
                        .findById(vehicleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vehicle not found with ID: "
                                                + vehicleId
                                )
                        );


        return buildVehicleCatalog(
                vehicle
        );
    }


    // =========================================================
    // BUILD COMPLETE CATALOG RESPONSE
    // =========================================================

    private VehicleCatalogResponse
    buildVehicleCatalog(
            VehicleDetails vehicle
    ) {

        VehicleCatalogResponse response =
                new VehicleCatalogResponse();


        // =====================================================
        // BASIC VEHICLE INFORMATION
        // =====================================================

        response.setId(
                vehicle.getId()
        );

        if (vehicle.getOwner() != null) {
            response.setOwnerId(vehicle.getOwner().getId());
            response.setOwnerName(vehicle.getOwner().getFullName());
            response.setOwnerEmail(vehicle.getOwner().getEmail());
        }

        response.setVehicleName(
                vehicle.getVehicleName()
        );

        response.setVehicleType(
                vehicle.getVehicleType()
        );

        response.setBrand(
                vehicle.getBrand()
        );

        response.setModel(
                vehicle.getModel()
        );

        response.setManufacturingYear(
                vehicle.getManufacturingYear()
        );

        response.setVehicleNo(
                vehicle.getVehicleNo()
        );

        response.setFuelType(
                vehicle.getFuelType()
        );

        response.setTransmission(
                vehicle.getTransmission()
        );

        response.setEngineCapacity(
                vehicle.getEngineCapacity()
        );

        response.setColor(
                vehicle.getColor()
        );

        response.setSeatingCapacity(
                vehicle.getSeatingCapacity()
        );

        response.setMileage(
                vehicle.getMileage()
        );

        response.setDescription(
                vehicle.getDescription()
        );


        // =====================================================
        // FEATURES
        // =====================================================

        List<VehicleFeatures> features =
                vehicleFeaturesRepository
                        .findByVehicle(vehicle);


        List<VehicleFeatureCatalogResponse>
                featureResponses =
                new ArrayList<>();


        for (VehicleFeatures feature :
                features) {

            featureResponses.add(
                    new VehicleFeatureCatalogResponse(
                            feature.getId(),
                            feature.getFeatureName()
                    )
            );
        }


        response.setFeatures(
                featureResponses
        );


        // =====================================================
        // MEDIA
        // =====================================================

        List<VehicleMedia> mediaList =
                vehicleMediaRepository
                        .findByVehicle(vehicle);


        List<VehicleMediaCatalogResponse>
                mediaResponses =
                new ArrayList<>();


        String frontImage = null;


        for (VehicleMedia media :
                mediaList) {

            String base64Data = null;


            if (media.getFileData() != null) {

                base64Data =
                        Base64.getEncoder()
                                .encodeToString(
                                        media.getFileData()
                                );
            }


            VehicleMediaCatalogResponse
                    mediaResponse =
                    new VehicleMediaCatalogResponse(
                            media.getId(),
                            media.getMediaType(),
                            media.getMediaCategory(),
                            media.getFileName(),
                            media.getContentType(),
                            media.getFileSize(),
                            base64Data
                    );


            mediaResponses.add(
                    mediaResponse
            );


            // =================================================
            // FIND FRONT IMAGE
            // =================================================

            if (frontImage == null &&
                    isImage(media) &&
                    isFrontMedia(media)) {

                frontImage =
                        createDataUrl(
                                media.getContentType(),
                                base64Data
                        );
            }
        }


        // If no category is marked FRONT,
        // use first image as front image.
        if (frontImage == null) {

            for (VehicleMedia media :
                    mediaList) {

                if (isImage(media) &&
                        media.getFileData() != null) {

                    String base64 =
                            Base64.getEncoder()
                                    .encodeToString(
                                            media.getFileData()
                                    );


                    frontImage =
                            createDataUrl(
                                    media.getContentType(),
                                    base64
                            );

                    break;
                }
            }
        }


        response.setMedia(
                mediaResponses
        );

        response.setFrontImage(
                frontImage
        );


        // =====================================================
        // DOCUMENTS
        // =====================================================

        List<VehicleDocuments> documents =
                vehicleDocumentsRepository
                        .findByVehicle(vehicle);


        List<VehicleDocumentCatalogResponse>
                documentResponses =
                new ArrayList<>();


        for (VehicleDocuments document :
                documents) {

            String base64Data = null;


            if (document.getFileData() != null) {

                base64Data =
                        Base64.getEncoder()
                                .encodeToString(
                                        document.getFileData()
                                );
            }


            documentResponses.add(
                    new VehicleDocumentCatalogResponse(
                            document.getId(),
                            document.getDocumentType(),
                            document.getFileName(),
                            document.getContentType(),
                            document.getFileSize(),
                            base64Data
                    )
            );
        }


        response.setDocuments(
                documentResponses
        );


        // =====================================================
        // CHARGES
        // =====================================================

        List<VehicleCharges> charges =
                vehicleChargesRepository
                        .findByVehicle(vehicle);


        List<VehicleChargeCatalogResponse>
                chargeResponses =
                new ArrayList<>();


        for (VehicleCharges charge :
                charges) {

            chargeResponses.add(
                    new VehicleChargeCatalogResponse(
                            charge.getId(),
                            charge.getChargeType(),
                            charge.getAmount()
                    )
            );
        }


        response.setCharges(
                chargeResponses
        );


        // =====================================================
        // CONVERT CHARGES TO QUICK PRICING
        // =====================================================

        Map<String, Double> chargeMap =
                charges.stream()
                        .collect(Collectors.toMap(
                                charge ->
                                        normalize(
                                                charge.getChargeType()
                                        ),
                                VehicleCharges::getAmount,
                                (first, second) -> first
                        ));


        response.setHourlyRent(
                chargeMap.get("hourlyrent")
        );

        response.setDailyRent(
                chargeMap.get("dailyrent")
        );

        response.setWeeklyRent(
                chargeMap.get("weeklyrent")
        );

        response.setMonthlyRent(
                chargeMap.get("monthlyrent")
        );

        response.setSecurityDeposit(
                chargeMap.get("securitydeposit")
        );

        response.setCleaningCharges(
                chargeMap.get("cleaningcharges")
        );

        response.setLateReturnCharges(
                chargeMap.get("latereturncharges")
        );

        response.setCancellationCharges(
                chargeMap.get("cancellationcharges")
        );

        response.setDriverCharges(
                chargeMap.get("drivercharges")
        );

        response.setHomeDeliveryCharges(
                chargeMap.get("homedeliverycharges")
        );


        response.setEnableDriverCharges(
                chargeMap.containsKey(
                        "drivercharges"
                )
        );

        response.setEnableHomeDeliveryCharges(
                chargeMap.containsKey(
                        "homedeliverycharges"
                )
        );


        return response;
    }


    // =========================================================
    // GET VEHICLE ENTITY
    // =========================================================

    private VehicleDetails getVehicleEntity(
            Long vehicleId
    ) {

        return vehicleDetailsRepository
                .findById(vehicleId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vehicle not found with ID: "
                                        + vehicleId
                        )
                );
    }


    // =========================================================
    // CHECK IMAGE
    // =========================================================

    private boolean isImage(
            VehicleMedia media
    ) {

        if (media.getContentType() != null &&
                media.getContentType()
                        .toLowerCase()
                        .startsWith("image/")) {

            return true;
        }


        if (media.getMediaType() != null &&
                media.getMediaType()
                        .toLowerCase()
                        .contains("image")) {

            return true;
        }


        return false;
    }


    // =========================================================
    // CHECK FRONT MEDIA
    // =========================================================

    private boolean isFrontMedia(
            VehicleMedia media
    ) {

        if (media.getMediaCategory() == null) {
            return false;
        }


        String category =
                media.getMediaCategory()
                        .trim()
                        .toLowerCase();


        return category.equals("front") ||
                category.equals("frontview") ||
                category.equals("front view") ||
                category.equals("front_image") ||
                category.equals("front image");
    }


    // =========================================================
    // DATA URL
    // =========================================================

    private String createDataUrl(
            String contentType,
            String base64
    ) {

        if (base64 == null) {
            return null;
        }


        if (contentType == null ||
                contentType.trim().isEmpty()) {

            contentType =
                    "image/jpeg";
        }


        return "data:" +
                contentType +
                ";base64," +
                base64;
    }


    // =========================================================
    // NORMALIZE CHARGE TYPE
    // =========================================================

    private String normalize(
            String value
    ) {

        if (value == null) {
            return "";
        }


        return value
                .replace("_", "")
                .replace("-", "")
                .replace(" ", "")
                .trim()
                .toLowerCase(
                        Locale.ROOT
                );
    }
}