package com.example.be_hackathon_ueh_2025.service;

import com.example.be_hackathon_ueh_2025.model.User;
import com.example.be_hackathon_ueh_2025.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        throw new RuntimeException("User not authenticated");
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    @Transactional
    public User updateUserRole(Long userId, User.Role newRole) {
        User user = getUserById(userId);
        User.Role oldRole = user.getRole();
        user.setRole(newRole);
        User updatedUser = userRepository.save(user);
        
        log.info("User role updated: {} from {} to {}", user.getUsername(), oldRole, newRole);
        return updatedUser;
    }
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public User toggleUserStatus(Long userId) {
        User user = getUserById(userId);
        user.setIsActive(!user.getIsActive());
        User updatedUser = userRepository.save(user);
        
        log.info("User status toggled: {} is now {}", user.getUsername(), 
                user.getIsActive() ? "active" : "inactive");
        return updatedUser;
    }
    
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    @Transactional
    public User updateProfile(Long userId, String fullName, String bio, String avatar) {
        User user = getUserById(userId);
        
        if (fullName != null) user.setFullName(fullName);
        if (bio != null) user.setBio(bio);
        if (avatar != null) user.setAvatar(avatar);
        
        User updatedUser = userRepository.save(user);
        log.info("User profile updated: {}", user.getUsername());
        return updatedUser;
    }
    
    public boolean hasRole(User user, User.Role role) {
        return user.getRole() == role;
    }
    
    public boolean hasAnyRole(User user, User.Role... roles) {
        for (User.Role role : roles) {
            if (user.getRole() == role) {
                return true;
            }
        }
        return false;
    }
    
    public boolean isAdmin(User user) {
        return hasRole(user, User.Role.ADMIN);
    }
    
    public boolean isModerator(User user) {
        return hasRole(user, User.Role.MODERATOR);
    }
    
    public boolean canModerateContent(User user) {
        return hasAnyRole(user, User.Role.ADMIN, User.Role.MODERATOR);
    }
}