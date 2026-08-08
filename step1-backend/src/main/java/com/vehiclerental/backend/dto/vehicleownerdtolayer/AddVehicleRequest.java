
package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddVehicleRequest {

    @NotBlank
    private String vehicleName;

    @NotBlank
    private String vehicleType;

    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    @NotBlank
    private String manufacturingYear;

    @NotBlank
    private String vehicleNo;

    @NotBlank
    private String fuelType;

    @NotBlank
    private String transmission;

    @NotBlank
    private String engineCapacity;

    @NotBlank
    private String color;

    @NotBlank
    private String seatingCapacity;

    @NotNull
    private Double mileage;

    private String description;

    private Set<String> features;
}

