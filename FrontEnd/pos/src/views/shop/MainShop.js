import React, { useState } from "react";
import ManageSale from "./ManageSale";
import ProductList from "./ProductList";

export default function MainShop() {
  const [productSelect, setProductSelect] = useState([]);
  async function manangeProList(productID, productName, price, amount, chkCase = 0) {
    console.log(productID, productName, price, amount);
    let chkProductIndex = productSelect.findIndex((a) => a.productID === productID);
    let tmp = [...productSelect];
    if (chkProductIndex === -1) {
      tmp.push({ productID, productName, price, amount, total: price });
    } else {
      chkCase === 0 ? (tmp[chkProductIndex].amount += amount) : (tmp[chkProductIndex].amount = amount);
      tmp[chkProductIndex].total = tmp[chkProductIndex].price * tmp[chkProductIndex].amount;
    }
    setProductSelect(tmp);
  }

  function clearAll() {
    setProductSelect([]);
  }
  function remove(index){
    let tmp = [...productSelect];
    tmp.splice(index, 1);
    setProductSelect(tmp);

  }

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4">
        <ProductList
          retrunProduct={(v) => {
            manangeProList(v.productID, v.productName, v.price, 1, 0);
          }}
        />
      </div>
      <div className="col-span-2">
        <ManageSale
          productSelect={productSelect}
          manangeProList={(v) => {
            manangeProList(v.productID, v.productName, v.price, v.amount, 1);
          }}
          clearAll={clearAll}
          remove={remove}
        />
      </div>
    </div>
  );
}
