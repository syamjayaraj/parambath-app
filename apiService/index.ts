import { apiUrl } from "../config";
import { ICategory, IPagination, ISliderHome } from "../models/model";
import { get } from "../services/http";

interface INameValue {
  name: string;
  value: any;
}

interface ILoadItemParam {
  type: string;
  filters?: INameValue[];
  fields: string[];
  populate: string[];
  sort: string[];
  searchText: string;
  pageNumber: number;
  pageSize: number;
  categoryId?: number | undefined;
  categoryType?: string;
}

export async function loadItem(param: ILoadItemParam): Promise<{
  meta: IPagination;
  data: any[];
} | null> {
  try {
    const filtersParams =
      param?.filters &&
      param?.filters
        .map(
          (filter: any, index: number) =>
            `filters[${filter?.name}][$eq]=${filter?.value}`
        )
        .join("&");
    const fieldsParams = param?.fields
      .map((field: string, index: number) => `fields[${index}]=${field}`)
      .join("&");
    const populateParams = param?.populate
      .map((item: string, index: number) => `populate[${index}]=${item}`)
      .join("&");
    const sortParams = param?.sort
      .map((item: string, index: number) => `sort[${index}]=${item}`)
      .join("&");
    let categoryFilter = "";
    if (param?.categoryId) {
      categoryFilter = `&filters[${param?.categoryType}][id][$eq]=${param?.categoryId}`;
    }
    const url = `${apiUrl}${param?.type}?${populateParams}&${fieldsParams}&${filtersParams}&${sortParams}&pagination[page]=${param?.pageNumber}&pagination[pageSize]=${param?.pageSize}&filters[$or][0][name][$contains]=${param?.searchText}&filters[$or][1][nameMalayalam][$contains]=${param?.searchText}${categoryFilter}`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

interface ILoadItemCategoryParam {
  typeCategoryUrl: string;
  pageSize: number;
  params: any;
}

export async function loadItemCategory(param: ILoadItemCategoryParam): Promise<{
  meta: IPagination;
  data: ICategory[];
} | null> {
  try {
    let filtersParams = [];
    if (param?.params?.filters?.length !== 0) {
      filtersParams = param?.params?.filters
        .map(
          (filter: any, index: number) =>
            `filters[${filter?.name}][$eq]=${filter?.value}`
        )
        .join("&");
    }
    const url = `${apiUrl}${param?.typeCategoryUrl}?${filtersParams}`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadSliderHome(): Promise<{
  meta: IPagination;
  data: ISliderHome[];
} | null> {
  try {
    const url = `${apiUrl}slider-homes?populate=*`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

interface ILoadItemDetailsParam {
  type: string;
  id: string;
}

export async function loadItemDetails(param: ILoadItemDetailsParam): Promise<{
  meta: IPagination;
  data: any;
} | null> {
  try {
    const url = `${apiUrl}${param?.type}/${param?.id}?populate=*`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadEvent(param: ILoadItemParam): Promise<{
  meta: IPagination;
  data: any[];
} | null> {
  try {
    const fieldsParams = param?.fields
      .map((field: string, index: number) => `fields[${index}]=${field}`)
      .join("&");
    const populateParams = param?.populate
      .map((item: string, index: number) => `populate[${index}]=${item}`)
      .join("&");
    const sortParams = param?.sort
      .map((item: string, index: number) => `sort[${index}]=${item}`)
      .join("&");

    const url = `${apiUrl}events?${populateParams}&${fieldsParams}&${sortParams}&pagination[page]=${param?.pageNumber}&pagination[pageSize]=${param?.pageSize}&filters[$or][0][name][$contains]=${param?.searchText}&filters[$or][1][nameMalayalam][$contains]=${param?.searchText}`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadEventDetails(param: ILoadItemDetailsParam): Promise<{
  meta: IPagination;
  data: any;
} | null> {
  try {
    const url = `${apiUrl}events/${param?.id}?populate[images]=*&populate[schedule][populate][0]=scheduleDay`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadEventCategory(): Promise<{
  meta: IPagination;
  data: ICategory[];
} | null> {
  try {
    const url = `${apiUrl}event-categories`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadSliderEvent(): Promise<{
  meta: IPagination;
  data: ISliderHome[];
} | null> {
  try {
    const url = `${apiUrl}slider-events?populate=*`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function loadSliderDelivery(): Promise<{
  meta: IPagination;
  data: ISliderHome[];
} | null> {
  try {
    const url = `${apiUrl}slider-deliveries?populate=*`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function fetchNotification(): Promise<{
  meta: IPagination;
  data: any;
} | null> {
  try {
    const url = `${apiUrl}notifications?populate=*&sort[0]=date:desc`;
    const response = await get(url);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}

export async function fetchContent(type: string): Promise<{
  meta: IPagination;
  data: any;
} | null> {
  try {
    const response = await get(`${apiUrl}${type}?populate=*`);
    return response?.data as any;
  } catch (err) {
    return null;
  }
}
