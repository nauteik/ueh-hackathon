package com.example.be_hackathon_ueh_2025.dto;

import com.example.be_hackathon_ueh_2025.model.Comment;
import com.example.be_hackathon_ueh_2025.model.CommentMedia;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CommentResponse {
    
    private Long id;
    private String content;
    private Long postId;
    private Long authorId;
    private String authorUsername;
    private String authorFullName;
    private String authorAvatar;
    private Long parentCommentId;
    private Long likeCount;
    private Boolean isEdited;
    private String status;
    private List<CommentMedia> media;
    private List<CommentResponse> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static CommentResponse fromComment(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setContent(comment.getContent());
        response.setPostId(comment.getPost().getId());
        response.setAuthorId(comment.getAuthor().getId());
        response.setAuthorUsername(comment.getAuthor().getUsername());
        response.setAuthorFullName(comment.getAuthor().getFullName());
        response.setAuthorAvatar(comment.getAuthor().getAvatar());
        response.setParentCommentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null);
        response.setLikeCount(comment.getLikeCount());
        response.setIsEdited(comment.getIsEdited());
        response.setStatus(comment.getStatus().name());
        response.setMedia(comment.getMedia());
        response.setReplies(comment.getReplies().stream()
                .filter(reply -> reply.getStatus() == Comment.CommentStatus.ACTIVE)
                .map(CommentResponse::fromCommentWithoutReplies)
                .collect(Collectors.toList()));
        response.setCreatedAt(comment.getCreatedAt());
        response.setUpdatedAt(comment.getUpdatedAt());
        return response;
    }
    
    public static CommentResponse fromCommentWithoutReplies(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setContent(comment.getContent());
        response.setPostId(comment.getPost().getId());
        response.setAuthorId(comment.getAuthor().getId());
        response.setAuthorUsername(comment.getAuthor().getUsername());
        response.setAuthorFullName(comment.getAuthor().getFullName());
        response.setAuthorAvatar(comment.getAuthor().getAvatar());
        response.setParentCommentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null);
        response.setLikeCount(comment.getLikeCount());
        response.setIsEdited(comment.getIsEdited());
        response.setStatus(comment.getStatus().name());
        response.setMedia(comment.getMedia());
        response.setCreatedAt(comment.getCreatedAt());
        response.setUpdatedAt(comment.getUpdatedAt());
        return response;
    }
}