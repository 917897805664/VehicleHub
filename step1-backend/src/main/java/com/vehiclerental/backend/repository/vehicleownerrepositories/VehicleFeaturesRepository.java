package com.vehiclerental.backend.repository.vehicleownerrepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleFeatures;

public interface VehicleFeaturesRepository
        extends JpaRepository<VehicleFeatures, Long> {

    List<VehicleFeatures> findByVehicle(VehicleDetails vehicle);

    void deleteByVehicle(VehicleDetails vehicle);
    
}