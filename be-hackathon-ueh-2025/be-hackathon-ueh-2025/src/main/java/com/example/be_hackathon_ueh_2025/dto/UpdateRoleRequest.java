package com.example.be_hackathon_ueh_2025.dto;

import com.example.be_hackathon_ueh_2025.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    
    @NotNull(message = "Role is required")
    private User.Role role;
}