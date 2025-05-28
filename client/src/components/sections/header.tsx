"use client";

import HeaderMiddle from "./header/HeaderMiddle";
import HeaderTop from "./header/HeaderTop";

export default function Header() {
  return (
    <div className="bg-success text-white shadow">
      {/* Phần header top */}
      <HeaderTop />
      {/* logo/form/giỏ hàng/responsive button */}
      <HeaderMiddle />
    </div>
  );
}
