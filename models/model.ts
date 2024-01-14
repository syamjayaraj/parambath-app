export interface ApiServiceDataStore {
  token?: string;
  apiDomain: string;
}
export interface IPagination {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}
export interface IimageFormat {
  small: { url: string };
  thumbnail: { url: string };
}
export interface IImage {
  url: string;
  formats: IimageFormat;
  size: number;
  updatedAt: string;
}
export interface ITiming {
  opensAt: Date;
  closesAt: Date;
  day: string;
}
export interface ICategory {
  id: number;
  name: string;
  nameMalayalam: string;
}
export interface ICategoryWithIcon {
  name: string;
  nameMalayalam: string;
  icon: IImage;
}
export interface IBusiness {
  business_category: ICategory;
  name: string;
  nameMalayalam: IImage;
  about: string;
  owner: string;
  ownerNameMalayalam: string;
  phoneNumber: string;
  phoneNumber2: string;
  timing: ITiming[];
  place: string;
  address: string;
  email: string;
  website: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
  onlineBookingUrl: string;
  upi: boolean;
  card: boolean;
  onlineDelivery: boolean;
  images: IImage[];
}
export interface IAutoStand {
  name: string;
  nameMalayalam: string;
}
export interface IAuto {
  auto_stand: IAutoStand;
  name: string;
  phoneNumber: string;
  phoneNumber2: string;
  vehicleNumber: string;
  owner: string;
  ownerName: string;
  ownerNameMalayalam: string;
  images: IImage[];
}
export interface IBusRoute {
  name: string;
  nameMalayalam: string;
}
export interface IBusTiming {
  name: string;
  nameMalayalam: string;
  time: Date;
  phoneNumber: string;
  images: IImage[];
}
export interface IContributor {
  name: string;
  icon: IImage;
  images: IImage[];
  role: string;
  instagram: string;
  facebook: string;
  phoneNumber: string;
  phoneNumber2: string;
  email: string;
  whatsapp: string;
}
export interface IEmergency {
  emergency_category: ICategory;
  name: string;
  nameMalayalam: string;
  ownerName: string;
  ownerNameMalayalam: string;
  about: string;
  phoneNumber: string;
  phoneNumber2: string;
  email: string;
  website: string;
  place: string;
  address: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
  images: IImage[];
}
export interface IScheduleDay {
  time: string;
  title: string;
  Description: string;
}
export interface ISchedule {
  title: string;
  day: string;
  scheduleDay: IScheduleDay[];
}
export interface IEvent {
  event_category: ICategory;
  name: string;
  nameMalayalam: string;
  about: string;
  from: Date;
  to: Date;
  phoneNumber: string;
  phoneNumber2: string;
  email: string;
  website: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
  images: IImage[];
  schedule: ISchedule;
}
export interface IHelp {
  title: string;
  content: string;
}
export interface IMore {
  more_category: ICategoryWithIcon;
  name: string;
  nameMalayalam: string;
  content: string;
  label: string;
  video: string;
  url: string;
}
export interface IOnlineService {
  online_service_category: ICategory;
  name: string;
  nameMalayalam: string;
  about: string;
  email: string;
  phoneNumber: string;
  phoneNumber2: string;
  url: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}
export interface IRepresentative {
  representative_category: ICategory;
  name: string;
  nameMalayalam: string;
  about: string;
  phoneNumber: string;
  phoneNumber2: string;
  place: string;
  address: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  youtube: string;
  images: IImage[];
}

export interface ISmallBusiness {
  small_business_category: ICategory;
  name: string;
  nameMalayalam: IImage;
  about: string;
  owner: string;
  ownerNameMalayalam: string;
  phoneNumber: string;
  phoneNumber2: string;
  timing: ITiming[];
  place: string;
  address: string;
  email: string;
  website: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
  onlineBookingUrl: string;
  upi: boolean;
  card: boolean;
  onlineDelivery: boolean;
  images: IImage[];
}
export interface IVehicle {
  vehicle_category: ICategory;
  name: string;
  nameMalayalam: IImage;
  about: string;
  owner: string;
  ownerNameMalayalam: string;
  phoneNumber: string;
  phoneNumber2: string;
  whatsapp: string;
  images: IImage[];
}
export interface IWorker {
  work: ICategory;
  name: string;
  nameMalayalam: IImage;
  about: string;
  address: string;
  place: string;
  owner: string;
  ownerNameMalayalam: string;
  phoneNumber: string;
  phoneNumber2: string;
  website: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  images: IImage[];
}

export interface ISliderHome {
  image: IImage;
  business: any;
  auto: any;
  emergency: any;
  small_business: any;
  online_service: any;
  worker: any;
}
