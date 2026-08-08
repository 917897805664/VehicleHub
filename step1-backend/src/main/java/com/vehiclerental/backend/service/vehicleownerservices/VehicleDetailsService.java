
package com.vehiclerental.backend.service.vehicleownerservices;

import java.util.HashSet;
import java.util.Set;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleFeatures;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDetailsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleDetailsService {

    private final VehicleDetailsRepository vehicleDetailsRepository;

    private final JdbcTemplate jdbcTemplate;

    @Transactional
public VehicleDetails addVehicle(AddVehicleRequest request) {

    ensureDescriptionColumn();

    // ==========================================
    // 1. CREATE VEHICLE
    // ==========================================

    VehicleDetails vehicle = new VehicleDetails();

    vehicle.setVehicleName(request.getVehicleName());
    vehicle.setVehicleType(request.getVehicleType());
    vehicle.setBrand(request.getBrand());
    vehicle.setModel(request.getModel());
    vehicle.setManufacturingYear(request.getManufacturingYear());
    vehicle.setVehicleNo(request.getVehicleNo());
    vehicle.setFuelType(request.getFuelType());
    vehicle.setTransmission(request.getTransmission());
    vehicle.setEngineCapacity(request.getEngineCapacity());
    vehicle.setColor(request.getColor());
    vehicle.setSeatingCapacity(request.getSeatingCapacity());
    vehicle.setMileage(request.getMileage());

    vehicle.setDescription(
        request.getDescription() == null
            ? ""
            : request.getDescription().trim()
    );


    // ==========================================
    // 2. CREATE FEATURES
    // ==========================================

    if (request.getFeatures() != null
            && !request.getFeatures().isEmpty()) {

        Set<String> uniqueFeatures =
                new HashSet<>(request.getFeatures());

        for (String feature : uniqueFeatures) {

            if (feature == null ||
                feature.trim().isEmpty()) {
                continue;
            }

            VehicleFeatures vehicleFeature =
                    new VehicleFeatures();

            vehicleFeature.setFeatureName(
                    feature.trim()
            );

            // IMPORTANT
            vehicleFeature.setVehicle(vehicle);

            // Add feature to vehicle
            vehicle.getFeatures().add(vehicleFeature);
        }
    }


    // ==========================================
    // 3. SAVE VEHICLE + FEATURES
    // ==========================================

    return vehicleDetailsRepository.save(vehicle);
   }

    // ==========================================
    // ENSURE DESCRIPTION COLUMN
    // ==========================================

    private void ensureDescriptionColumn() {

        try {

            Integer columnExists =
                    jdbcTemplate.queryForObject(

                            "SELECT COUNT(*) " +
                            "FROM INFORMATION_SCHEMA.COLUMNS " +
                            "WHERE TABLE_SCHEMA = DATABASE() " +
                            "AND TABLE_NAME = 'vehicle_details' " +
                            "AND COLUMN_NAME = 'description'",

                            Integer.class
                    );

            if (columnExists == null ||
                    columnExists == 0) {

                jdbcTemplate.execute(
                        "ALTER TABLE vehicle_details " +
                        "ADD COLUMN description TEXT"
                );
            }

        } catch (Exception ex) {

            System.out.println(
                    "Description column check skipped: "
                    + ex.getMessage()
            );
        }
    }
}
