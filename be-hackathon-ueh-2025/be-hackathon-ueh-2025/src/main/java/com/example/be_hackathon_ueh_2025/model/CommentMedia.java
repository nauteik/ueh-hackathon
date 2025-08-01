package com.example.be_hackathon_ueh_2025.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment_media")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentMedia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;
    
    @Column(name = "file_name", nullable = false)
    private String fileName;
    
    @Column(name = "original_file_name", nullable = false)
    private String originalFileName;
    
    @Column(name = "file_path", nullable = false)
    private String filePath;
    
    @Column(name = "file_url", nullable = false)
    private String fileUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    private MediaType mediaType;
    
    @Column(name = "file_size", nullable = false)
    private Long fileSize;
    
    @Column(name = "mime_type")
    private String mimeType;
    
    @Column(name = "width")
    private Integer width;
    
    @Column(name = "height") 
    private Integer height;
    
    @Column(name = "duration")
    private Integer duration; // for videos, in seconds
    
    @Column(name = "thumbnail")
    private String thumbnail;
    
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    public enum MediaType {
        IMAGE, VIDEO
    }
}
