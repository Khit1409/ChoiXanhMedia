import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import menuReducer from './slices/menuSlice'
export { productReducer, authReducer,menuReducer };

// //lấy url chuyển trang
export const toSlug = (str: string) => {
  return str
    .toLowerCase() // viết thường
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d") // chuyển đ thành d
    .replace(/[^a-z0-9\s-]/g, "") // loại bỏ ký tự đặc biệt
    .trim() // bỏ khoảng trắng đầu cuối
    .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu -
    .replace(/-+/g, "-"); // loại bỏ dấu - trùng lặp
};

export function decodeHtml(html: string): string {
  return html.replace(/\\\//g, "/"); // chuyển \<\/strong> thành </strong>
}
export function fixBrokenJson(input: string) {
  // Bước 1: Loại bỏ ký tự \r\n không cần thiết
  let cleaned = input.replace(/\\r\\n/g, "");

  // Bước 2: Thay '' bằng "
  cleaned = cleaned.replace(/''/g, '"');

  // Bước 3: Thay dấu nháy đơn trong object chính (ví dụ: , ''cpu'':[...]) thành dấu nháy kép
  cleaned = cleaned.replace(/,\s*'([^']+)':/g, ', "$1":');
  cleaned = cleaned.replace(/\{\s*'([^']+)':/g, '{ "$1":');

  // Bước 4: Loại bỏ trường trùng lặp (ví dụ: 2 trường "cpu")
  return cleaned;
}

// chuyển thông số sản phẩm sang tiếng viêt
export function reNameInfo(tieude: string): string {
  const list = [
    { thuonghieu: "Thương hiệu" },
    { ram: "RAM" },
    { cpu: "CPU" },
    { mainboard: "Main Board" },
    { ocung: "Ổ cứng" },
    { carddohoa: "Card đồ họa" },
    { nhucau: "Nhu cầu" },
    { kichcomanhinh: "Kích cỡ màn hình" },
    { kichthuocmanhinh: "Kích thước màn hình" },
    { dungluong: "Dung lượng" },
    { hangsanxuat: "Hãng sản xuất" },
    { dophangiai: "Độ phân giải" },
    { hedieuhanhtivi: "Hệ điều hành tivi" },
    { kichcomanhinhtivi: "Kích cỡ màn hình Tivi" },
    { tienich: "Tiện ích" },
    { gia: "Giá" },
    { giakhuyenmai: "Giá khuyến mại" },
    { congxuat: "Công xuất" },
    { congnghe: "Công nghệ" },
    { loaimay: "Loại máy" },
    { kieudang: "Kiểu dáng" },
    { tinhnangdacbiet: "Tính năng đặc biệt" },
    { hieunangvapin: "Hiệu năng và pin" },
    { camera: "Camera" },
    { tansoquet: "Tần số quét" },
    { dungluongram: "Dung luong ram" },
    { chipxuli: "Chip xử lý" },
    { bonhotrong: "Bộ nhớ trong" },
    { phanloai: "Phân loại" },
  ];

  const item = list.find((obj) => Object.keys(obj)[0] === tieude);
  return item ? Object.values(item)[0] : tieude;
}
// viết hoa chữ cái đầu
export function capitalizeWords(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

