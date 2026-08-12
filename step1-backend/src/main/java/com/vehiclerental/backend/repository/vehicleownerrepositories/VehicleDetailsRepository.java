package com.vehiclerental.backend.repository.vehicleownerrepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;

public interface VehicleDetailsRepository
        extends JpaRepository<VehicleDetails, Long> {

    List<VehicleDetails> findByOwner(VehicleOwner owner);
}
