export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country: string;
  city: string;
  isAdmin: boolean;
}

export interface UserWithoutPass {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: number;
  country: string;
  city: string;
  isAdmin: boolean;
}
