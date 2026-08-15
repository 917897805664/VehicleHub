package com.vehiclerental.backend.repository;

import com.vehiclerental.backend.entity.Customer;
import com.vehiclerental.backend.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerProfileRepository
        extends JpaRepository<CustomerProfile, Long> {

    Optional<CustomerProfile> findByCustomer(Customer customer);

    boolean existsByCustomer(Customer customer);
}
