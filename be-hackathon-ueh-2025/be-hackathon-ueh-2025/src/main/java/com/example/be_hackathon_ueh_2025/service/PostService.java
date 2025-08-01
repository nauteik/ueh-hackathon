package com.example.be_hackathon_ueh_2025.service;

import com.example.be_hackathon_ueh_2025.dto.PostRequest;
import com.example.be_hackathon_ueh_2025.dto.PostResponse;
import com.example.be_hackathon_ueh_2025.dto.PostSummaryResponse;
import com.example.be_hackathon_ueh_2025.model.Post;
import com.example.be_hackathon_ueh_2025.model.PostMedia;
import com.example.be_hackathon_ueh_2025.model.User;
import com.example.be_hackathon_ueh_2025.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    
    private final PostRepository postRepository;
    private final UserService userService;
    private final PostMediaService postMediaService; // Add this
    
    // Get all published posts (public)
    public Page<PostSummaryResponse> getAllPublishedPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Post> posts = postRepository.findByIsPublishedTrueOrderByCreatedAtDesc(pageable);
        return posts.map(PostSummaryResponse::fromPost);
    }
    
    // Get post by ID (increment view count)
    @Transactional
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findByIdWithAuthor(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        
        // Only show published posts to non-owners
        User currentUser = getCurrentUserSafely();
        if (!post.getIsPublished() && 
            (currentUser == null || 
             (!post.getAuthor().getId().equals(currentUser.getId()) && 
              !userService.canModerateContent(currentUser)))) {
            throw new RuntimeException("Post not found");
        }
        
        // Increment view count for published posts
        if (post.getIsPublished()) {
            postRepository.incrementViewCount(id);
            post.setViewCount(post.getViewCount() + 1);
        }
        
        return PostResponse.fromPost(post);
    }
    
    // Get posts by current user
    public Page<PostSummaryResponse> getMyPosts(int page, int size) {
        User currentUser = userService.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Post> posts = postRepository.findByAuthorOrderByCreatedAtDesc(currentUser, pageable);
        return posts.map(PostSummaryResponse::fromPost);
    }
    
    // Get posts by user ID
    public Page<PostSummaryResponse> getPostsByUser(Long userId, int page, int size, boolean publishedOnly) {
        User author = userService.getUserById(userId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        Page<Post> posts;
        if (publishedOnly) {
            posts = postRepository.findByAuthorAndIsPublishedTrueOrderByCreatedAtDesc(author, pageable);
        } else {
            // Only allow viewing all posts if current user is the author or moderator
            User currentUser = getCurrentUserSafely();
            if (currentUser == null || 
                (!author.getId().equals(currentUser.getId()) && 
                 !userService.canModerateContent(currentUser))) {
                posts = postRepository.findByAuthorAndIsPublishedTrueOrderByCreatedAtDesc(author, pageable);
            } else {
                posts = postRepository.findByAuthorOrderByCreatedAtDesc(author, pageable);
            }
        }
        
        return posts.map(PostSummaryResponse::fromPost);
    }
    
    // Search posts
    public Page<PostSummaryResponse> searchPosts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Post> posts = postRepository.searchPublishedPosts(keyword, pageable);
        return posts.map(PostSummaryResponse::fromPost);
    }
    
    // Create new post
    @Transactional
    public PostResponse createPost(PostRequest request) {
        User currentUser = userService.getCurrentUser();
        
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setIsPublished(request.getIsPublished());
        post.setViewCount(0L);
        post.setLikeCount(0L);
        post.setCommentCount(0L);
        post.setAuthor(currentUser);
        
        Post savedPost = postRepository.save(post);
        log.info("Post created: {} by user: {}", savedPost.getId(), currentUser.getUsername());
        
        return PostResponse.fromPost(savedPost);
    }
    
    // Create post with media
    @Transactional
    public PostResponse createPostWithMedia(PostRequest request, List<MultipartFile> files) {
        User currentUser = userService.getCurrentUser();
        
        // Create post first
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setIsPublished(request.getIsPublished());
        post.setViewCount(0L);
        post.setLikeCount(0L);
        post.setCommentCount(0L);
        post.setAuthor(currentUser);
        
        Post savedPost = postRepository.save(post);
        log.info("Post created: {} by user: {}", savedPost.getId(), currentUser.getUsername());
        
        // Process media files if any
        if (files != null && !files.isEmpty()) {
            try {
                List<PostMedia> mediaList = postMediaService.processPostMedia(savedPost, files);
                log.info("Processed {} media files for post: {}", mediaList.size(), savedPost.getId());
            } catch (Exception e) {
                // If media processing fails, delete the post to maintain consistency
                postRepository.delete(savedPost);
                throw new RuntimeException("Failed to process media files: " + e.getMessage());
            }
        }
        
        return PostResponse.fromPost(savedPost);
    }
    
    // Update post
    @PreAuthorize("#postId == null or @postService.isPostOwner(#postId, authentication.principal.id) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public PostResponse updatePost(Long postId, PostRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setIsPublished(request.getIsPublished());
        
        Post updatedPost = postRepository.save(post);
        log.info("Post updated: {} by user: {}", updatedPost.getId(), userService.getCurrentUser().getUsername());
        
        return PostResponse.fromPost(updatedPost);
    }
    
    // Update post with media
    @PreAuthorize("@postService.isPostOwner(#postId, authentication.principal.id) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public PostResponse updatePostWithMedia(Long postId, PostRequest request, List<MultipartFile> files) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        // Update post fields
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setIsPublished(request.getIsPublished());
        
        Post updatedPost = postRepository.save(post);
        
        // Process new media files if any
        if (files != null && !files.isEmpty()) {
            try {
                // Delete existing media first (optional - you might want to keep existing ones)
                // postMediaService.deletePostMedia(postId);
                
                // Add new media
                List<PostMedia> mediaList = postMediaService.processPostMedia(updatedPost, files);
                log.info("Added {} new media files to post: {}", mediaList.size(), postId);
            } catch (Exception e) {
                throw new RuntimeException("Failed to process media files: " + e.getMessage());
            }
        }
        
        log.info("Post updated: {} by user: {}", updatedPost.getId(), userService.getCurrentUser().getUsername());
        return PostResponse.fromPost(updatedPost);
    }
    
    // Delete post
    @PreAuthorize("@postService.isPostOwner(#postId, authentication.principal.id) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        // Delete associated media files first
        postMediaService.deletePostMedia(postId);
        
        // Then delete the post
        postRepository.delete(post);
        log.info("Post and associated media deleted: {} by user: {}", postId, userService.getCurrentUser().getUsername());
    }
    
    // Toggle publish status
    @PreAuthorize("@postService.isPostOwner(#postId, authentication.principal.id) or hasRole('ADMIN')")
    @Transactional
    public PostResponse togglePublishStatus(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        post.setIsPublished(!post.getIsPublished());
        Post updatedPost = postRepository.save(post);
        
        log.info("Post {} publish status toggled to: {}", postId, updatedPost.getIsPublished());
        return PostResponse.fromPost(updatedPost);
    }
    
    // Helper methods
    public boolean isPostOwner(Long postId, Long userId) {
        return postRepository.findById(postId)
                .map(post -> post.getAuthor().getId().equals(userId))
                .orElse(false);
    }
    
    private User getCurrentUserSafely() {
        try {
            return userService.getCurrentUser();
        } catch (Exception e) {
            return null;
        }
    }
}
// sự tương tác giữa bên t3, tài trợ,...