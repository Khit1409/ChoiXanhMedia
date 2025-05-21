import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type PropsType = {
  setModel: (value: boolean) => void;
};

export default function ModelAlert({ setModel }: PropsType) {
  const { auths, products } = useSelector((state: RootState) => ({
    auths: state.auths,
    products: state.products,
  }));

  const authError = auths.error;
  const productError = products.error;

  // state in component
  const [mess, setMess] = useState<string>("Thành công!");
  const [color, setColor] = useState<string>("success");

  useEffect(() => {
    if (authError) {
      setMess(
        "Lỗi xác thực hệ thống vui lòng thao tác lại hoặc liên hệ với nhân viên!"
      );
      setColor("danger");
    } else if (productError) {
      setMess(
        "Lỗi khi thao tác với sản phẩm vui lòng thao tác lại hoặc liên hệ với nhân viên!"
      );
      setColor("danger");
    } else {
      setMess("Thành công!");
      setColor("success");
    }
  }, [authError, productError]);

  return (
    <div>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />

      {/* Modal nội dung */}
      <div
        className={`position-fixed top-50 start-50 translate-middle bg-white p-4 shadow text-${color}`}
        style={{ zIndex: 1050, width: "400px" }}
      >
        <p className="mb-3">{mess}</p>
        <button
          className={`btn btn-${color} rounded-0`}
          onClick={() => setModel(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}
    