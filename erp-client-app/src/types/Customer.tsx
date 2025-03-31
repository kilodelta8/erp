export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string; // Optional address
  }