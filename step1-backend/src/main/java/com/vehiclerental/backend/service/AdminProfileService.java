package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.AdminProfileRequest;
import com.vehiclerental.backend.entity.Admin;
import com.vehiclerental.backend.entity.AdminProfile;
import com.vehiclerental.backend.repository.AdminProfileRepository;
import com.vehiclerental.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminProfileService {

    private final AdminRepository adminRepository;
    private final AdminProfileRepository profileRepository;

    public AdminProfile saveProfile(AdminProfileRequest request) {

        if (request.getAdminId() == null) {
            throw new RuntimeException("Admin ID is required.");
        }

        Admin admin = adminRepository.findById(request.getAdminId())
                .orElseThrow(() ->
                        new RuntimeException("Admin not found."));

        AdminProfile profile =
                profileRepository.findByAdmin(admin)
                        .orElse(new AdminProfile());

        profile.setAdmin(admin);
        profile.setFullName(request.getFullName());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setDepartment(request.getDepartment());

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

    public AdminProfile getProfile(Long adminId) {

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found."));

        return profileRepository.findByAdmin(admin)
                .orElseThrow(() ->
                        new RuntimeException("Admin profile not found."));
    }
}