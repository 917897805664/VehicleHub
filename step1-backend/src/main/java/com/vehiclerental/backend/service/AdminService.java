package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.entity.Admin;
import com.vehiclerental.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public Admin login(LoginRequest request) {
        Optional<Admin> adminByEmail = adminRepository.findByEmail(request.getIdentifier());
        if (adminByEmail.isPresent()) {
            Admin admin = adminByEmail.get();
            validatePassword(admin.getPassword(), request.getPassword());
            return admin;
        }

        Optional<Admin> adminByPhone = adminRepository.findByPhone(request.getIdentifier());
        if (adminByPhone.isPresent()) {
            Admin admin = adminByPhone.get();
            validatePassword(admin.getPassword(), request.getPassword());
            return admin;
        }

        throw new RuntimeException("Email or mobile number does not match. Please try again.");
    }

    public boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }

    public boolean existsByPhone(String phone) {
        return adminRepository.existsByPhone(phone);
    }

    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public Optional<Admin> findByPhone(String phone) {
        return adminRepository.findByPhone(phone);
    }

    public Admin savePassword(String email, String newPassword) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No user found with this email."));
        admin.setPassword(newPassword);
        return adminRepository.save(admin);
    }

    private void validatePassword(String storedPassword, String password) {
        if (!password.equals(storedPassword)) {
            throw new RuntimeException("Invalid password. Please try again.");
        }
    }
}
