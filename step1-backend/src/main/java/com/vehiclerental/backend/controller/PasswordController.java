package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.ForgotPasswordRequest;
import com.vehiclerental.backend.dto.ResetPasswordRequest;
import com.vehiclerental.backend.dto.VerifyOtpRequest;
import com.vehiclerental.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordController {

    private final AuthService authService;

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        String otp = authService.requestPasswordReset(request);
        return ApiResponse.success("OTP sent to your registered mobile number.", otp);
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        authService.verifyOtp(request);
        return ApiResponse.success("OTP verified successfully.", null);
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ApiResponse.success("Password updated successfully.", null);
    }
}
