package com.vehiclerental.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Every API response is wrapped in this shape so the frontend always knows
 * whether the call succeeded, and can show `message` directly on screen.
 */
@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
