package com.vehiclerental.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * This is the shape of JSON the React frontend will send in the POST body:
 * {
 *   "fullName": "Om Sharma",
 *   "email": "om@example.com",
 *   "phone": "9876543210",
 *   "password": "test123"
 * }
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
