import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FormatNumberComma } from "../../helpers/FormatNumber";
import Swal from "sweetalert2";
import { SaveOrder } from "../../services/OrderService";

export default function ManageSale({ productSelect, manangeProList, clearAll, remove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pricePay, setIsPricePayn] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

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
                disabled={pricePay < total ? TreeWalker : isSubmit}
                onClick={async () => {
                  setIsSubmit(true);
                  // console.log(
                  //   JSON.stringify({
                  //     total: total,
                  //     cash: pricePay,
                  //     returnTheChange: pricePay - total,
                  //     orderDetails: productSelect,
                  //   })
                  // );
                  setLoading(true);
                  await SaveOrder({
                    total: total,
                    cash: pricePay,
                    returnTheChange: pricePay - total,
                    orderDetails: productSelect,
                  });
                  setLoading(false);
                  setIsOpen(false);
                  Swal.fire({
                    title: "เงินทอน " + FormatNumberComma(pricePay - total),
                    text: " ",
                    showConfirmButton: true,
                    confirmButtonText: "ปิด",
                    icon: "success",
                  });
                  clearAll();
                  setTouch(false);
                  setIsSubmit(false);
                  setIsPricePayn(0);
                }}
              >
                {loading ? (
                  <>
                    <svg
                      role="status"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>{" "}
                    กำลังบันทึกข้อมูล...
                  </>
                ) : (
                  "ยืนยัน"
                )}
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
