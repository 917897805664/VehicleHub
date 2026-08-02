package com.vehiclerental.backend.controller;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.dto.RegisterRequest;
import com.vehiclerental.backend.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/register")
    public ApiResponse<Object> register(@Valid @RequestBody RegisterRequest request) {
        Object savedUser = customerService.register(request);
        return ApiResponse.success("Registered successfully!", savedUser);
    }

    @PostMapping("/login")
    
    public ApiResponse<Object> login(@Valid @RequestBody LoginRequest request) {
        Object loggedInUser = customerService.login(request);
        return ApiResponse.success("Login successful!", loggedInUser);
    }
}
