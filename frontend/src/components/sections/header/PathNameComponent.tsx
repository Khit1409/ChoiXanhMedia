"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathNameComponent() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const domainurl = "Trang chủ";

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Tạo mảng các đường dẫn đầy đủ
  const paths = pathParts.map((_, idx) => {
    return "/" + pathParts.slice(0, idx + 1).join("/");
  });

  return (
    <div className="container bg-silver my-2">
      <div className="d-flex gap-2">
        <Link href="/" className="text-decoration-none">
          {domainurl}
        </Link>
        {paths.map((fullPath, idx) => (
          <Link href={fullPath} className="text-decoration-none" key={idx}>
            | {capitalizeWords(pathParts[idx].split("-").join(" "))}
          </Link>
        ))}
      </div>
    </div>
  );
}
