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

export interface ProductInfo {
  tieude: string;
  hinhdaidien: string;
  chophepbinhluan: string;
  hienthibinhluan: string;
  hinhlienquan: Array<{ id: string; ord: string; hinhdaidien: string }>;
  [key: string]: unknown;
  luotxem: number;
  noidungchitiet: string;
}
