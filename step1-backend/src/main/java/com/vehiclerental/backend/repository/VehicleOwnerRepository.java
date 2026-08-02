package com.vehiclerental.backend.repository;

import com.vehiclerental.backend.entity.VehicleOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleOwnerRepository extends JpaRepository<VehicleOwner, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<VehicleOwner> findByEmail(String email);
    Optional<VehicleOwner> findByPhone(String phone);
}
