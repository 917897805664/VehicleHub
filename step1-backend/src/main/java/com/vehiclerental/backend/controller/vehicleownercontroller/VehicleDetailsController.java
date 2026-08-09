package com.vehiclerental.backend.controller.vehicleownercontroller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.backend.dto.ApiResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleChargeResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleDocumentResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleIdResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehicleMediaResponse;
import com.vehiclerental.backend.dto.vehicleownerdtolayer.VehiclePricingRequest;
import com.vehiclerental.backend.service.vehicleownerservices.VehicleDetailsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicle-owners/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleDetailsController {

    private final VehicleDetailsService vehicleDetailsService;

    // =========================================================
    // STEP 1
    // =========================================================

    @PostMapping("/addVehicle")
    public ApiResponse<VehicleIdResponse> addVehicle(
            @Valid @RequestBody AddVehicleRequest request) {

        VehicleIdResponse response =
                vehicleDetailsService.addVehicle(request);

        return ApiResponse.success(
                "vehicle details and features saved successfully.",
                response
        );
    }

    // =========================================================
    // STEP 2
    // =========================================================

    @PostMapping(
            value = "/{vehicleId}/media",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<VehicleMediaResponse> uploadVehicleMedia(

            @PathVariable Long vehicleId,

            @RequestParam("files")
            List<MultipartFile> files,

            @RequestParam("viewTypes")
            List<String> viewTypes,

            @RequestParam("mediaTypes")
            List<String> mediaTypes

    ) throws Exception {

        VehicleMediaResponse response =
                vehicleDetailsService.saveVehicleMedia(
                        vehicleId,
                        files,
                        viewTypes,
                        mediaTypes
                );

        return ApiResponse.success(
                "photos and videos of Vehicles saved successfully.",
                response
        );
    }

    // =========================================================
    // STEP 3
    // =========================================================

    @PostMapping(
            value = "/{vehicleId}/documents",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<VehicleDocumentResponse>
    uploadVehicleDocuments(

            @PathVariable Long vehicleId,

            @RequestParam("files")
            List<MultipartFile> files,

            @RequestParam("documentTypes")
            List<String> documentTypes

    ) throws Exception {

        VehicleDocumentResponse response =
                vehicleDetailsService.saveVehicleDocuments(
                        vehicleId,
                        files,
                        documentTypes
                );

        return ApiResponse.success(
                "All documents saved successfully.",
                response
        );
    }

    // =========================================================
    // STEP 4
    // =========================================================

    @PostMapping("/{vehicleId}/pricing")
    public ApiResponse<VehicleChargeResponse>
    saveVehiclePricing(

            @PathVariable Long vehicleId,

            @Valid @RequestBody
            VehiclePricingRequest request

    ) {

        VehicleChargeResponse response =
                vehicleDetailsService.saveVehicleCharges(
                        vehicleId,
                        request
                );

        return ApiResponse.success(
                "pricing and charges saved successfully. Vehicle added successfully.",
                response
        );
    }
}