package com.vehiclerental.backend.entity.vehicleownerentities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;



import lombok.*;

@Entity
@Table(name="vehicle_details")
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
   
 



    
}
