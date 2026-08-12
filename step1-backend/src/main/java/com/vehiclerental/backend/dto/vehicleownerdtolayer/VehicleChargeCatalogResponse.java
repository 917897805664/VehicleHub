package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleChargeCatalogResponse {

    private Long id;

    private String chargeType;

    private Double amount;
}