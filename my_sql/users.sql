-- Tạo database --
CREATE DATABASE ChoiXanhMedia;

USE ChoiXanhMedia;

-- User --
CREATE TABLE
  users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- User authenticate --
CREATE TABLE
  users_auths (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    user_role ENUM ('user', 'admin', 'seller'),
    signin_method ENUM ('Default', 'Google', 'Facebook', 'Twitter'),
    identifier VARCHAR(255) NOT NULL UNIQUE,
    hashed_pass VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

-- Role category --
CREATE TABLE
  role_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role ENUM ('user', 'admin', 'seller') NOT NULL,
    content VARCHAR(100),
    url VARCHAR(100)
  );

-- User / Admin / Seller info --
CREATE TABLE
  user_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_phone VARCHAR(11),
    user_address VARCHAR(200),
    user_nickname VARCHAR(50),
    user_avt VARCHAR(255),
    user_email VARCHAR(255) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

-- truy vấn nhanh --
CREATE INDEX idx_user_auths_user_id ON users_auths (user_id);

CREATE INDEX idx_user_info_user_id ON user_info (user_id);