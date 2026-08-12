package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleCatalogResponse {

    // =========================
    // VEHICLE DETAILS
    // =========================

    private Long id;

    private Long ownerId;

    private String ownerName;

    private String ownerEmail;

    private String vehicleName;

    private String vehicleType;

    private String brand;

    private String model;

    private String manufacturingYear;

    private String vehicleNo;

    private String fuelType;

    private String transmission;

    private String engineCapacity;

    private String color;

    private String seatingCapacity;

    private Double mileage;

    private String description;


    // =========================
    // FRONT IMAGE
    // =========================

    private String frontImage;


    // =========================
    // FEATURES
    // =========================

    private List<VehicleFeatureCatalogResponse> features =
            new ArrayList<>();


    // =========================
    // MEDIA
    // =========================

    private List<VehicleMediaCatalogResponse> media =
            new ArrayList<>();


    // =========================
    // DOCUMENTS
    // =========================

    private List<VehicleDocumentCatalogResponse> documents =
            new ArrayList<>();


    // =========================
    // CHARGES
    // =========================

    private List<VehicleChargeCatalogResponse> charges =
            new ArrayList<>();


    // =========================
    // QUICK PRICING
    // =========================

    private Double hourlyRent;

    private Double dailyRent;

    private Double weeklyRent;

    private Double monthlyRent;

    private Double securityDeposit;

    private Double cleaningCharges;

    private Double lateReturnCharges;

    private Double cancellationCharges;

    private Double driverCharges;

    private Double homeDeliveryCharges;

    private boolean enableDriverCharges;

    private boolean enableHomeDeliveryCharges;
}