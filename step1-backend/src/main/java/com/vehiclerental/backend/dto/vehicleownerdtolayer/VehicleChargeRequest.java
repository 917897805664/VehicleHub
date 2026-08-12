
package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehicleChargeRequest {

    @NotBlank
    private String chargeType;

    @NotNull
    private Double amount;

    // private String unit;

    // private String description;
}