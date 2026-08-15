
package com.vehiclerental.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin_profiles")
@Getter
@Setter
@NoArgsConstructor
public class AdminProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "admin_id", nullable = false, unique = true)
    private Admin admin;

    @Column(nullable = false)
    private String fullName;

    private String dateOfBirth;

    private String gender;

    private String department;

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
