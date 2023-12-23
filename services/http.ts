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
