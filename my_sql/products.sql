-- Bảng sản phẩm chính --
CREATE TABLE
  products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

-- Thông tin sản phẩm --
CREATE TABLE
  products_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price FLOAT NOT NULL,
    product_sale FLOAT,
    total_quantity INT,
    product_description VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

-- Ảnh chính sản phẩm --
CREATE TABLE
  products_main_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    product_image VARCHAR(255),
    product_image_alt VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

-- Ảnh phụ sản phẩm --
CREATE TABLE
  products_thumbnails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    product_thumbnail_img VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

-- Thuộc tính sản phẩm --
CREATE TABLE
  products_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attributes_name VARCHAR(100),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

-- Giá trị thuộc tính sản phẩm --
CREATE TABLE
  products_attributes_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attributes_id INT NOT NULL,
    attr_values VARCHAR(100),
    FOREIGN KEY (attributes_id) REFERENCES products_attributes (id) ON DELETE CASCADE
  );

-- Danh mục sản phẩm --
CREATE TABLE
  product_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_category_content VARCHAR(50)
  );