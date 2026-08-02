package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.LoginRequest;
import com.vehiclerental.backend.dto.RegisterRequest;
import com.vehiclerental.backend.entity.Customer;
import com.vehiclerental.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Customer register(RegisterRequest request) {
        Customer customer = Customer.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword())
                .build();
        return customerRepository.save(customer);
    }

    public Customer login(LoginRequest request) {
        Optional<Customer> customerByEmail = customerRepository.findByEmail(request.getIdentifier());
        if (customerByEmail.isPresent()) {
            Customer customer = customerByEmail.get();
            validatePassword(customer.getPassword(), request.getPassword());
            return customer;
        }

        Optional<Customer> customerByPhone = customerRepository.findByPhone(request.getIdentifier());
        if (customerByPhone.isPresent()) {
            Customer customer = customerByPhone.get();
            validatePassword(customer.getPassword(), request.getPassword());
            return customer;
        }

        throw new RuntimeException("Email or mobile number does not match. Please try again.");
    }

    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    public boolean existsByPhone(String phone) {
        return customerRepository.existsByPhone(phone);
    }

    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Optional<Customer> findByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    public Customer savePassword(String email, String newPassword) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No user found with this email."));
        customer.setPassword(newPassword);
        return customerRepository.save(customer);
    }

    private void validatePassword(String storedPassword, String password) {
        if (!password.equals(storedPassword)) {
            throw new RuntimeException("Invalid password. Please try again.");
        }
    }
}
