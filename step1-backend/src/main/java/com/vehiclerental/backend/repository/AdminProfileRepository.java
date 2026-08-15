package com.vehiclerental.backend.repository;

import com.vehiclerental.backend.entity.Admin;
import com.vehiclerental.backend.entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminProfileRepository
        extends JpaRepository<AdminProfile, Long> {

    Optional<AdminProfile> findByAdmin(Admin admin);

    boolean existsByAdmin(Admin admin);
}