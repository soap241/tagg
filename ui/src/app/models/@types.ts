export interface IProject {
  id: string;
  status: number;
  customerName: string;
  customerId: string;
  task: string;
  clientStartDate: number;
  clientEndDate: number;
  estimatedEndDate: number;
  actualEndDate: number;
  comments: any[];
  paymentStatus: number;
  projectManager: string;
}

export interface IOrder {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  orderStatus: number;
}
