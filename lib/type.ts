/* eslint-disable @typescript-eslint/no-explicit-any */
export type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  [key: string]: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  city: string;
  area: string;
  fullAddress: string;
  amenities: string[];
  utilities: string[];
  images: string[];
  video: string | null;
  bedrooms: number;
  bathrooms: number;
  veranda: number;
  size: number;
  sizeUnit: string;
  price_per_month: number;
  securityDeposit: number;
  parking: boolean;
  isAvailable: boolean;
  facing: string;
  status: string;
  preferredTenant: string;
  categoryId: string;
  category: Category;
  landlordId: string;
  user: {
    name: string;
    email: string;
  };
  review: Review[];
  views: number;
  createdAt: string;
  updatedAt: string;
}
export interface PropertyLandLordProps {
  id?: string;
  user?: {
    name?: string;
    email?: string;
  };
  [key: string]: any;
}
