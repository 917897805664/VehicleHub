package com.vehiclerental.backend.entity.vehicleownerentities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle_charges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleCharges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleDetails vehicle;

    @Column(name = "charge_type", nullable = false)
    private String chargeType;

    @Column(nullable = false)
    private Double amount;

    // @Column(name = "unit")
    // private String unit;

    // @Column(name = "description")
    // private String description;
    
}