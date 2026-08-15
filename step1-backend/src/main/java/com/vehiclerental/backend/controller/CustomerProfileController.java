package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.CustomerProfileRequest;
import com.vehiclerental.backend.entity.CustomerProfile;
import com.vehiclerental.backend.service.CustomerProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer-profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerProfileController {

    private final CustomerProfileService profileService;

    @PostMapping("/save")
    public ApiResponse<CustomerProfile> saveProfile(
            @Valid @RequestBody CustomerProfileRequest request) {

        CustomerProfile profile =
                profileService.saveProfile(request);

        return ApiResponse.success(
                "Customer profile saved successfully!",
                profile);
    }

    @GetMapping("/{customerId}")
    public ApiResponse<CustomerProfile> getProfile(
            @PathVariable Long customerId) {

        return ApiResponse.success(
                "Customer profile retrieved successfully!",
                profileService.getProfile(customerId));
    }
}