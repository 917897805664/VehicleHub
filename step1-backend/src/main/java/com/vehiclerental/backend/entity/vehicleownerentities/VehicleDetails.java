package com.vehiclerental.backend.entity.vehicleownerentities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // =========================
    // FEATURES
    // =========================

    @JsonIgnore
    @OneToMany(
        mappedBy = "vehicle",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<VehicleFeatures> features = new ArrayList<>();

    // =========================
    // PHOTOS + VIDEOS
    // =========================

    @JsonIgnore
    @OneToMany(
        mappedBy = "vehicle",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<VehicleMedia> media = new ArrayList<>();

    // =========================
    // DOCUMENTS
    // =========================

    @JsonIgnore
    @OneToMany(
        mappedBy = "vehicle",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<VehicleDocuments> documents = new ArrayList<>();

    // =========================
    // RENT + CHARGES
    // =========================

    @JsonIgnore
    @OneToMany(
        mappedBy = "vehicle",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<VehicleCharges> charges = new ArrayList<>();
}