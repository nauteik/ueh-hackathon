package com.example.be_hackathon_ueh_2025.dto;

import com.example.be_hackathon_ueh_2025.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String avatar;
    private String bio;
    private String role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    public static UserResponse fromUser(User user) {
        return new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName(),
            user.getAvatar(),
            user.getBio(),
            user.getRole().name(),
            user.getIsActive(),
            user.getCreatedAt()
        );
    }
}