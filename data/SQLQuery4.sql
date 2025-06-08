use kidnine


-- 3. Thêm product categories
INSERT INTO productsCategories (name, totalQuantity, filter_url, parent_id, created_at, updated_at)
VALUES 
(N'Ốp lưng', 100, 'op-lung',5 , GETDATE(), GETDATE()),
(N'Sạc nhanh', 80, 'sac-nhanh', 5, GETDATE(), GETDATE());

-- 4. Thêm 10 sản phẩm mẫu
INSERT INTO products (name, price, sale, description, img, parent_id, created_at, updated_at)
VALUES 
(N'Ốp lưng iPhone 12', 150000, 120000, N'Ốp lưng chống sốc cho iPhone 12', 'op12.jpg', 5, GETDATE(), GETDATE()),
(N'Ốp lưng iPhone 13', 160000, 130000, N'Ốp trong suốt iPhone 13', 'op13.jpg', 5, GETDATE(), GETDATE()),
(N'Ốp lưng Samsung S21', 140000, 110000, N'Ốp lưng dẻo Samsung', 'ops21.jpg', 5, GETDATE(), GETDATE()),
(N'Sạc nhanh 20W', 200000, 180000, N'Sạc nhanh cho iPhone', 'sac20w.jpg', 5, GETDATE(), GETDATE()),
(N'Sạc nhanh Samsung', 210000, 190000, N'Sạc nhanh chính hãng', 'sacsam.jpg', 5, GETDATE(), GETDATE()),
(N'Cáp sạc USB-C', 100000, 80000, N'Cáp sạc nhanh USB-C', 'capc.jpg', 5, GETDATE(), GETDATE()),
(N'Cáp Lightning', 110000, 90000, N'Cáp Lightning chuẩn MFi', 'capl.jpg', 5, GETDATE(), GETDATE()),
(N'Ốp lưng iPhone 14', 170000, 150000, N'Ốp silicon iPhone 14', 'op14.jpg', 5, GETDATE(), GETDATE()),
(N'Giá đỡ điện thoại', 90000, 70000, N'Giá đỡ trên ô tô', 'gia-do.jpg', 5, GETDATE(), GETDATE()),
(N'Ốp chống nước', 180000, 160000, N'Ốp dùng khi đi biển', 'opwater.jpg', 5, GETDATE(), GETDATE());