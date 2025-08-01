package com.example.be_hackathon_ueh_2025.service;

import com.example.be_hackathon_ueh_2025.model.Comment;
import com.example.be_hackathon_ueh_2025.model.CommentMedia;
import com.example.be_hackathon_ueh_2025.repository.CommentMediaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentMediaService {
    
    private final CommentMediaRepository commentMediaRepository;
    private final FileStorageService fileStorageService;
    
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for comments
    private static final int MAX_FILES_PER_COMMENT = 3;
    
    @Transactional
    public List<CommentMedia> processCommentMedia(Comment comment, List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return Collections.emptyList();
        }
        
        validateFiles(files);
        
        List<CommentMedia> mediaList = new ArrayList<>();
        List<String> processedFiles = new ArrayList<>();
        
        try {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                CommentMedia media = processMediaFile(file, comment, i);
                mediaList.add(media);
                processedFiles.add(media.getFilePath());
            }
            
            return commentMediaRepository.saveAll(mediaList);
            
        } catch (Exception e) {
            // Cleanup processed files on error
            cleanupFiles(processedFiles);
            throw new RuntimeException("Failed to process comment media files: " + e.getMessage(), e);
        }
    }
    
    private void validateFiles(List<MultipartFile> files) {
        if (files.size() > MAX_FILES_PER_COMMENT) {
            throw new RuntimeException("Maximum " + MAX_FILES_PER_COMMENT + " files allowed per comment");
        }
        
        for (MultipartFile file : files) {
            validateSingleFile(file);
        }
    }
    
    private void validateSingleFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File too large: " + file.getOriginalFilename() + 
                                     ". Maximum size is " + (MAX_FILE_SIZE / 1024 / 1024) + "MB");
        }
        
        String contentType = file.getContentType();
        if (!isAllowedFileType(contentType)) {
            throw new RuntimeException("File type not allowed: " + contentType + 
                                     ". Only images and videos are supported");
        }
    }
    
    private boolean isAllowedFileType(String contentType) {
        if (contentType == null) return false;
        
        return contentType.equals("image/jpeg") ||
               contentType.equals("image/png") ||
               contentType.equals("image/gif") ||
               contentType.equals("image/webp") ||
               contentType.equals("video/mp4") ||
               contentType.equals("video/mpeg") ||
               contentType.equals("video/quicktime");
    }
    
    private CommentMedia processMediaFile(MultipartFile file, Comment comment, int displayOrder) throws IOException {
        String contentType = file.getContentType();
        boolean isImage = fileStorageService.isImageFile(contentType);
        boolean isVideo = fileStorageService.isVideoFile(contentType);
        
        CommentMedia.MediaType mediaType = isImage ? CommentMedia.MediaType.IMAGE : CommentMedia.MediaType.VIDEO;
        String subDirectory = "comments/" + comment.getId() + "/" + (isImage ? "images" : "videos");
        
        // Save main file
        String fileName = fileStorageService.saveFile(file, subDirectory);
        String filePath = subDirectory + "/" + fileName;
        String fileUrl = fileStorageService.getFileUrl(filePath);
        
        // Create CommentMedia entity
        CommentMedia media = new CommentMedia();
        media.setFileName(fileName);
        media.setOriginalFileName(file.getOriginalFilename());
        media.setFilePath(filePath);
        media.setFileUrl(fileUrl);
        media.setMediaType(mediaType);
        media.setFileSize(file.getSize());
        media.setMimeType(contentType);
        media.setDisplayOrder(displayOrder);
        media.setComment(comment);
        
        // Process based on media type
        if (isImage) {
            processImageMetadata(media, filePath);
        } else if (isVideo) {
            processVideoMetadata(media, filePath);
        }
        
        return media;
    }
    
    private void processImageMetadata(CommentMedia media, String filePath) {
        try {
            File imageFile = new File("uploads/" + filePath);
            BufferedImage image = ImageIO.read(imageFile);
            
            if (image != null) {
                media.setWidth(image.getWidth());
                media.setHeight(image.getHeight());
                
                // Generate thumbnail for comment images
                String thumbnailPath = fileStorageService.generateThumbnail(filePath, 150, 150);
                String thumbnailUrl = fileStorageService.getFileUrl(thumbnailPath);
                media.setThumbnail(thumbnailUrl);
            }
            
        } catch (IOException e) {
            log.error("Failed to process comment image metadata for: {}", filePath, e);
        }
    }
    
    private void processVideoMetadata(CommentMedia media, String filePath) {
        try {
            // Simplified video processing for comments
            media.setWidth(480);
            media.setHeight(360);
            media.setDuration(0);
            
            // Set placeholder thumbnail for videos
            media.setThumbnail(fileStorageService.getFileUrl("defaults/video-placeholder.png"));
            
        } catch (Exception e) {
            log.error("Failed to process comment video metadata for: {}", filePath, e);
        }
    }
    
    private void cleanupFiles(List<String> filePaths) {
        for (String path : filePaths) {
            fileStorageService.deleteFile(path);
        }
    }
    
    @Transactional
    public void deleteCommentMedia(Long commentId) {
        List<CommentMedia> mediaList = commentMediaRepository.findByCommentIdOrderByDisplayOrder(commentId);
        
        for (CommentMedia media : mediaList) {
            // Delete physical files
            fileStorageService.deleteFile(media.getFilePath());
            if (media.getThumbnail() != null) {
                String thumbnailPath = media.getThumbnail().replace(fileStorageService.getFileUrl(""), "");
                fileStorageService.deleteFile(thumbnailPath);
            }
        }
        
        // Delete database records
        commentMediaRepository.deleteByCommentId(commentId);
    }
    
    public List<CommentMedia> getCommentMedia(Long commentId) {
        return commentMediaRepository.findByCommentIdOrderByDisplayOrder(commentId);
    }
}