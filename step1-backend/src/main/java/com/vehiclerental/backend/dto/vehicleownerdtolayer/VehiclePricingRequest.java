package com.vehiclerental.backend.dto.vehicleownerdtolayer;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class VehiclePricingRequest {

    @PositiveOrZero
    private Double hourlyRent;

    @NotNull
    @PositiveOrZero
    private Double dailyRent;

    @PositiveOrZero
    private Double weeklyRent;

    @PositiveOrZero
    private Double monthlyRent;

    // @PositiveOrZero
    // private Double extraKm;

    // @PositiveOrZero
    // private Double freeKmPerDay;

    @PositiveOrZero
    private Double securityDeposit;

    @PositiveOrZero
    private Double cleaningCharges;

    @PositiveOrZero
    private Double lateReturnCharges;

    @PositiveOrZero
    private Double cancellationCharges;

    @PositiveOrZero
    private Double driverCharges;

    @PositiveOrZero
    private Double homeDeliveryCharges;

    // @PositiveOrZero
    // private Double pickUpCharges;

    // @PositiveOrZero
    // private Double tollCharges;

    // @PositiveOrZero
    // private Double parkingCharges;

    // @PositiveOrZero
    // private Double nightCharges;

    private boolean enableDriverCharges;
    private boolean enableHomeDeliveryCharges;
    // private boolean enablePickUpCharges;
    // private boolean enableTollCharges;
    // private boolean enableParkingCharges;
    // private boolean enableNightCharges;
    


}