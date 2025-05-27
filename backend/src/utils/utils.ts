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
