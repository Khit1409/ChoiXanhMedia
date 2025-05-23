"use client";

import { capitalizeWords } from "@/redux/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathNameComponent() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const domainUrl = "Trang chủ";

  // Hàm viết hoa chữ cái đầu


  const paths = pathParts.map((_, idx) => {
    return "/" + pathParts.slice(0, idx + 1).join("/");
  });

  return (
    <nav aria-label="breadcrumb" className="container mt-3">
      <ol className="breadcrumb bg-light p-2 rounded shadow-sm mb-0">
        <li className="breadcrumb-item">
          <Link href="/" className="text-decoration-none text-primary">
            {domainUrl}
          </Link>
        </li>
        {paths.map((fullPath, idx) => (
          <li
            className={`breadcrumb-item ${
              idx === paths.length - 1 ? "active" : ""
            }`}
            key={idx}
            aria-current={idx === paths.length - 1 ? "page" : undefined}
          >
            {idx === paths.length - 1 ? (
              capitalizeWords(pathParts[idx].replace(/-/g, " "))
            ) : (
              <Link
                href={fullPath}
                className="text-decoration-none text-primary"
              >
                {capitalizeWords(pathParts[idx].replace(/-/g, " "))}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
