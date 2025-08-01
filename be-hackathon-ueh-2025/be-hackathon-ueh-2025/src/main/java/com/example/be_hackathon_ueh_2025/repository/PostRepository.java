package com.example.be_hackathon_ueh_2025.repository;

import com.example.be_hackathon_ueh_2025.model.Post;
import com.example.be_hackathon_ueh_2025.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    // Find published posts
    Page<Post> findByIsPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
    
    // Find posts by author
    Page<Post> findByAuthorOrderByCreatedAtDesc(User author, Pageable pageable);
    
    // Find published posts by author
    Page<Post> findByAuthorAndIsPublishedTrueOrderByCreatedAtDesc(User author, Pageable pageable);
    
    // Search posts by title or content
    @Query("SELECT p FROM Post p WHERE p.isPublished = true AND (LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) ORDER BY p.createdAt DESC")
    Page<Post> searchPublishedPosts(@Param("keyword") String keyword, Pageable pageable);
    
    // Find post with author info
    @Query("SELECT p FROM Post p JOIN FETCH p.author WHERE p.id = :id")
    Optional<Post> findByIdWithAuthor(@Param("id") Long id);
    
    // Increment view count
    @Modifying
    @Query("UPDATE Post p SET p.viewCount = p.viewCount + 1 WHERE p.id = :id")
    void incrementViewCount(@Param("id") Long id);
    
    // Get posts count by author
    long countByAuthor(User author);
    
    // Get published posts count by author
    long countByAuthorAndIsPublishedTrue(User author);
}