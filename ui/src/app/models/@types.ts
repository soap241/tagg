export interface IProject {
  id: string;
  status: number;
  agent: string;
  task: string;
  dateStarted: number;
  actualCompletionDate: number;
  comments: any[];
  paymentStatus: number;
}

export interface IOrder {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
}
