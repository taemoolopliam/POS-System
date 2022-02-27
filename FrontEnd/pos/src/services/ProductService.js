import Instance from "../helpers/Axios";

export async function ProductsItem(currentPage, pageSize, search) {
  try {
    const response = await Instance.get(`Products/ProductsItem?currentPage=${currentPage}&pageSize=${pageSize}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
