USE kidnine;

-- Insert page categories
INSERT INTO pageCategories (name, url, created_at, updated_at) VALUES
('Home', 'home', GETDATE(), GETDATE()),
('Shop', 'shop', GETDATE(), GETDATE()),
('Blog', 'blog', GETDATE(), GETDATE()),
('Contact', 'contact', GETDATE(), GETDATE()),
('About Us', 'about-us', GETDATE(), GETDATE());

-- Insert child categories (child of Shop)
INSERT INTO pageCategoryChild (parent_id, name, url, created_at, updated_at) VALUES
(2, 'Fashion', 'fashion', GETDATE(), GETDATE()),
(2, 'Car', 'car', GETDATE(), GETDATE()),
(2, 'Electronics', 'electronics', GETDATE(), GETDATE()),
(2, 'Books', 'books', GETDATE(), GETDATE());

-- Insert custom SEO (level 1)
INSERT INTO customSeo (parent_id, parentSecond_id, filter_params, title, pageName, description, created_at, updated_at) VALUES
(1, NULL, '', 'Trang chủ', 'Home', 'Mô tả trang chủ', GETDATE(), GETDATE()),
(2, NULL, 'shop', 'Cửa hàng', 'Shop', 'Mô tả cửa hàng', GETDATE(), GETDATE());

-- Insert custom SEO (level 2)
INSERT INTO customSeo (parent_id, parentSecond_id, filter_params, title, pageName, description, created_at, updated_at) VALUES
(2, 1, 'fashion', 'Thời trang', 'Fashion', 'Mô tả thời trang', GETDATE(), GETDATE()),
(2, 2, 'car', 'Xe', 'Car', 'Mô tả xe', GETDATE(), GETDATE());

-- Insert keywords
INSERT INTO customSeoKeywords (parent_id, content, created_at, updated_at) VALUES
(1, 'home, trang chủ', GETDATE(), GETDATE()),
(2, 'shop, cửa hàng', GETDATE(), GETDATE()),
(3, 'fashion, thời trang', GETDATE(), GETDATE()),
(4, 'car, ô tô', GETDATE(), GETDATE());
