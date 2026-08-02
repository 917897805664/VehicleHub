package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.ForgotPasswordRequest;
import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.repository.AdminRepository;
import com.vehiclerental.backend.repository.CustomerRepository;
import com.vehiclerental.backend.repository.VehicleOwnerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private VehicleOwnerRepository vehicleOwnerRepository;

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AuthService authService;

    @Test
    void requestPasswordReset_shouldSupportVehicleOwnerRole() {
        ForgotPasswordRequest request = new ForgotPasswordRequest();
        request.setEmail("owner@example.com");
        request.setRole("vehicleOwner");

        VehicleOwner owner = VehicleOwner.builder()
                .email("owner@example.com")
                .phone("9876543210")
                .password("secret")
                .build();

        when(vehicleOwnerRepository.findByEmail("owner@example.com")).thenReturn(Optional.of(owner));

        String otp = authService.requestPasswordReset(request);

        assertThat(otp).hasSize(6);
        verify(vehicleOwnerRepository).findByEmail("owner@example.com");
    }
}
