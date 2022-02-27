import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FormatNumberComma } from "../../helpers/FormatNumber";
import Swal from "sweetalert2";
import { SaveOrder } from "../../services/OrderService";

export default function ManageSale({ productSelect, manangeProList, clearAll, remove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pricePay, setIsPricePayn] = useState(0);

  const [touch, setTouch] = useState(false);
  const total = productSelect.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.total;
  }, 0);

  return (
    <div className="card">
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative w-1/4 max-w-sm p-2 mx-auto bg-white rounded">
            <Dialog.Title>ชำระเงิน</Dialog.Title>

            <div className="py-3">
              <label htmlFor="enterPrice" className="label">
                เงินสด
              </label>
              <input
                type="number"
                min={1}
                name="enterPrice"
                id="enterPrice"
                onBlur={() => {
                  setTouch(true);
                }}
                className=" form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setIsPricePayn(parseFloat(e.target.value));
                  } else {
                    setIsPricePayn(0);
                  }
                }}
              />
              <div className="text-dagder"> {touch ? (pricePay < total ? "กรุณาตรวจสอบจำนวนเงินอีกครั้ง" : "") : ""}</div>
            </div>
            <div className="flex gap-3 ">
              <button
                className="w-full border btn border-slate-500 hover:bg-slate-400"
                disabled={productSelect.length === 0}
                onClick={() => setIsOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="w-full text-white bg-pastel-blue-500 btn hover:bg-blue-700"
                disabled={pricePay < total}
                onClick={async () => {
                  setIsOpen(false);
                  // console.log(
                  //   JSON.stringify({
                  //     total: total,
                  //     cash: pricePay,
                  //     returnTheChange: pricePay - total,
                  //     orderDetails: productSelect,
                  //   })
                  // );
                  await SaveOrder({
                    total: total,
                    cash: pricePay,
                    returnTheChange: pricePay - total,
                    orderDetails: productSelect,
                  });
                  Swal.fire({
                    title: "เงินทอน " + FormatNumberComma(pricePay - total),
                    text: " ",
                    showConfirmButton: true,
                    confirmButtonText: "ปิด",
                    icon: "success",
                  });
                  clearAll();
                  setTouch(false);
                  setIsPricePayn(0);
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="flex justify-between p-2 font-bold leading-9 text-white align-middle rounded-sm bg-pastel-blue-500">
        <h6>รวมเงิน</h6>
        <h1 className="text-3xl "> {FormatNumberComma(total)}</h1>
      </div>
      <div className="flex justify-between gap-3 mt-3">
        <button
          className="w-full border btn border-slate-500 hover:bg-slate-400"
          disabled={productSelect.length === 0}
          onClick={() => {
            clearAll();
          }}
        >
          ยกเลิก
        </button>
        <button
          className="w-full text-white bg-pastel-blue-500 btn hover:bg-blue-700"
          disabled={productSelect.length === 0}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          ชำระเงิน
        </button>
      </div>
      <p className="mt-3 ">
        จำนวนสินค้า{" "}
        {productSelect
          .reduce((previousValue, currentValue) => {
            return previousValue + currentValue.amount;
          }, 0)
          .toLocaleString()}{" "}
        รายการ
      </p>

      <div className="grid grid-cols-1 gap-1">
        {productSelect.length === 0 ? (
          <></>
        ) : (
          productSelect.map((value, index) => (
            <div className="px-2 py-1 rounded-md bg-pastel-blue-50" key={value.productID}>
              <div className="flex justify-between ">
                <div className="text-lg font-bold text-pastel-blue-500">
                  {index + 1}. {value.productName}
                </div>
                <div className="flex justify-center">
                  <div
                    className="flex justify-center w-5 h-5 leading-9 align-middle bg-red-300 rounded-full cursor-pointer"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-30"
                      fill="none"
                      stroke="#dd2525"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <p>
                  ราคาต่อหน่วย {FormatNumberComma(value.price)} ราคารวม {FormatNumberComma(value.total)}
                </p>
                <div className="w-20 ">
                  <input
                    type="number"
                    className=" form-control"
                    value={value.amount}
                    onChange={(e) => {
                      if (e.target.value) {
                        manangeProList({
                          productID: value.productID,
                          productName: value.productName,
                          price: value.price,
                          amount: parseInt(e.target.value),
                        });
                      } else {
                        manangeProList({
                          productID: value.productID,
                          productName: value.productName,
                          price: value.price,
                          amount: 1,
                        });
                      }
                    }}
                    min={1}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
