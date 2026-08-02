package com.vehiclerental.backend.service;

import com.vehiclerental.backend.dto.RegisterRequest;
import com.vehiclerental.backend.entity.Customer;
import com.vehiclerental.backend.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerService customerService;

    @Test
    void registerShouldSaveCustomerWhenDetailsAreValid() {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Om Sharma");
        request.setEmail("om@example.com");
        request.setPhone("9876543210");
        request.setPassword("test123");

        Customer savedCustomer = Customer.builder()
                .id(1L)
                .fullName("Om Sharma")
                .email("om@example.com")
                .phone("9876543210")
                .password("test123")
                .build();

        when(customerRepository.save(org.mockito.ArgumentMatchers.any(Customer.class))).thenReturn(savedCustomer);

        Customer result = customerService.register(request);

        assertEquals("om@example.com", result.getEmail());
        assertEquals("9876543210", result.getPhone());
    }
}
