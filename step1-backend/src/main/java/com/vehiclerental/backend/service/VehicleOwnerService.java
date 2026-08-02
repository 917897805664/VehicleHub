package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.dto.RegisterRequest;
import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.repository.VehicleOwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleOwnerService {

    private final VehicleOwnerRepository vehicleOwnerRepository;

    public VehicleOwner register(RegisterRequest request) {
        VehicleOwner owner = VehicleOwner.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword())
                .build();
        return vehicleOwnerRepository.save(owner);
    }

    public VehicleOwner login(LoginRequest request) {
        Optional<VehicleOwner> ownerByEmail = vehicleOwnerRepository.findByEmail(request.getIdentifier());
        if (ownerByEmail.isPresent()) {
            VehicleOwner owner = ownerByEmail.get();
            validatePassword(owner.getPassword(), request.getPassword());
            return owner;
        }

        Optional<VehicleOwner> ownerByPhone = vehicleOwnerRepository.findByPhone(request.getIdentifier());
        if (ownerByPhone.isPresent()) {
            VehicleOwner owner = ownerByPhone.get();
            validatePassword(owner.getPassword(), request.getPassword());
            return owner;
        }

        throw new RuntimeException("Email or mobile number does not match. Please try again.");
    }

    public boolean existsByEmail(String email) {
        return vehicleOwnerRepository.existsByEmail(email);
    }

    public boolean existsByPhone(String phone) {
        return vehicleOwnerRepository.existsByPhone(phone);
    }

    public Optional<VehicleOwner> findByEmail(String email) {
        return vehicleOwnerRepository.findByEmail(email);
    }

    public Optional<VehicleOwner> findByPhone(String phone) {
        return vehicleOwnerRepository.findByPhone(phone);
    }

    public VehicleOwner savePassword(String email, String newPassword) {
        VehicleOwner owner = vehicleOwnerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No user found with this email."));
        owner.setPassword(newPassword);
        return vehicleOwnerRepository.save(owner);
    }

    private void validatePassword(String storedPassword, String password) {
        if (!password.equals(storedPassword)) {
            throw new RuntimeException("Invalid password. Please try again.");
        }
    }
}
