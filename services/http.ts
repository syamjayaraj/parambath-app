import { ApiServiceDataStore } from "../models/model";
import axios from "axios";

export function getAuthHeader(token?: string) {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function get<T>(url: string, store?: ApiServiceDataStore) {
  const options = {
    headers: {
      ...getAuthHeader(store?.token),
    },
  };
  return axios.get<T>(url, options);
}

export async function post<T>(url: string, data: any): Promise<T> {
  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error: any) {
    console.error("Error during POST request:", error.message);
    throw error;
  }
}
