package com.example.be_hackathon_ueh_2025.repository;

import com.example.be_hackathon_ueh_2025.model.CommentMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMediaRepository extends JpaRepository<CommentMedia, Long> {
    
    List<CommentMedia> findByCommentIdOrderByDisplayOrder(Long commentId);
    
    @Modifying
    @Query("DELETE FROM CommentMedia cm WHERE cm.comment.id = :commentId")
    void deleteByCommentId(@Param("commentId") Long commentId);
    
    long countByCommentId(Long commentId);
}