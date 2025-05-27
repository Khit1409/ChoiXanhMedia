//api chung của sản phẩm
export interface ProductState {
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
  data: [[Object]];
}
//api chi tiết sản phẩm
export interface ProductDetailContent {
  id: string;
  [name: string]: unknown;
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
export interface ProductDescription {
  id: string;
  chophepbinhluan: boolean;
  hienthibinhluan: boolean;
  ngaydang: Date;
  ma: string;
  hinhdaidien: string;
  hinhlienquan: Array<{
    id: string;
    ord: string;
    hinhdaidien: string;
    tieude: string;
  }>;
  url: string;
  luotxem: number;
  tieude: string;
}
