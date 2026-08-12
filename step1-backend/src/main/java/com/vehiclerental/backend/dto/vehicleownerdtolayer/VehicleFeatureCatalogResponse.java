package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleFeatureCatalogResponse {

    private Long id;

    private String featureName;
}