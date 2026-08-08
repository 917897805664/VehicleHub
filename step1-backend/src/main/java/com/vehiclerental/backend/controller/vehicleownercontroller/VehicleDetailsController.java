package com.vehiclerental.backend.controller.vehicleownercontroller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vehiclerental.backend.dto.ApiResponse;

import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.service.vehicleownerservices.VehicleDetailsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicle-owners/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleDetailsController {
    
    private final VehicleDetailsService vehicleDetailsService;
   
   @PostMapping("/addVehicle")
    public ApiResponse<Object> addVehicle(@Valid @RequestBody AddVehicleRequest request) {
        Object addvehicle = vehicleDetailsService.addVehicle(request);
        return ApiResponse.success("Vehicle added successfully with description included.", addvehicle);
    }

}
 



