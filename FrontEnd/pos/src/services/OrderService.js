import Instance from "../helpers/Axios";

export async function SaveOrder(data) {
    try {
      const response = await Instance.post("Orders/Save",data);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
