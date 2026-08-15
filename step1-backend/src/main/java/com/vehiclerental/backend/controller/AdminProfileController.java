package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.AdminProfileRequest;
import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.entity.AdminProfile;
import com.vehiclerental.backend.service.AdminProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin-profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProfileController {

    private final AdminProfileService profileService;

    @PostMapping("/save")
    public ApiResponse<AdminProfile> saveProfile(
            @Valid @RequestBody AdminProfileRequest request) {

        AdminProfile profile =
                profileService.saveProfile(request);

        return ApiResponse.success(
                "Admin profile saved successfully!",
                profile);
    }

    @GetMapping("/{adminId}")
    public ApiResponse<AdminProfile> getProfile(
            @PathVariable Long adminId) {

        return ApiResponse.success(
                "Admin profile retrieved successfully!",
                profileService.getProfile(adminId));
    }
}