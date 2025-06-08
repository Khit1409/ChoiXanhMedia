// state sản phẩm trả về từ api
export interface ProductsCategories {
  id: number;
  name: string;
  filter_keyword: string;
  filter_url: string;
  parent_id: string;
  created_at: Date;
  updated_at: Date;
  data: [Products];
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  sale: number;
  description: string;
  img: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  info: Array<{
    id: number;
    name: string;
    value: Array<{
      id: number;
      value: string;
      parent_id: number;
      created_at: Date;
      updated_at: Date;
    }>;
    parent_id: number;
    created_at: Date;
    updated_at: Date;
  }>;
  thumbnails: Array<{
    id: number;
    name: string;
    src: string;
    parent_id: number;
    created_at: Date;
    updated_at: Date;
  }>;
}
//interface bảng sản phẩm
export interface Products {
  id: number;
  name: string;
  price: number;
  sale: number;
  description: string;
  img: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
}
//interface thông tin sản phẩm
export interface ProductInfo {
  id: number;
  name: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
  value: string[];
}
// state nội dung tin tức
export interface BlogsCategories {
  id: number;
  name: string;
  filter_url: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface blogs {
  id: number;
  name: string;
  description: string;
  content: string;
  url: string;
  img: string;
  created_at: Date;
  updated_at: Date;
}
export interface blogsState {
  id: number;
  name: string;
  filter_url: string;
  tototalQuantiy: number;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  data: blogs[];
}

export interface CreateProductReq {
  productName: string;
  price: number;
  parentId: number;
  sale: number;
  filter_keyword:string;
  description: string;
  category_filter_url: string;
  category_name: string;
  img: string;
  productInfo: {
    name: string;
    productInfoValue: { value: string }[];
  }[];
  thumbnails: {
    name: string;
    src: string;
  }[];
}

export interface CreateBlogRequest {
  parentId: number;
  category_name: string;
  filter_url: string;
  blog_name: string;
  description: string;
  img: string;
  url: string;
  content: string;
}
interface ProductState {
  blogs: blogsState[] | null;
  products: ProductsCategories[] | null;
  loading: boolean;
  productDetail: ProductDetail[] | null;
  resultCode: number | null;
  blogDetail:blogs[]|null;
  error: string | null;
}
//initial state
export const initialState: ProductState = {
  products: null,
  blogDetail:null,
  blogs: null,
  productDetail: null,
  resultCode: null,
  loading: false,
  error: null,
};
