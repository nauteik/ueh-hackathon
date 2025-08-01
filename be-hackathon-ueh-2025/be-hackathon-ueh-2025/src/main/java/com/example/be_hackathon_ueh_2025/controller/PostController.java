package com.example.be_hackathon_ueh_2025.controller;

import com.example.be_hackathon_ueh_2025.dto.PostRequest;
import com.example.be_hackathon_ueh_2025.dto.PostResponse;
import com.example.be_hackathon_ueh_2025.dto.PostSummaryResponse;
import com.example.be_hackathon_ueh_2025.model.PostMedia;
import com.example.be_hackathon_ueh_2025.service.PostService;
import com.example.be_hackathon_ueh_2025.service.PostMediaService;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest; // ✅ Change this line
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

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class PostController {
    
    private final PostService postService;
    private final PostMediaService postMediaService;
    
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
    
    // UNIFIED CREATE POST ENDPOINT
    @PostMapping
    public ResponseEntity<?> createPost(
            HttpServletRequest request,
            @RequestPart(value = "post", required = false) @Valid PostRequest multipartRequest,
            @RequestBody(required = false) @Valid PostRequest jsonRequest,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        
        try {
            String contentType = request.getContentType();
            PostRequest actualRequest;
            
            if (contentType != null && contentType.toLowerCase().startsWith("multipart/form-data")) {
                // Multipart request
                log.info("Processing multipart request");
                actualRequest = multipartRequest;
                
                if (actualRequest == null) {
                    throw new RuntimeException("Post data is required");
                }
                
                // Check if files are provided
                if (files != null && !files.isEmpty()) {
                    log.info("Creating post with {} media files", files.size());
                    PostResponse post = postService.createPostWithMedia(actualRequest, files);
                    return ResponseEntity.ok(post);
                } else {
                    log.info("Creating post without media files");
                    PostResponse post = postService.createPost(actualRequest);
                    return ResponseEntity.ok(post);
                }
                
            } else {
                // JSON request
                log.info("Processing JSON request");
                actualRequest = jsonRequest;
                
                if (actualRequest == null) {
                    throw new RuntimeException("Post data is required");
                }
                
                PostResponse post = postService.createPost(actualRequest);
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
    
    // UNIFIED UPDATE POST ENDPOINT
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            HttpServletRequest request,
            @RequestPart(value = "post", required = false) @Valid PostRequest multipartRequest,
            @RequestBody(required = false) @Valid PostRequest jsonRequest,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        
        try {
            String contentType = request.getContentType();
            PostRequest actualRequest;
            
            if (contentType != null && contentType.toLowerCase().startsWith("multipart/form-data")) {
                // Multipart request
                actualRequest = multipartRequest;
                
                if (actualRequest == null) {
                    throw new RuntimeException("Post data is required");
                }
                
                if (files != null && !files.isEmpty()) {
                    PostResponse post = postService.updatePostWithMedia(id, actualRequest, files);
                    return ResponseEntity.ok(post);
                } else {
                    PostResponse post = postService.updatePost(id, actualRequest);
                    return ResponseEntity.ok(post);
                }
                
            } else {
                // JSON request
                actualRequest = jsonRequest;
                
                if (actualRequest == null) {
                    throw new RuntimeException("Post data is required");
                }
                
                PostResponse post = postService.updatePost(id, actualRequest);
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