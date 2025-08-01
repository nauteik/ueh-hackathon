package com.example.be_hackathon_ueh_2025.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {
    
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;
    
    @Value("${app.base.url:http://localhost:8080}")
    private String baseUrl;
    
    public String saveFile(MultipartFile file, String subDirectory) throws IOException {
        // Create directory if not exists
        Path uploadPath = Paths.get(uploadDir, subDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        log.info("File saved: {}", filePath.toString());
        return uniqueFilename;
    }
    
    public String generateThumbnail(String imagePath, int width, int height) throws IOException {
        File originalFile = new File(uploadDir + "/" + imagePath);
        BufferedImage originalImage = ImageIO.read(originalFile);
        
        // Calculate aspect ratio
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();
        double aspectRatio = (double) originalWidth / originalHeight;
        
        if (width / aspectRatio > height) {
            width = (int) (height * aspectRatio);
        } else {
            height = (int) (width / aspectRatio);
        }
        
        // Create thumbnail
        BufferedImage thumbnail = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = thumbnail.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.drawImage(originalImage, 0, 0, width, height, null);
        g2d.dispose();
        
        // Save thumbnail
        String thumbnailPath = imagePath.replace(".", "_thumb.");
        File thumbnailFile = new File(uploadDir + "/" + thumbnailPath);
        ImageIO.write(thumbnail, "jpg", thumbnailFile);
        
        return thumbnailPath;
    }
    
    public String getFileUrl(String relativePath) {
        return baseUrl + "/files/" + relativePath;
    }
    
    public void deleteFile(String relativePath) {
        try {
            Path filePath = Paths.get(uploadDir, relativePath);
            Files.deleteIfExists(filePath);
            log.info("File deleted: {}", filePath.toString());
        } catch (IOException e) {
            log.error("Failed to delete file: {}", relativePath, e);
        }
    }
    
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf('.') == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.'));
    }
    
    public boolean isImageFile(String contentType) {
        return contentType != null && contentType.startsWith("image/");
    }
    
    public boolean isVideoFile(String contentType) {
        return contentType != null && contentType.startsWith("video/");
    }
    
    public long getFileSize(String relativePath) {
        try {
            Path filePath = Paths.get(uploadDir, relativePath);
            return Files.size(filePath);
        } catch (IOException e) {
            log.error("Failed to get file size: {}", relativePath, e);
            return 0;
        }
    }
}