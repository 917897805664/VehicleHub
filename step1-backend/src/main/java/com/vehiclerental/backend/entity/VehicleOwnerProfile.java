package com.vehiclerental.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehicle_owner_profiles")
@Getter
@Setter
@NoArgsConstructor
public class VehicleOwnerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_owner_id", nullable = false, unique = true)
    private VehicleOwner vehicleOwner;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String ownerType;

    private String businessName;

    private String businessMobileNumber;

    private String businessRegistrationNumber;

    private String gstNumber;

    private String panNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String country;

    private String state;

    private String city;

    private String pincode;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String profilePhoto;
}
