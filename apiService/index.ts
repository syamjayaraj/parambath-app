import { apiUrl2 } from "../config";
import { IBusiness, IPagination } from "../models/model";
import { get } from "../services/http";

interface ILoadItemParam {
  type: string;
  fields: string[];
  populate: string[];
  searchText: string;
  pageNumber: number;
  pageSize: number;
}

export async function loadItem(param: ILoadItemParam): Promise<{
  meta: IPagination;
  data: IBusiness[];
} | null> {
  try {
    const fieldsParams = param.fields
      .map((field: string, index: number) => `fields[${index}]=${field}`)
      .join("&");
    const populateParams = param.populate
      .map((item: string, index: number) => `populate[${index}]=${item}`)
      .join("&");

    const url = `${apiUrl2}${param.type}?${populateParams}&${fieldsParams}&pagination[page]=${param.pageNumber}&pagination[pageSize]=${param?.pageSize}&filters[$or][0][name][$contains]=${param?.searchText}&filters[$or][1][nameMalayalam][$contains]=${param?.searchText}`;
    console.log(url, "url");
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadItemDetails(id: string): Promise<IBusiness | null> {
  try {
    const url = `${apiUrl2}businesses?id=${id}`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}