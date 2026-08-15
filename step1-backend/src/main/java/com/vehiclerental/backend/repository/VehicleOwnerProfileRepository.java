package com.vehiclerental.backend.repository;

import com.vehiclerental.backend.entity.VehicleOwner;
import com.vehiclerental.backend.entity.VehicleOwnerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleOwnerProfileRepository
        extends JpaRepository<VehicleOwnerProfile, Long> {

    Optional<VehicleOwnerProfile> findByVehicleOwner(VehicleOwner vehicleOwner);

    boolean existsByVehicleOwner(VehicleOwner vehicleOwner);
}