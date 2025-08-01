package com.example.be_hackathon_ueh_2025.controller;

import com.example.be_hackathon_ueh_2025.dto.PostRequest;
import com.example.be_hackathon_ueh_2025.dto.PostResponse;
import com.example.be_hackathon_ueh_2025.dto.PostSummaryResponse;
import com.example.be_hackathon_ueh_2025.model.PostMedia;
import com.example.be_hackathon_ueh_2025.service.PostService;
import com.example.be_hackathon_ueh_2025.service.PostMediaService;

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
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class PostController {
    
    private final PostService postService;
    private final PostMediaService postMediaService;
    private final ObjectMapper objectMapper;
    private final Validator validator;
    
    // Get all published posts (public)
    @GetMapping
    public ResponseEntity<Page<PostSummaryResponse>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<PostSummaryResponse> posts = postService.getAllPublishedPosts(page, size);
        return ResponseEntity.ok(posts);
    }
    
    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        try {
            PostResponse post = postService.getPostById(id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get current user's posts
    @GetMapping("/my")
    public ResponseEntity<Page<PostSummaryResponse>> getMyPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<PostSummaryResponse> posts = postService.getMyPosts(page, size);
            return ResponseEntity.ok(posts);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get posts by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<PostSummaryResponse>> getPostsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "true") boolean publishedOnly) {
        
        Page<PostSummaryResponse> posts = postService.getPostsByUser(userId, page, size, publishedOnly);
        return ResponseEntity.ok(posts);
    }
    
    // Search posts
    @GetMapping("/search")
    public ResponseEntity<Page<PostSummaryResponse>> searchPosts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<PostSummaryResponse> posts = postService.searchPosts(keyword, page, size);
        return ResponseEntity.ok(posts);
    }
    
    // CREATE POST - ONLY FORM-DATA (supports both with and without media)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
            @RequestPart("post") String postData,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        
        try {
            log.info("Processing form-data request");
            
            // Parse JSON string to PostRequest object
            PostRequest request;
            try {
                request = objectMapper.readValue(postData, PostRequest.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Invalid JSON format for post data: " + e.getMessage());
            }
            
            // Validate the parsed object
            Set<ConstraintViolation<PostRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                String errors = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining(", "));
                throw new RuntimeException("Validation failed: " + errors);
            }
            
            // Check if files are provided
            if (files != null && !files.isEmpty()) {
                // Filter out empty files
                List<MultipartFile> validFiles = files.stream()
                        .filter(file -> file != null && !file.isEmpty())
                        .collect(Collectors.toList());
                
                if (!validFiles.isEmpty()) {
                    log.info("Creating post with {} media files", validFiles.size());
                    PostResponse post = postService.createPostWithMedia(request, validFiles);
                    return ResponseEntity.ok(post);
                } else {
                    log.info("Creating post without valid media files");
                    PostResponse post = postService.createPost(request);
                    return ResponseEntity.ok(post);
                }
            } else {
                log.info("Creating post without media files");
                PostResponse post = postService.createPost(request);
                return ResponseEntity.ok(post);
            }
            
        } catch (RuntimeException e) {
            log.error("Error creating post: {}", e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // UPDATE POST - ONLY FORM-DATA (supports both with and without media)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            @RequestPart("post") String postData,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        
        try {
            log.info("Processing form-data update request for post: {}", id);
            
            // Parse JSON string to PostRequest object
            PostRequest request;
            try {
                request = objectMapper.readValue(postData, PostRequest.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Invalid JSON format for post data: " + e.getMessage());
            }
            
            // Validate the parsed object
            Set<ConstraintViolation<PostRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                String errors = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining(", "));
                throw new RuntimeException("Validation failed: " + errors);
            }
            
            // Check if files are provided
            if (files != null && !files.isEmpty()) {
                // Filter out empty files
                List<MultipartFile> validFiles = files.stream()
                        .filter(file -> file != null && !file.isEmpty())
                        .collect(Collectors.toList());
                
                if (!validFiles.isEmpty()) {
                    log.info("Updating post with {} media files", validFiles.size());
                    PostResponse post = postService.updatePostWithMedia(id, request, validFiles);
                    return ResponseEntity.ok(post);
                } else {
                    log.info("Updating post without valid media files");
                    PostResponse post = postService.updatePost(id, request);
                    return ResponseEntity.ok(post);
                }
            } else {
                log.info("Updating post without media files");
                PostResponse post = postService.updatePost(id, request);
                return ResponseEntity.ok(post);
            }
            
        } catch (RuntimeException e) {
            log.error("Error updating post {}: {}", id, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Delete post
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Post deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error deleting post {}: {}", id, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Toggle publish status
    @PutMapping("/{id}/toggle-publish")
    public ResponseEntity<?> togglePublishStatus(@PathVariable Long id) {
        try {
            PostResponse post = postService.togglePublishStatus(id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            log.error("Error toggling publish status for post {}: {}", id, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get post media
    @GetMapping("/{id}/media")
    public ResponseEntity<List<PostMedia>> getPostMedia(@PathVariable Long id) {
        try {
            List<PostMedia> mediaList = postMediaService.getPostMedia(id);
            return ResponseEntity.ok(mediaList);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}