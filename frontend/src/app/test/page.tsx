"use client";

import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ScrollSpy } from "bootstrap";

export default function Test() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && scrollRef.current) {
      new ScrollSpy(scrollRef.current!, {
        target: "#navbar-example2",
        rootMargin: "0px 0px -40%",
        smoothScroll: true,
      });
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="scrollspy-example bg-body-tertiary p-3 rounded-2"
      tabIndex={0}
      style={{ height: "400px", overflowY: "scroll", position: "relative" }}
    >
      <h4 id="scrollspyHeading1">First heading</h4>
      <p>...</p>
      <h4 id="scrollspyHeading2">Second heading</h4>
      <p>...</p>
      <h4 id="scrollspyHeading3">Third heading</h4>
      <p>...</p>
      <h4 id="scrollspyHeading4">Fourth heading</h4>
      <p>...</p>
      <h4 id="scrollspyHeading5">Fifth heading</h4>
      <p>...</p>
    </div>
  );
}
