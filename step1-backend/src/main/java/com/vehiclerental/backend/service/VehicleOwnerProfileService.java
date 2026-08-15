package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.VehicleOwnerProfileRequest;
import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.entity.VehicleOwnerProfile;
import com.vehiclerental.backend.repository.VehicleOwnerProfileRepository;
import com.vehiclerental.backend.repository.VehicleOwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VehicleOwnerProfileService {

    private final VehicleOwnerRepository vehicleOwnerRepository;
    private final VehicleOwnerProfileRepository profileRepository;

    public VehicleOwnerProfile saveProfile(
            VehicleOwnerProfileRequest request) {

        if (request.getVehicleOwnerId() == null) {
            throw new RuntimeException("Vehicle owner ID is required.");
        }

        VehicleOwner owner = vehicleOwnerRepository
                .findById(request.getVehicleOwnerId())
                .orElseThrow(() ->
                        new RuntimeException("Vehicle owner not found."));

        /*
         * Business registration number is optional.
         *
         * But if owner enters it:
         * GST number and PAN number become mandatory.
         */
        if (request.getBusinessRegistrationNumber() != null
                && !request.getBusinessRegistrationNumber().isBlank()) {

            if (request.getGstNumber() == null
                    || request.getGstNumber().isBlank()) {

                throw new RuntimeException(
                        "GST number is required when Business Registration Number is entered.");
            }

            if (request.getPanNumber() == null
                    || request.getPanNumber().isBlank()) {

                throw new RuntimeException(
                        "PAN number is required when Business Registration Number is entered.");
            }
        }

        VehicleOwnerProfile profile =
                profileRepository.findByVehicleOwner(owner)
                        .orElse(new VehicleOwnerProfile());

        profile.setVehicleOwner(owner);
        profile.setFullName(request.getFullName());
        profile.setOwnerType(request.getOwnerType());

        profile.setBusinessName(request.getBusinessName());
        profile.setBusinessMobileNumber(
                request.getBusinessMobileNumber());

        profile.setBusinessRegistrationNumber(
                request.getBusinessRegistrationNumber());

        profile.setGstNumber(request.getGstNumber());
        profile.setPanNumber(request.getPanNumber());

        profile.setAddress(request.getAddress());
        profile.setCountry(request.getCountry());
        profile.setState(request.getState());
        profile.setCity(request.getCity());
        profile.setPincode(request.getPincode());

        if (request.getProfilePhoto() == null
                || request.getProfilePhoto().isBlank()) {

            profile.setProfilePhoto("DEFAULT_PROFILE_PHOTO");

        } else {
            profile.setProfilePhoto(request.getProfilePhoto());
        }

        return profileRepository.save(profile);
    }

    public VehicleOwnerProfile getProfile(Long ownerId) {

        VehicleOwner owner = vehicleOwnerRepository
                .findById(ownerId)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle owner not found."));

        return profileRepository.findByVehicleOwner(owner)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle owner profile not found."));
    }
}
