export type Role = 'TENANT' | 'LANDLORD' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'BLOCKED';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  phoneNumber?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  amenities: string[];
  images: string[];
  landlordId: string;
  categoryId: string;
  category?: Category;
  landlord?: Partial<User>;
}

export interface RentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RequestStatus;
  moveInDate: string;
  duration: number;
  totalAmount: number;
  property: Property;
  tenant?: User;
}

export interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  rentalRequest: RentalRequest;
}