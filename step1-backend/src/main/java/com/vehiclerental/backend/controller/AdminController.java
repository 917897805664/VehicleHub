
package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ApiResponse<Object> login(
            @Valid @RequestBody LoginRequest request) {

        Object loggedInUser =
                adminService.login(request);

        return ApiResponse.success(
                "Login successful!",
                loggedInUser
        );
    }
}