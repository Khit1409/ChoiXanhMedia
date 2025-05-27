-- Bảng trung gian orders <-> products --
CREATE TABLE
    order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        product_name_at_checkout VARCHAR(255),
        price_at_checkout DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
    );