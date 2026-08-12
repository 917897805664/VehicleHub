package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleMediaCatalogResponse {

    private Long id;

    private String mediaType;

    private String mediaCategory;

    private String fileName;

    private String contentType;

    private Long fileSize;

    /*
     * Base64 encoded file data.
     *
     * React can convert this into:
     *
     * data:image/jpeg;base64,......
     */
    private String fileData;
}