import axios from "axios";

export const handleAddToCart = async (
  id: string,
  userid: string,
  pass: string
) => {
  try {
    console.log("id", id, "", "user", userid, "pass", pass);
    console.log("hello");
    const res = await axios.post(
      `http://localhost:5000/api/san-pham/them-gio-hang?userid=${userid}&pass=${pass}&id=${id}`
    );
    if (res.data) {
      if (res.data.results == 1) {
        console.log("Thành công!");
      } else {
        console.log("Thất bại");
      }
    }
  } catch (error) {
    console.log("Lỗi thêm vào giỏ hàng!", error);
    console.error("Lỗi không xác định!");
  }
};
