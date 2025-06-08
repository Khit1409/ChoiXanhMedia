use kidnine

-- Insert into productInfo
INSERT INTO productInfo (name, url, parent_id, created_at, updated_at) VALUES 
-- parent_id = 2
(N'Kích thước', 'info-size-2', 2, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-2', 2, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-2', 2, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-2', 2, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-2', 2, GETDATE(), GETDATE()),
-- parent_id = 3
(N'Kích thước', 'info-size-3', 3, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-3', 3, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-3', 3, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-3', 3, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-3', 3, GETDATE(), GETDATE()),
-- parent_id = 4
(N'Kích thước', 'info-size-4', 4, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-4', 4, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-4', 4, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-4', 4, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-4', 4, GETDATE(), GETDATE()),
-- parent_id = 5
(N'Kích thước', 'info-size-5', 5, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-5', 5, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-5', 5, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-5', 5, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-5', 5, GETDATE(), GETDATE()),
-- parent_id = 6
(N'Kích thước', 'info-size-6', 6, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-6', 6, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-6', 6, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-6', 6, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-6', 6, GETDATE(), GETDATE()),
-- parent_id = 7
(N'Kích thước', 'info-size-7', 7, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-7', 7, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-7', 7, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-7', 7, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-7', 7, GETDATE(), GETDATE()),
-- parent_id = 8
(N'Kích thước', 'info-size-8', 8, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-8', 8, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-8', 8, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-8', 8, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-8', 8, GETDATE(), GETDATE()),
-- parent_id = 9
(N'Kích thước', 'info-size-9', 9, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-9', 9, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-9', 9, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-9', 9, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-9', 9, GETDATE(), GETDATE()),
-- parent_id = 10
(N'Kích thước', 'info-size-10', 10, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-10', 10, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-10', 10, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-10', 10, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-10', 10, GETDATE(), GETDATE()),
-- parent_id = 11
(N'Kích thước', 'info-size-11', 11, GETDATE(), GETDATE()),
(N'Màu sắc', 'info-color-11', 11, GETDATE(), GETDATE()),
(N'Chất liệu', 'info-material-11', 11, GETDATE(), GETDATE()),
(N'Thương hiệu', 'info-brand-11', 11, GETDATE(), GETDATE()),
(N'Xuất xứ', 'info-origin-11', 11, GETDATE(), GETDATE());

-- Insert into productThumbnails
INSERT INTO productThumbnails (name, src, parent_id, created_at, updated_at) VALUES 
-- parent_id = 2
(N'Ảnh 1', 'thumb-2-1.jpg', 2, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-2-2.jpg', 2, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-2-3.jpg', 2, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-2-4.jpg', 2, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-2-5.jpg', 2, GETDATE(), GETDATE()),
-- parent_id = 3
(N'Ảnh 1', 'thumb-3-1.jpg', 3, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-3-2.jpg', 3, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-3-3.jpg', 3, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-3-4.jpg', 3, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-3-5.jpg', 3, GETDATE(), GETDATE()),
-- parent_id = 4
(N'Ảnh 1', 'thumb-4-1.jpg', 4, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-4-2.jpg', 4, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-4-3.jpg', 4, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-4-4.jpg', 4, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-4-5.jpg', 4, GETDATE(), GETDATE()),
-- parent_id = 5
(N'Ảnh 1', 'thumb-5-1.jpg', 5, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-5-2.jpg', 5, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-5-3.jpg', 5, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-5-4.jpg', 5, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-5-5.jpg', 5, GETDATE(), GETDATE()),
-- parent_id = 6
(N'Ảnh 1', 'thumb-6-1.jpg', 6, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-6-2.jpg', 6, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-6-3.jpg', 6, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-6-4.jpg', 6, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-6-5.jpg', 6, GETDATE(), GETDATE()),
-- parent_id = 7
(N'Ảnh 1', 'thumb-7-1.jpg', 7, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-7-2.jpg', 7, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-7-3.jpg', 7, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-7-4.jpg', 7, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-7-5.jpg', 7, GETDATE(), GETDATE()),
-- parent_id = 8
(N'Ảnh 1', 'thumb-8-1.jpg', 8, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-8-2.jpg', 8, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-8-3.jpg', 8, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-8-4.jpg', 8, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-8-5.jpg', 8, GETDATE(), GETDATE()),
-- parent_id = 9
(N'Ảnh 1', 'thumb-9-1.jpg', 9, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-9-2.jpg', 9, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-9-3.jpg', 9, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-9-4.jpg', 9, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-9-5.jpg', 9, GETDATE(), GETDATE()),
-- parent_id = 10
(N'Ảnh 1', 'thumb-10-1.jpg', 10, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-10-2.jpg', 10, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-10-3.jpg', 10, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-10-4.jpg', 10, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-10-5.jpg', 10, GETDATE(), GETDATE()),
-- parent_id = 11
(N'Ảnh 1', 'thumb-11-1.jpg', 11, GETDATE(), GETDATE()),
(N'Ảnh 2', 'thumb-11-2.jpg', 11, GETDATE(), GETDATE()),
(N'Ảnh 3', 'thumb-11-3.jpg', 11, GETDATE(), GETDATE()),
(N'Ảnh 4', 'thumb-11-4.jpg', 11, GETDATE(), GETDATE()),
(N'Ảnh 5', 'thumb-11-5.jpg', 11, GETDATE(), GETDATE());
