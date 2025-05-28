//api sản phẩm trả về
export interface DataProductResponse {
  id: string;
  module: string;
  tenham: string;
  tieude: string;
  url: string;
  metatitle: string;
  metakeywords: string;
  metadescriptions: string;
  kieu: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: Array<DataProduct>;
}
//interface của data trong api sản phẩm trả về
export interface DataProduct {
  id?: string;
  tieude?: string;
  gia?: number;
  giakhuyenmai?: number;
  ngaydang?: string;
  hinhdaidien?: string;
  hinhanh?: Array<{
    id: string;
    hinhdaidien: string;
    tieude: string;
  }>;
  [name: string]: unknown;
}
//interface menu của user sau khi đăng nhập
export interface Menu {
  tieude: string;
  url: string;
}
//api slide hình ảnh
export interface ProductDetailImage {
  error: string;
  mesage: string;
  tieude: string;
  xemthem: string;
  tennhom: string;
  data: Array<{
    id: string;
    IDPart: string;
    ord: number;
    hinhdaidien: string;
  }>;
}
// api mô tả va chi tiet
export interface ProductInfo {
  id: string;
  chophepbinhluan: boolean;
  hienthibinhluan: boolean;
  // thong so
  [thongso: string]: unknown;
  //
  ngaydang: Date;
  ma: string;
  gia: number;
  giakhuyenmai: number;
  giasi: number;
  // không lấy
  hinhdaidien: string;
  hinhlienquan: Array<{
    id: string;
    ord: string;
    hinhdaidien: string;
    tieude: string;
  }>;
  //
  url: string;
  luotxem: number;
  tieude: string;
  noidungchitiet: string;
}
//interface chi tiết sản phẩm
export interface ProductDetail {
  images: ProductDetailImage[];
  info: ProductInfo[];
}
// interface
export interface AddCartResponse {
  ThongBao: string;
  maloi: string | number;
  link: string;
  sobg: number;
}
// interface
export interface AddWishlistResponse {
  ThongBao: string;
  maloi: string | number;
  link: string;
  giohang: number;
  sobg: number;
}

export interface OrderState {
  ThongBao: string;
  maloi: string;
}

// interface chính
export interface ProductState {
  products: DataProductResponse[] | null;
  productDetail: ProductDetail[] | null;
  addcart: AddCartResponse[] | null;
  menu: Menu[] | null;
  oderResult: OrderState[] | null;
  loading: boolean;
  error: string | null;
}
//initial state
export const initialState: ProductState = {
  products: null,
  menu: null,
  addcart: null,
  oderResult: null,
  loading: false,
  productDetail: null,
  error: null,
};
