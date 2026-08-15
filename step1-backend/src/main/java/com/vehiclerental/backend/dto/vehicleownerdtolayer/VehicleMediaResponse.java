
package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VehicleMediaResponse {

    private Long vehicleId;

    private int uploadedFiles;
    
}