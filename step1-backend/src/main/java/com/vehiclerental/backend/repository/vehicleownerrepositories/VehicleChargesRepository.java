package com.vehiclerental.backend.repository.vehicleownerrepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.backend.entity.vehicleownerentities.VehicleCharges;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;

public interface VehicleChargesRepository
        extends JpaRepository<VehicleCharges, Long> {

    List<VehicleCharges> findByVehicle(VehicleDetails vehicle);

    void deleteByVehicle(VehicleDetails vehicle);
    
}