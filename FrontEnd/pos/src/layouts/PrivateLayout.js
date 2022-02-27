import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PrivateLayout({ children }) {
  useEffect(() => {
    let element = document.querySelector("body");
    element.classList.add("bg-pastel-blue-50");
    return () => {
      element.classList.remove("bg-pastel-blue-50");
    };
  }, []);

  return (
    <>
      <Header />
      <div className="px-4 md:px-3 lg:px-8 my-7 ">
        <div className="w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}
