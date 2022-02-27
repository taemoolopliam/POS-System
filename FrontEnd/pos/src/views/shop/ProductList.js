import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { ProductsItem } from "../../services/ProductService";

export default function ProductList({ retrunProduct }) {
  const [pagin, setPagin] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPage: 1,
    totalRow: 0,
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData(1, 10, " ");
  }, []);

  async function loadData(currentPage, pageSize, search) {
    setIsLoading(true);
    const result = await ProductsItem(currentPage, pageSize, search);
    console.log("result", result);
    setData(result.data);
    setPagin(result.pagin);
    setSearch(search);
    setIsLoading(false);
  }

  return (
    <div className="card">
      <div className="flex justify-end mb-5">
        <div className="w-2/4 ">
          <input
            type="text"
            name="search"
            id="search"
            className=" form-control"
            placeholder="ค้นหา ชื่อสินค้า รหัสสินค้า"
            onChange={(e) => {
              if (e.target.value) {
                loadData(1, 10, e.target.value);
              } else {
                loadData(1, 10, "");
              }
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {isLoading
          ? "loading"
          : data.length === 0
          ? "ไม่พบข้อมูล"
          : data.map((value) => (
              <div
                className="col-span-3 cursor-pointer "
                key={value.productID}
                onClick={() => {
                  retrunProduct(value);
                }}
              >
                <div className="grid grid-cols-1 px-2 py-3 border rounded-md bg-pastel-blue-50 hover:bg-blue-200">
                  <div className="flex justify-center">
                    <div className="flex justify-center w-12 h-12 leading-9 align-middle rounded-full bg-pastel-blue-500 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-11"
                        fill="none"
                        stroke="#ffff"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="font-extrabold text-center text-pastel-blue-500">{value.productID}</p>
                  <p className="font-medium text-pastel-blue-500">{value.productName}</p>
                  <p className="font-medium text-orange-600">{value.price}</p>
                </div>
              </div>
            ))}
      </div>
      <Pagination
        totalPage={pagin.totalPage}
        onChange={async (page) => {
          loadData(page, 10, search);
        }}
        currentPages={pagin.currentPage}
        totalRow={pagin.totalRow}
      />
    </div>
  );
}
