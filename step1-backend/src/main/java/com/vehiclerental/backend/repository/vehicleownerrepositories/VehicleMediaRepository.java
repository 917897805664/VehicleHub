package com.vehiclerental.backend.repository.vehicleownerrepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleMedia;

public interface VehicleMediaRepository
        extends JpaRepository<VehicleMedia, Long> {

    List<VehicleMedia> findByVehicle(VehicleDetails vehicle);

    void deleteByVehicle(VehicleDetails vehicle);
}