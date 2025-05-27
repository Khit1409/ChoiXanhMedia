"use client";

import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppRender({ children }: Props) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  if (render == true) return <div>{children}</div>;
}
