package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.CustomerProfileRequest;
import com.vehiclerental.backend.entity.Customer;
import com.vehiclerental.backend.entity.CustomerProfile;
import com.vehiclerental.backend.repository.CustomerProfileRepository;
import com.vehiclerental.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerProfileService {

    private final CustomerRepository customerRepository;
    private final CustomerProfileRepository profileRepository;

    public CustomerProfile saveProfile(CustomerProfileRequest request) {

        if (request.getCustomerId() == null) {
            throw new RuntimeException("Customer ID is required.");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found."));

        CustomerProfile profile =
                profileRepository.findByCustomer(customer)
                        .orElse(new CustomerProfile());

        profile.setCustomer(customer);
        profile.setFullName(request.getFullName());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setAddress(request.getAddress());
        profile.setCountry(request.getCountry());
        profile.setState(request.getState());
        profile.setCity(request.getCity());
        profile.setPincode(request.getPincode());

        if (request.getProfilePhoto() == null ||
                request.getProfilePhoto().isBlank()) {

            profile.setProfilePhoto("DEFAULT_PROFILE_PHOTO");
        } else {
            profile.setProfilePhoto(request.getProfilePhoto());
        }

        return profileRepository.save(profile);
    }

    public CustomerProfile getProfile(Long customerId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found."));

        return profileRepository.findByCustomer(customer)
                .orElseThrow(() -> new RuntimeException("Customer profile not found."));
    }
}
