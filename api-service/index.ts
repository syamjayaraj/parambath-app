import axios from "axios";
import { apiUrl } from "../config";

const fetchItems = async (type: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${type}/list?`);
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (err: any) {}
};

export { fetchItems };
