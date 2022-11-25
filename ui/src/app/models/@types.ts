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

export interface NetsuiteProject {
  id: number;
  number: number;
  name: string;
  customer: string;
  manager?: string;
  manager_id?: number;
  consultant?: string;
  consultant_id?: number;
  start_date: string;
  end_date?: string;
  revised_end_date?: string;
  actual_end_date?: string;
  status?: string;
  progress_percentage: string;
}
