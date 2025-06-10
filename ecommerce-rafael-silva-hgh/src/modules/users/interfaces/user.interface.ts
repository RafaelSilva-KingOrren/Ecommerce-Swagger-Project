export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}

export interface UserWithoutPass {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}
