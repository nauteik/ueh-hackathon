package com.example.be_hackathon_ueh_2025.service;

import com.example.be_hackathon_ueh_2025.dto.CommentRequest;
import com.example.be_hackathon_ueh_2025.dto.CommentResponse;
import com.example.be_hackathon_ueh_2025.model.Comment;
import com.example.be_hackathon_ueh_2025.model.CommentMedia;
import com.example.be_hackathon_ueh_2025.model.Post;
import com.example.be_hackathon_ueh_2025.model.User;
import com.example.be_hackathon_ueh_2025.repository.CommentRepository;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserService userService;
    private final CommentMediaService commentMediaService;
    
    // Get comments for a post (top-level only)
    public Page<CommentResponse> getPostComments(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Comment> comments = commentRepository.findByPostIdAndParentCommentIsNullAndStatusOrderByCreatedAtDesc(
                postId, Comment.CommentStatus.ACTIVE, pageable);
        return comments.map(CommentResponse::fromCommentWithoutReplies);
    }
    
    // Get replies for a comment
    public List<CommentResponse> getCommentReplies(Long commentId) {
        List<Comment> replies = commentRepository.findByParentCommentIdAndStatusOrderByCreatedAtAsc(
                commentId, Comment.CommentStatus.ACTIVE);
        return replies.stream()
                .map(CommentResponse::fromCommentWithoutReplies)
                .collect(Collectors.toList());
    }
    
    // Create comment
    @Transactional
    public CommentResponse createComment(Long postId, CommentRequest request, List<MultipartFile> files) {
        User currentUser = userService.getCurrentUser();
        
        // Check if post exists
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        // Check parent comment if it's a reply
        Comment parentComment = null;
        if (request.getParentCommentId() != null) {
            parentComment = commentRepository.findByIdAndStatusWithMedia(
                    request.getParentCommentId(), Comment.CommentStatus.ACTIVE)
                    .orElseThrow(() -> new RuntimeException("Parent comment not found with id: " + request.getParentCommentId()));
            
            // Make sure parent comment belongs to the same post
            if (!parentComment.getPost().getId().equals(postId)) {
                throw new RuntimeException("Parent comment does not belong to this post");
            }
        }
        
        // Create comment
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setAuthor(currentUser);
        comment.setParentComment(parentComment);
        comment.setStatus(Comment.CommentStatus.ACTIVE);
        
        Comment savedComment = commentRepository.save(comment);
        
        // Process media files if any
        if (files != null && !files.isEmpty()) {
            List<MultipartFile> validFiles = files.stream()
                    .filter(file -> file != null && !file.isEmpty())
                    .collect(Collectors.toList());
            
            if (!validFiles.isEmpty()) {
                try {
                    List<CommentMedia> mediaList = commentMediaService.processCommentMedia(savedComment, validFiles);
                    log.info("Processed {} media files for comment: {}", mediaList.size(), savedComment.getId());
                } catch (Exception e) {
                    // If media processing fails, delete the comment
                    commentRepository.delete(savedComment);
                    throw new RuntimeException("Failed to process media files: " + e.getMessage());
                }
            }
        }
        
        // Update comment counts
        updateCommentCounts(post);
        
        log.info("Comment created: {} for post: {} by user: {}", savedComment.getId(), postId, currentUser.getUsername());
        return CommentResponse.fromCommentWithoutReplies(savedComment);
    }
    
    // Update comment
    @PreAuthorize("@commentService.isCommentOwner(#commentId, authentication.principal.id) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public CommentResponse updateComment(Long commentId, CommentRequest request) {
        Comment comment = commentRepository.findByIdAndStatusWithMedia(commentId, Comment.CommentStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));
        
        // Update comment content
        comment.setContent(request.getContent());
        comment.setIsEdited(true);
        
        Comment updatedComment = commentRepository.save(comment);
        
        log.info("Comment updated: {} by user: {}", commentId, userService.getCurrentUser().getUsername());
        return CommentResponse.fromCommentWithoutReplies(updatedComment);
    }
    
    // Soft delete comment
    @PreAuthorize("@commentService.isCommentOwner(#commentId, authentication.principal.id) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findByIdAndStatusWithMedia(commentId, Comment.CommentStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));
        
        // Soft delete - change status instead of actual deletion
        comment.setStatus(Comment.CommentStatus.DELETED);
        comment.setContent("[Comment has been deleted]");
        
        // Also soft delete all replies
        softDeleteReplies(comment);
        
        commentRepository.save(comment);
        
        // Update comment counts
        Post post = comment.getPost();
        updateCommentCounts(post);
        
        log.info("Comment soft deleted: {} by user: {}", commentId, userService.getCurrentUser().getUsername());
    }
    
    // Hard delete comment (admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void hardDeleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));
        
        // Delete associated media files
        commentMediaService.deleteCommentMedia(commentId);
        
        // Store post reference for count updates
        Post post = comment.getPost();
        
        // Hard delete the comment (cascade will delete replies)
        commentRepository.delete(comment);
        
        // Update comment counts
        updateCommentCounts(post);
        
        log.info("Comment hard deleted: {} by admin: {}", commentId, userService.getCurrentUser().getUsername());
    }
    
    // Get comment by ID
    public CommentResponse getCommentById(Long commentId) {
        Comment comment = commentRepository.findByIdAndStatusWithMedia(commentId, Comment.CommentStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));
        return CommentResponse.fromComment(comment);
    }
    
    // Get user's comments
    public Page<CommentResponse> getUserComments(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Comment> comments = commentRepository.findByAuthorIdAndStatusOrderByCreatedAtDesc(
                userId, Comment.CommentStatus.ACTIVE, pageable);
        return comments.map(CommentResponse::fromCommentWithoutReplies);
    }
    
    // Search comments
    public Page<CommentResponse> searchComments(Long postId, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Comment> comments = commentRepository.searchCommentsByContent(
                postId, Comment.CommentStatus.ACTIVE, keyword, pageable);
        return comments.map(CommentResponse::fromCommentWithoutReplies);
    }
    
    // Helper methods
    public boolean isCommentOwner(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        return comment != null && comment.getAuthor().getId().equals(userId);
    }
    
    private void softDeleteReplies(Comment parentComment) {
        List<Comment> replies = commentRepository.findByParentCommentIdAndStatusOrderByCreatedAtAsc(
                parentComment.getId(), Comment.CommentStatus.ACTIVE);
        
        for (Comment reply : replies) {
            reply.setStatus(Comment.CommentStatus.DELETED);
            reply.setContent("[Comment has been deleted]");
            
            // Recursively delete nested replies
            softDeleteReplies(reply);
        }
        
        commentRepository.saveAll(replies);
    }
    
    private void updateCommentCounts(Post post) {
        long totalActiveComments = commentRepository.countByPostIdAndStatus(post.getId(), Comment.CommentStatus.ACTIVE);
        post.setCommentCount(totalActiveComments);
        postRepository.save(post);
    }
}