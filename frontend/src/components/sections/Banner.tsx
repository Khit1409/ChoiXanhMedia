"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";

const dataArray = [
  //   { id: 1, name: "/banner1.pnng" },
  { id: 1, name: "/banner2.avif" },
  { id: 2, name: "/banner3.jpg" },
  { id: 3, name: "/banner4.jpg" },
  { id: 4, name: "/banner5.jpg" },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  // Thay đổi index mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dataArray.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentData = dataArray[index];

  return (
    <div className="py-2 container">
      <div
      className="h-100"
        style={{
          backgroundImage: `url(${currentData.name})`,
          minBlockSize: "450px",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize:"cover"
        }}
      />
    </div>
  );
}
