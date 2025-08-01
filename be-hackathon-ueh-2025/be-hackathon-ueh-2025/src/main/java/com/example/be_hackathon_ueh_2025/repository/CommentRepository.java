package com.example.be_hackathon_ueh_2025.repository;

import com.example.be_hackathon_ueh_2025.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Get top-level comments for a post (not replies, only active)
    Page<Comment> findByPostIdAndParentCommentIsNullAndStatusOrderByCreatedAtDesc(
            Long postId, Comment.CommentStatus status, Pageable pageable);
    
    // Get replies for a comment (only active)
    List<Comment> findByParentCommentIdAndStatusOrderByCreatedAtAsc(
            Long parentCommentId, Comment.CommentStatus status);
    
    // Count active comments for a post
    long countByPostIdAndStatus(Long postId, Comment.CommentStatus status);
    
    // Count active replies for a comment
    long countByParentCommentIdAndStatus(Long parentCommentId, Comment.CommentStatus status);
    
    // Get user's comments
    Page<Comment> findByAuthorIdAndStatusOrderByCreatedAtDesc(
            Long authorId, Comment.CommentStatus status, Pageable pageable);
    
    // Search comments by content
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId AND c.status = :status AND c.content LIKE %:keyword% ORDER BY c.createdAt DESC")
    Page<Comment> searchCommentsByContent(
            @Param("postId") Long postId, 
            @Param("status") Comment.CommentStatus status,
            @Param("keyword") String keyword, 
            Pageable pageable);
    
    // Get comment with media
    @Query("SELECT c FROM Comment c LEFT JOIN FETCH c.media WHERE c.id = :commentId AND c.status = :status")
    Optional<Comment> findByIdAndStatusWithMedia(@Param("commentId") Long commentId, @Param("status") Comment.CommentStatus status);
    
    // Get comment with replies
    @Query("SELECT c FROM Comment c LEFT JOIN FETCH c.replies WHERE c.id = :commentId AND c.status = :status")
    Optional<Comment> findByIdAndStatusWithReplies(@Param("commentId") Long commentId, @Param("status") Comment.CommentStatus status);
}