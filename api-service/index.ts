import axios from "axios";
import { apiUrl, apiUrl2 } from "../config";

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

const fetchItemDetails = async (type: string, itemId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${type}/${itemId}`);
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (err: any) {}
};

const fetchEvents = async (type: string) => {
  try {
    const response = await axios.get(`${apiUrl2}/${type}/list?`);
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (err: any) {}
};

const fetchContent = async (type: string) => {
  try {
    const response = await axios.get(`${apiUrl2}${type}?populate=*`);
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (err: any) {}
};

export { fetchItems, fetchItemDetails, fetchContent };
