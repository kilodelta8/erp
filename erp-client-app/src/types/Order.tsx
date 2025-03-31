import { OrderItem } from './OrderItem';

export interface Order {
    id: number;
    orderNumber: string;
    customerId: number;
    orderDate: string;
    items: OrderItem[];
    totalAmount: number;
  }