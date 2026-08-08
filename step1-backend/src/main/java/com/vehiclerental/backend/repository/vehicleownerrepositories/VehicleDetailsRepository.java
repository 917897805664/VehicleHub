package com.vehiclerental.backend.repository.vehicleownerrepositories;
import org.springframework.data.jpa.repository.JpaRepository;


import com.vehiclerental.backend.entity.vehicleownerentities.VehicleDetails;

// import java.util.Optional;
public interface VehicleDetailsRepository extends JpaRepository<VehicleDetails, Long> {
    
    
} 
