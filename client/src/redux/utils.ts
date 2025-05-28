import productReducer from "../slices/productSlice";
import authReducer from "../slices/authSlice";
import menuReducer from "../slices/menuSlice";
import {
  faBuilding,
  faDiagramProject,
  faEnvelope,
  faGear,
  faHouse,
  faLeaf,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
export { productReducer, authReducer, menuReducer };

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

export const userMenuList = [
  { id: 1, content: "Thông tin người dùng", url: "/thong-tin-tai-khoan" },
  { id: 2, content: "Đăng ký thành viên", url: "/thong-tin-thanh-vien" },
  { id: 3, content: "Lịch sử giao dịch", url: "/lich-su-giao-dich" },
  { id: 4, content: "Đổi mật khẩu", url: "/doi-mat-khau" },
];

export const footerList = [
  {
    id: 1,
    footer: [
      {
        id: 1,
        icons: [{ id: 1, content: faBuilding }],
        content: "Công ty TNHH Chồi Xanh Media",
        url: "",
      },
      {
        id: 2,
        icons: [{ id: 1, content: faBuilding }],
        content: "82A - 82B Dân Tộc, Q.Tân Phú",
        url: "",
      },
      {
        id: 3,
        icons: [{ id: 1, content: null }],
        content: "MST: 0314581926",
        url: "",
      },
      {
        id: 4,
        icons: [{ id: 1, content: faPhone }],
        content: "028 3974 3179",
        url: "",
      },
      {
        id: 5,
        icons: [{ id: 1, content: faEnvelope }],
        content: "info@choixanh.vn",
        url: "",
      },
    ],
  },
  {
    id: 2,
    footer: [
      {
        id: 1,
        icons: [{ id: 1, content: faDiagramProject }],
        content: "Theo dõi Chồi Xanh Media",
        url: "",
      },
      {
        id: 2,
        icons: [
          { id: 1, content: faFacebook },
          { id: 2, content: faYoutube },
          { id: 3, content: faTwitter },
          { id: 4, content: faInstagram },
          { id: 5, content: faLinkedin },
        ],
        content: "",
        url: "",
      },
      {
        id: 3,
        icons: [{ id: 1, content: faLeaf }],
        content: "Vận hành bởi Chồi Xanh Media thành viên của Atoz.vn",
        url: "",
      },
    ],
  },
  {
    id: 3,
    footer: [
      {
        id: 1,
        icons: [{ id: 1, content: null }],
        content: "Điều khoản sử dụng",
        url: "https://choixanh.com.vn/dieu-khoan-va-dieu-kien-su-dung-trang-web",
      },
      {
        id: 2,
        icons: [{ id: 1, content: null }],
        content: "Chính sách cookie",
        url: "https://choixanh.com.vn/chinh-sach-su-dung-cookie",
      },
      {
        id: 3,
        icons: [{ id: 1, content: null }],
        content: "Chính sách dữ liệu",
        url: "https://choixanh.com.vn/chinh-sach-xu-ly-du-lieu",
      },
      {
        id: 4,
        icons: [{ id: 1, content: null }],
        content: "Chính sách hoạt động & hợp tác",
        url: "https://choixanh.com.vn/chinh-sach-hoat-dong-va-hop-tac",
      },
    ],
  },
];

export const menuList = [
  { id: 1, name: "Trang chủ", url: "/", icon: faHouse },
  { id: 2, name: "Cấu hình", url: "#", icon: faGear },
];
