package com.example.be_hackathon_ueh_2025.controller;

import com.example.be_hackathon_ueh_2025.dto.CommentRequest;
import com.example.be_hackathon_ueh_2025.dto.CommentResponse;
import com.example.be_hackathon_ueh_2025.model.CommentMedia;
import com.example.be_hackathon_ueh_2025.service.CommentService;
import com.example.be_hackathon_ueh_2025.service.CommentMediaService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class CommentController {
    
    private final CommentService commentService;
    private final CommentMediaService commentMediaService;
    private final ObjectMapper objectMapper;
    private final Validator validator;
    
    // Get comments for a post
    @GetMapping
    public ResponseEntity<Page<CommentResponse>> getPostComments(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<CommentResponse> comments = commentService.getPostComments(postId, page, size);
        return ResponseEntity.ok(comments);
    }
    
    // Get replies for a comment
    @GetMapping("/{commentId}/replies")
    public ResponseEntity<List<CommentResponse>> getCommentReplies(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        
        List<CommentResponse> replies = commentService.getCommentReplies(commentId);
        return ResponseEntity.ok(replies);
    }
    
    // Create comment (with optional media)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createComment(
            @PathVariable Long postId,
            @RequestPart("comment") String commentData,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        
        try {
            log.info("Creating comment for post: {}", postId);
            
            // Parse JSON string to CommentRequest object
            CommentRequest request;
            try {
                request = objectMapper.readValue(commentData, CommentRequest.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Invalid JSON format for comment data: " + e.getMessage());
            }
            
            // Validate the parsed object
            Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                String errors = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining(", "));
                throw new RuntimeException("Validation failed: " + errors);
            }
            
            CommentResponse comment = commentService.createComment(postId, request, files);
            return ResponseEntity.ok(comment);
            
        } catch (RuntimeException e) {
            log.error("Error creating comment for post {}: {}", postId, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Update comment (text only)
    @PutMapping(value = "/{commentId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @Valid @RequestBody CommentRequest request) {
        
        try {
            log.info("Updating comment: {}", commentId);
            CommentResponse comment = commentService.updateComment(commentId, request);
            return ResponseEntity.ok(comment);
            
        } catch (RuntimeException e) {
            log.error("Error updating comment {}: {}", commentId, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Delete comment (soft delete)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        
        try {
            commentService.deleteComment(commentId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Comment deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error deleting comment {}: {}", commentId, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Hard delete comment (admin only)
    @DeleteMapping("/{commentId}/hard")
    public ResponseEntity<?> hardDeleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        
        try {
            commentService.hardDeleteComment(commentId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Comment permanently deleted");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error hard deleting comment {}: {}", commentId, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get comment by ID
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> getCommentById(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        
        try {
            CommentResponse comment = commentService.getCommentById(commentId);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get comment media
    @GetMapping("/{commentId}/media")
    public ResponseEntity<List<CommentMedia>> getCommentMedia(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        
        try {
            List<CommentMedia> mediaList = commentMediaService.getCommentMedia(commentId);
            return ResponseEntity.ok(mediaList);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Search comments
    @GetMapping("/search")
    public ResponseEntity<Page<CommentResponse>> searchComments(
            @PathVariable Long postId,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<CommentResponse> comments = commentService.searchComments(postId, keyword, page, size);
        return ResponseEntity.ok(comments);
    }
}

// Additional endpoint for user comments
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
class UserCommentController {
    
    private final CommentService commentService;
    
    // Get user's comments by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<CommentResponse>> getUserComments(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<CommentResponse> comments = commentService.getUserComments(userId, page, size);
        return ResponseEntity.ok(comments);
    }
}