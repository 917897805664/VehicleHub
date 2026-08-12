package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDocumentCatalogResponse {

    private Long id;

    private String documentType;

    private String fileName;

    private String contentType;

    private Long fileSize;

    /*
     * Base64 encoded document.
     */
    private String fileData;
}