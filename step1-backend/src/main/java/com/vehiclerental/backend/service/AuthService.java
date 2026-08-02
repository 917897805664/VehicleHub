package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.ForgotPasswordRequest;
import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.dto.RegisterRequest;
import com.vehiclerental.backend.dto.ResetPasswordRequest;
import com.vehiclerental.backend.dto.VerifyOtpRequest;
import com.vehiclerental.backend.entity.Admin;
import com.vehiclerental.backend.entity.Customer;
import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.repository.AdminRepository;
import com.vehiclerental.backend.repository.CustomerRepository;
import com.vehiclerental.backend.repository.VehicleOwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CustomerRepository customerRepository;
    private final VehicleOwnerRepository vehicleOwnerRepository;
    private final AdminRepository adminRepository;
    private final Map<String, OtpEntry> otpCache = new ConcurrentHashMap<>();

    private static final long OTP_EXPIRATION_MILLIS = 5 * 60 * 1000;

    public Object register(RegisterRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered.");
        }
        if (customerRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number is already registered.");
        }

        Customer Customer = com.vehiclerental.backend.entity.Customer.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword())
                .build();

        return customerRepository.save(Customer);
    }

    public Object login(LoginRequest request) {
        Optional<Customer> CustomerByEmail = customerRepository.findByEmail(request.getIdentifier());
        if (CustomerByEmail.isPresent()) {
            Customer Customer = CustomerByEmail.get();
            validatePassword(Customer.getPassword(), request.getPassword());
            return Customer;
        }

        Optional<Customer> CustomerByPhone = customerRepository.findByPhone(request.getIdentifier());
        if (CustomerByPhone.isPresent()) {
            Customer Customer = CustomerByPhone.get();
            validatePassword(Customer.getPassword(), request.getPassword());
            return Customer;
        }

        throw new RuntimeException("Email or mobile number does not match. Please try again.");
    }

    public String requestPasswordReset(ForgotPasswordRequest request) {
        String role = normalizeRole(request.getRole());

        switch (role) {
            case "vehicleOwner" -> {
                Optional<VehicleOwner> owner = vehicleOwnerRepository.findByEmail(request.getEmail());
                if (owner.isPresent()) {
                    return sendOtp(owner.get().getEmail(), owner.get().getPhone(), owner.get().getPassword());
                }
                throw new RuntimeException("No vehicle owner found with this email.");
            }
            case "admin" -> {
                Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());
                if (admin.isPresent()) {
                    return sendOtp(admin.get().getEmail(), admin.get().getPhone(), admin.get().getPassword());
                }
                throw new RuntimeException("No admin found with this email.");
            }
            default -> {
                Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
                if (customer.isPresent()) {
                    return sendOtp(customer.get().getEmail(), customer.get().getPhone(), customer.get().getPassword());
                }
                throw new RuntimeException("No customer found with this email.");
            }
        }
    }

    public void verifyOtp(VerifyOtpRequest request) {
        validateOtp(request.getEmail(), request.getOtp());
    }

    public void resetPassword(ResetPasswordRequest request) {
        validateOtp(request.getEmail(), request.getOtp());

        String role = normalizeRole(request.getRole());

        switch (role) {
            case "vehicleOwner" -> {
                Optional<VehicleOwner> owner = vehicleOwnerRepository.findByEmail(request.getEmail());
                if (owner.isPresent()) {
                    owner.get().setPassword(request.getNewPassword());
                    vehicleOwnerRepository.save(owner.get());
                    otpCache.remove(request.getEmail().toLowerCase());
                    return;
                }
                throw new RuntimeException("No vehicle owner found with this email.");
            }
            case "admin" -> {
                Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());
                if (admin.isPresent()) {
                    admin.get().setPassword(request.getNewPassword());
                    adminRepository.save(admin.get());
                    otpCache.remove(request.getEmail().toLowerCase());
                    return;
                }
                throw new RuntimeException("No admin found with this email.");
            }
            default -> {
                Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
                if (customer.isPresent()) {
                    customer.get().setPassword(request.getNewPassword());
                    customerRepository.save(customer.get());
                    otpCache.remove(request.getEmail().toLowerCase());
                    return;
                }
                throw new RuntimeException("No customer found with this email.");
            }
        }
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "customer";
        }

        return switch (role.trim()) {
            case "vehicleOwner", "vehicle-owner", "vehicle_owner" -> "vehicleOwner";
            case "admin" -> "admin";
            default -> "customer";
        };
    }

    private void validatePassword(String storedPassword, String suppliedPassword) {
        if (!storedPassword.equals(suppliedPassword)) {
            throw new RuntimeException("Incorrect password.");
        }
    }

    private void validateOtp(String email, String otp) {
        OtpEntry entry = otpCache.get(email.toLowerCase());
        if (entry == null) {
            throw new RuntimeException("No OTP request found for this email. Please request a new OTP.");
        }
        if (Instant.now().toEpochMilli() > entry.expiresAt) {
            otpCache.remove(email.toLowerCase());
            throw new RuntimeException("OTP has expired. Please request a new one.");
        }
        if (!entry.otp.equals(otp)) {
            throw new RuntimeException("Invalid OTP. Please check the code and try again.");
        }
    }

    private String generateOtp() {
        int value = ThreadLocalRandom.current().nextInt(100000, 1000000);
        return String.valueOf(value);
    }

    private String sendOtp(String email, String phone, String password) {
        String otp = generateOtp();
        long expiresAt = Instant.now().toEpochMilli() + OTP_EXPIRATION_MILLIS;
        otpCache.put(email.toLowerCase(), new OtpEntry(otp, expiresAt));

        System.out.println("[OTP] Sending OTP to mobile " + phone + ": " + otp);
        return otp;
    }

    private static class OtpEntry {
        private final String otp;
        private final long expiresAt;

        private OtpEntry(String otp, long expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }
    }
}
