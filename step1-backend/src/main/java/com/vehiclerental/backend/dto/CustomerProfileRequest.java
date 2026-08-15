package com.vehiclerental.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerProfileRequest {

    private Long customerId;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String dateOfBirth;

    private String gender;

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