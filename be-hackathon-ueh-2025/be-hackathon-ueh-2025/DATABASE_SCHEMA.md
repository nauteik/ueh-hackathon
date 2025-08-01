# Database Schema cho Tính năng Diễn đàn

## Tổng quan
Hệ thống database được thiết kế để hỗ trợ một nền tảng diễn đàn xã hội với các tính năng sau:
- Đăng bài viết với text, hình ảnh và video
- Bình luận và trả lời bình luận
- Like/Unlike bài viết và bình luận
- Theo dõi người dùng
- Thông báo real-time
- Phân loại bài viết bằng tags

## Các Model chính

### 1. User (Người dùng)
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar VARCHAR(255),
    bio TEXT,
    role ENUM('USER', 'ADMIN', 'MODERATOR') DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Post (Bài viết)
```sql
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    view_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    comment_count BIGINT DEFAULT 0,
    status ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'DELETED') DEFAULT 'DRAFT',
    author_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### 3. Comment (Bình luận)
```sql
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    like_count BIGINT DEFAULT 0,
    is_edited BOOLEAN DEFAULT FALSE,
    status ENUM('ACTIVE', 'DELETED', 'HIDDEN') DEFAULT 'ACTIVE',
    author_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    parent_comment_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id)
);
```

### 4. PostMedia (Media của bài viết)
```sql
CREATE TABLE post_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    media_type ENUM('IMAGE', 'VIDEO') NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    width INT,
    height INT,
    duration INT,
    thumbnail VARCHAR(500),
    display_order INT DEFAULT 0,
    post_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
```

### 5. CommentMedia (Media của bình luận)
```sql
CREATE TABLE comment_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    media_type ENUM('IMAGE', 'VIDEO') NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    width INT,
    height INT,
    duration INT,
    thumbnail VARCHAR(500),
    display_order INT DEFAULT 0,
    comment_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);
```

### 6. PostLike (Like bài viết)
```sql
CREATE TABLE post_likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_post_like (post_id, user_id)
);
```

### 7. CommentLike (Like bình luận)
```sql
CREATE TABLE comment_likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    comment_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_comment_like (comment_id, user_id)
);
```

### 8. Tag (Thẻ phân loại)
```sql
CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7),
    post_count BIGINT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9. PostTags (Quan hệ nhiều-nhiều giữa Post và Tag)
```sql
CREATE TABLE post_tags (
    post_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

### 10. UserFollow (Theo dõi người dùng)
```sql
CREATE TABLE user_follows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    follower_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id),
    UNIQUE KEY unique_follow (follower_id, following_id)
);
```

### 11. Notification (Thông báo)
```sql
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    type ENUM('NEW_COMMENT', 'NEW_REPLY', 'POST_LIKED', 'COMMENT_LIKED', 'NEW_FOLLOWER', 'MENTION', 'SYSTEM') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    reference_id BIGINT,
    reference_type VARCHAR(50),
    user_id BIGINT NOT NULL,
    actor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (actor_id) REFERENCES users(id)
);
```

## Đặc điểm nổi bật

### 1. Hỗ trợ Media đa dạng
- **PostMedia** và **CommentMedia**: Lưu trữ hình ảnh và video
- Thông tin chi tiết: kích thước, thời lượng (video), thumbnail
- Hỗ trợ sắp xếp thứ tự hiển thị

### 2. Hệ thống Comment đa cấp
- Bình luận có thể reply (parent_comment_id)
- Theo dõi số lượng like cho từng comment
- Trạng thái comment (active, deleted, hidden)

### 3. Tối ưu hiệu suất
- Lưu cache số lượng (like_count, comment_count, view_count)
- Index unique để tránh duplicate like
- Lazy loading cho relationships

### 4. Hệ thống thông báo linh hoạt
- Nhiều loại thông báo khác nhau
- Lưu trữ reference đến đối tượng liên quan
- Theo dõi người thực hiện hành động (actor)

### 5. Phân quyền và bảo mật
- Role-based access (USER, ADMIN, MODERATOR)
- Trạng thái hoạt động của user
- Soft delete với status fields

## Cách sử dụng

1. **Tạo bài viết**: User tạo Post → upload PostMedia → gắn Tag
2. **Tương tác**: User like Post/Comment → tạo PostLike/CommentLike → trigger Notification
3. **Bình luận**: User tạo Comment → upload CommentMedia → trigger Notification
4. **Theo dõi**: User follow User khác → tạo UserFollow → trigger Notification

## Mở rộng tương lai
- Hỗ trợ mention (@username)
- Bookmark bài viết
- Report nội dung vi phạm
- Analytics và insights
- Tính năng poll/survey
