import {
  getPageCategories,
  openResponsiveMenu,
} from "@/redux/slices/custom.page.slice";
import { AppDispatch, RootState } from "@/redux/store";
// import { toSlug } from "@/redux/utils";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [quanti, setQuanti] = useState<number>(0);
  const [quanti2, setQuanti2] = useState<number>(0);
  const { responsiveMenu, category } = useSelector(
    (state: RootState) => state.menus
  );
  const { loggedIn } = useSelector((state: RootState) => state.auths);

  const dispatch = useDispatch<AppDispatch>();
  //lấy số lượng giỏ hàng và wl khi mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const savedwl = JSON.parse(sessionStorage.getItem("wishList") || "[]");
    setQuanti2(savedwl.length);
    setQuanti(savedCart.length);
  }, [quanti, quanti2]);

  //gọi menu sản phẩm
  useEffect(() => {
    const fetchNavbar = async () => {
      await dispatch(getPageCategories());
    };
    fetchNavbar();
  }, [dispatch]);

  //product in root state
  return (
    <div>
      {/* desktop menu */}
      {/* Tạo thanh trượt navbar desktop */}
      <nav
        className="d-md-flex bg-success px-4 pt-1 d-flex d-none align-items-center justify-content-center"
        style={{
          animation: "slideDown 0.3s ease forwards",
        }}
      >
        <ul className="list-unstyled d-flex gap-5 text-white mb-0 ">
          <li>
            <Link
              className="text-white text-decoration-none cursor-pointer d-inline-block"
              href={"/"}
            >
              Trang chủ
            </Link>
          </li>
          {category?.map((nav) => (
            <li className="openProductMenu list-unstyled" key={nav.id}>
              <Link
                href={`/pages/${nav.url}?id=${nav.id}&type=parent`}
                className="text-white text-decoration-none cursor-pointer d-inline-block"
                role="button"
              >
                {nav.name}
              </Link>
              {/* menu dropdown sản phẩm */}
              {nav.child.length ? (
                <ul className="dropdown-menu productMenu px-2 w-auto bg-success shadow-lg flex-column">
                  {nav.child.map((n) => (
                    <li key={n.id} className="list-unstyled p-1 w-100">
                      <Link
                        href={`/pages/${nav.url}/${n.url}?contentId=${n.id}&id=${n.id}&type=child`}
                        className="text-decoration-none d-block text-white"
                      >
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      {/* mobile menu */}
      {responsiveMenu && (
        <nav
          className="bg-success d-md-none d-flex align-items-center justify-center px-4 py-1"
          style={{
            animation: "slideDown 0.3s ease forwards",
          }}
        >
          <ul className="list-unstyled d-flex flex-column gap-4">
            <li>
              <Link className="text-white text-decoration-none" href="/">
                Home
              </Link>
            </li>
            {category?.map((nav) => (
              <li key={nav.id} className="openProductMenu">
                <Link
                  className="text-white text-decoration-none"
                  href={`/pages/${nav.url}?id=${nav.id}&type=parent`}
                >
                  {nav.name}
                </Link>
                {nav.child.length ? (
                  <ul className="dropdown-menu productMenu px-2 w-auto bg-success flex-column gap-3 shadow-lg">
                    {nav.child.map((n) => (
                      <li key={n.id}>
                        <Link
                          onClick={() => dispatch(openResponsiveMenu(false))}
                          className="text-decoration-none text-white "
                          href={`/pages/${nav.url}/${n.url}?contentId=${n.id}&id=${n.id}&type=child`}
                        >
                          {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            {loggedIn ? (
              <li className="d-flex gap-3">
                <Link href={"/gio-hang"}>
                  <button className="btn btn-outline-primary position-relative">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {/* Badge số lượng giỏ hàng (nếu có) */}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {quanti}
                      {/* số lượng giỏ hàng */}
                    </span>
                  </button>
                </Link>
                <Link href={"/wishlist"}>
                  <button className="btn btn-outline-primary position-relative">
                    <FontAwesomeIcon icon={faHeart} />
                    {/* Badge số lượng giỏ hàng (nếu có) */}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {/* số lượng wl*/}
                      {quanti2}
                    </span>
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href={"/login"}
                  onClick={() => dispatch(openResponsiveMenu(false))}
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
