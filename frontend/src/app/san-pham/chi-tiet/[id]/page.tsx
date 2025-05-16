import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams() as { id: string };

  return (
    <div className="">
      <div className="flex gap-2">
        {/* product 75% */}
        <div className="w-[75%]"></div>
        {/* product info 25% */}
      </div>
    </div>
  );
}

/*//api thông tin chi tiết sản phẩm
https://choixanh.com.vn/ww2/module.sanpham.chitiet.boloc.asp?id=60009
//api slide ảnh chi tiết sản phẩm
https://choixanh.com.vn/ww2/tinhnang.hinhanh.idpart.asp?id=60009
//api mô tả sản phẩm
https://choixanh.com.vn/ww2/module.sanpham.chitiet.asp?id=60009 */
