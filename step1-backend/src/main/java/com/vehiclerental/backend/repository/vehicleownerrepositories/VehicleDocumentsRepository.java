package com.vehiclerental.backend.repository.vehicleownerrepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDocuments;

public interface VehicleDocumentsRepository
        extends JpaRepository<VehicleDocuments, Long> {

    List<VehicleDocuments> findByVehicle(VehicleDetails vehicle);

    void deleteByVehicle(VehicleDetails vehicle);
}