"use client";

import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// import Image from "next/image";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { AppDispatch, RootState } from "@/redux/store";
import { getProduct } from "@/redux/slices/page.content.slice";

// import Filter from "../tools/Filter";
import Image from "next/image";
import { toSlug } from "@/redux/utils";
import { useSearchParams } from "next/navigation";

export default function ProductContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  // const [filterItems, setFilterItems] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("contentId") ? searchParams.get("contentId") : 0;
  // Fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getProduct({ id: Number(id) }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [dispatch, id]);

  // Toggle bộ lọc
  // const handleToggleFilter = () => {
  //   setFilterItems((prev) => !prev);
  // };
  return products?.length ? (
    <section className="container-fluid py-5">
      {/* Bộ lọc sản phẩm */}
      {/* <div className="pb-4">
        <button className="btn border-success" onClick={handleToggleFilter}>
          <FontAwesomeIcon icon={faFilter} className="text-success" /> Lọc sản
          phẩm
        </button>
      </div>

      {filterItems && <Filter />} */}

      <h6 className="fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM
      </h6>

      {/* Hiển thị danh sách sản phẩm */}
      {products.map((items) => (
        <div key={items.id} className="p-4 mb-4">
          <h4>{items.name}</h4>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
            {items.data.map((product) => (
              <div className="col" key={product.id}>
                <Link
                  href={`/pages/${items.filter_url}/view/${toSlug(
                    product.name
                  )}?id=${product.id}`}
                  className="border h-100 bg-white d-block text-decoration-none text-dark p-2 zoom-hover"
                >
                  {/* Khuyến mãi */}

                  <div className="mb-2">
                    <span className="p-1 text-bg-danger rounded">
                      {product.sale}
                    </span>
                  </div>
                  {/* Hình ảnh */}
                  <div className="d-flex justify-content-center mb-2">
                    <Image
                      src={`${product.img}`}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="img-fluid"
                    />
                  </div>

                  {/* Thông tin */}
                  <div>
                    <p className="text-truncate">{product.name.toLocaleUpperCase()}</p>
                    <p className="text-danger">&#8363; {product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  ) : (
    <div className="min-vh-100 container-fluid py-5">
      <h6 className="fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM
      </h6>
      <div className="d-flex align-items-center justify-content-center min-vh-100 w-100 ">
        <p>Chưa có sản phẩm nào</p>
      </div>
    </div>
  );
}
