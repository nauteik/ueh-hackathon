package com.example.be_hackathon_ueh_2025.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentRequest {
    
    @NotBlank(message = "Comment content is required")
    @Size(min = 1, max = 2000, message = "Comment content must be between 1 and 2000 characters")
    private String content;
    
    private Long parentCommentId; // For reply to another comment
}