package com.vehiclerental.backend.service.vehicleownerservices;

import lombok.RequiredArgsConstructor;



import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vehiclerental.backend.dto.vehicleownerdtolayer.AddVehicleRequest;
import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;
import com.vehiclerental.backend.repository.vehicleownerrepositories.VehicleDetailsRepository;

@Service
@RequiredArgsConstructor
public class VehicleDetailsService {

    private final VehicleDetailsRepository repository;
    private final JdbcTemplate jdbcTemplate;

    public VehicleDetails addVehicle(AddVehicleRequest request) {

        ensureDescriptionColumn();

        // Create VehicleDetails object without builder
        VehicleDetails vehicle = new VehicleDetails();

        vehicle.setVehicleName(request.getVehicleName());

        vehicle.setVehicleType(request.getVehicleType());

        vehicle.setBrand(request.getBrand());

        vehicle.setModel(request.getModel());

        vehicle.setManufacturingYear(
                request.getManufacturingYear()
        );

        vehicle.setVehicleNo(
                request.getVehicleNo()
        );

        vehicle.setFuelType(
                request.getFuelType()
        );

        vehicle.setTransmission(
                request.getTransmission()
        );

        vehicle.setEngineCapacity(
                request.getEngineCapacity()
        );

        vehicle.setColor(
                request.getColor()
        );

        vehicle.setSeatingCapacity(
                request.getSeatingCapacity()
        );

        vehicle.setMileage(
                request.getMileage()
        );

        vehicle.setDescription(
                request.getDescription() == null
                        ? ""
                        : request.getDescription().trim()
        );


        // // ==========================================
        // // VEHICLE FEATURES
        // // ==========================================

        // vehicle.setFeatures(
        //         request.getFeatures() == null
        //                 ? new HashSet<>()
        //                 : new HashSet<>(request.getFeatures())
        // );


        return repository.save(vehicle);
    }


    private void ensureDescriptionColumn() {

        try {

            Integer columnExists = jdbcTemplate.queryForObject(

                    "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS " +
                    "WHERE TABLE_SCHEMA = DATABASE() " +
                    "AND TABLE_NAME = 'vehicle_details' " +
                    "AND COLUMN_NAME = 'description'",

                    Integer.class
            );

            if (columnExists == null || columnExists == 0) {

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