import React from "react";

export default function Header() {
  return (
    <nav className="nav-bar ">
      <div className="leading-9 align-middle">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <h1 className="text-xl font-bold text-pastel-blue-500 md:text-3xl ">ทักษะการเขียนโปรเเกรม</h1>
          </div>
          <div
            className="active-mode-mobile "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
