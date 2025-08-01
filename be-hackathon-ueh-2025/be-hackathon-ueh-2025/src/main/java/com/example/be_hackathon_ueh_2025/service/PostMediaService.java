package com.example.be_hackathon_ueh_2025.service;

import com.example.be_hackathon_ueh_2025.model.Post;
import com.example.be_hackathon_ueh_2025.model.PostMedia;
import com.example.be_hackathon_ueh_2025.repository.PostMediaRepository;
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
public class PostMediaService {
    
    private final PostMediaRepository postMediaRepository;
    private final FileStorageService fileStorageService;
    
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    private static final int MAX_FILES_PER_POST = 10;
    
    @Transactional
    public List<PostMedia> processPostMedia(Post post, List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return Collections.emptyList();
        }
        
        validateFiles(files);
        
        List<PostMedia> mediaList = new ArrayList<>();
        List<String> processedFiles = new ArrayList<>();
        
        try {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                PostMedia media = processMediaFile(file, post, i);
                mediaList.add(media);
                processedFiles.add(media.getFilePath());
            }
            
            return postMediaRepository.saveAll(mediaList);
            
        } catch (Exception e) {
            // Cleanup processed files on error
            cleanupFiles(processedFiles);
            throw new RuntimeException("Failed to process media files: " + e.getMessage(), e);
        }
    }
    
    private void validateFiles(List<MultipartFile> files) {
        if (files.size() > MAX_FILES_PER_POST) {
            throw new RuntimeException("Maximum " + MAX_FILES_PER_POST + " files allowed per post");
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
               contentType.equals("video/quicktime") ||
               contentType.equals("video/x-msvideo");
    }
    
    private PostMedia processMediaFile(MultipartFile file, Post post, int displayOrder) throws IOException {
        String contentType = file.getContentType();
        boolean isImage = fileStorageService.isImageFile(contentType);
        boolean isVideo = fileStorageService.isVideoFile(contentType);
        
        PostMedia.MediaType mediaType = isImage ? PostMedia.MediaType.IMAGE : PostMedia.MediaType.VIDEO;
        String subDirectory = "posts/" + post.getId() + "/" + (isImage ? "images" : "videos");
        
        // Save main file
        String fileName = fileStorageService.saveFile(file, subDirectory);
        String filePath = subDirectory + "/" + fileName;
        String fileUrl = fileStorageService.getFileUrl(filePath);
        
        // Create PostMedia entity
        PostMedia media = new PostMedia();
        media.setFileName(fileName);
        media.setOriginalFileName(file.getOriginalFilename());
        media.setFilePath(filePath);
        media.setFileUrl(fileUrl);
        media.setMediaType(mediaType);
        media.setFileSize(file.getSize());
        media.setMimeType(contentType);
        media.setDisplayOrder(displayOrder);
        media.setPost(post);
        
        // Process based on media type
        if (isImage) {
            processImageMetadata(media, filePath);
        } else if (isVideo) {
            processVideoMetadata(media, filePath);
        }
        
        return media;
    }
    
    private void processImageMetadata(PostMedia media, String filePath) {
        try {
            File imageFile = new File("uploads/" + filePath);
            BufferedImage image = ImageIO.read(imageFile);
            
            if (image != null) {
                media.setWidth(image.getWidth());
                media.setHeight(image.getHeight());
                
                // Generate thumbnail
                String thumbnailPath = fileStorageService.generateThumbnail(filePath, 300, 200);
                String thumbnailUrl = fileStorageService.getFileUrl(thumbnailPath);
                media.setThumbnail(thumbnailUrl);
            }
            
        } catch (IOException e) {
            log.error("Failed to process image metadata for: {}", filePath, e);
        }
    }
    
    private void processVideoMetadata(PostMedia media, String filePath) {
        try {
            // For video processing, you might want to use FFmpeg or similar
            // This is a simplified version
            media.setWidth(1280); // Default values
            media.setHeight(720);
            media.setDuration(0); // Could be extracted using FFmpeg
            
            // For now, just set a placeholder thumbnail
            // In production, you'd generate actual video thumbnail
            media.setThumbnail(fileStorageService.getFileUrl("defaults/video-placeholder.png"));
            
        } catch (Exception e) {
            log.error("Failed to process video metadata for: {}", filePath, e);
        }
    }
    
    private void cleanupFiles(List<String> filePaths) {
        for (String path : filePaths) {
            fileStorageService.deleteFile(path);
        }
    }
    
    @Transactional
    public void deletePostMedia(Long postId) {
        List<PostMedia> mediaList = postMediaRepository.findByPostIdOrderByDisplayOrder(postId);
        
        for (PostMedia media : mediaList) {
            // Delete physical files
            fileStorageService.deleteFile(media.getFilePath());
            if (media.getThumbnail() != null) {
                String thumbnailPath = media.getThumbnail().replace(fileStorageService.getFileUrl(""), "");
                fileStorageService.deleteFile(thumbnailPath);
            }
        }
        
        // Delete database records
        postMediaRepository.deleteByPostId(postId);
    }
    
    public List<PostMedia> getPostMedia(Long postId) {
        return postMediaRepository.findByPostIdOrderByDisplayOrder(postId);
    }
}