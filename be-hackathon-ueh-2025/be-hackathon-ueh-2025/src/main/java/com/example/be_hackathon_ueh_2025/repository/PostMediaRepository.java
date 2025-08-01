package com.example.be_hackathon_ueh_2025.repository;

import com.example.be_hackathon_ueh_2025.model.PostMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostMediaRepository extends JpaRepository<PostMedia, Long> {
    
    List<PostMedia> findByPostIdOrderByDisplayOrder(Long postId);
    
    @Modifying
    @Query("DELETE FROM PostMedia pm WHERE pm.post.id = :postId")
    void deleteByPostId(@Param("postId") Long postId);
    
    long countByPostId(Long postId);
}