package com.example.be_hackathon_ueh_2025.dto;

import com.example.be_hackathon_ueh_2025.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostSummaryResponse {
    private Long id;
    private String title;
    private String contentPreview; // First 200 characters
    private Boolean isPublished;
    private Long viewCount;
    private Long likeCount;
    private Long commentCount;
    private LocalDateTime createdAt;
    
    // Author info
    private Long authorId;
    private String authorUsername;
    private String authorFullName;
    private String authorAvatar;
    
    public static PostSummaryResponse fromPost(Post post) {
        PostSummaryResponse response = new PostSummaryResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        
        // Create content preview
        String content = post.getContent();
        if (content != null && content.length() > 200) {
            response.setContentPreview(content.substring(0, 200) + "...");
        } else {
            response.setContentPreview(content);
        }
        
        response.setIsPublished(post.getIsPublished());
        response.setViewCount(post.getViewCount());
        response.setLikeCount(post.getLikeCount());
        response.setCommentCount(post.getCommentCount());
        response.setCreatedAt(post.getCreatedAt());
        
        if (post.getAuthor() != null) {
            response.setAuthorId(post.getAuthor().getId());
            response.setAuthorUsername(post.getAuthor().getUsername());
            response.setAuthorFullName(post.getAuthor().getFullName());
            response.setAuthorAvatar(post.getAuthor().getAvatar());
        }
        
        return response;
    }
}