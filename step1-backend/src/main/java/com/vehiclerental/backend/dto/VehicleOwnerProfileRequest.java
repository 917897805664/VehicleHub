package com.vehiclerental.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VehicleOwnerProfileRequest {

    private Long vehicleOwnerId;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Owner type is required")
    private String ownerType;

    private String businessName;

    private String businessMobileNumber;

    private String businessRegistrationNumber;

    private String gstNumber;

    private String panNumber;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    private String profilePhoto;
}