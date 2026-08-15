package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.VehicleOwnerProfileRequest;
import com.vehiclerental.backend.entity.VehicleOwnerProfile;
import com.vehiclerental.backend.service.VehicleOwnerProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle-owner-profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleOwnerProfileController {

    private final VehicleOwnerProfileService profileService;

    @PostMapping("/save")
    public ApiResponse<VehicleOwnerProfile> saveProfile(
            @Valid @RequestBody VehicleOwnerProfileRequest request) {

        VehicleOwnerProfile profile =
                profileService.saveProfile(request);

        return ApiResponse.success(
                "Vehicle owner profile saved successfully!",
                profile);
    }

    @GetMapping("/{ownerId}")
    public ApiResponse<VehicleOwnerProfile> getProfile(
            @PathVariable Long ownerId) {

        return ApiResponse.success(
                "Vehicle owner profile retrieved successfully!",
                profileService.getProfile(ownerId));
    }
}