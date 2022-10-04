import { IOrder, IProject } from "./../../models/@types";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  orders: IOrder[] = [
    {
      id: "1",
      productName: "Product 1",
      productPrice: 100,
      quantity: 1,
      totalAmount: 100,
    },
    {
      id: "2",
      productName: "Product 2",
      productPrice: 200,
      quantity: 2,
      totalAmount: 400,
    },
    {
      id: "3",
      productName: "Product 2",
      productPrice: 300,
      quantity: 2,
      totalAmount: 600,
    },
  ];

  projects: IProject[] = [
    {
      id: "1",
      status: 15,
      customerName: "Priscilla Owusu",
      task: "3 WAY DB PANEL",
      clientStartDate: Date.now(),
      clientEndDate: Date.now(),
      customerId: "1",
      comments: [],
      paymentStatus: 0,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
    },
    {
      id: "2",
      status: 25,
      customerName: "Priscilla Owusu",
      task: "BUNGE LOADERS",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "2",
      paymentStatus: 50,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "3",
      status: 50,
      customerName: "Priscilla Owusu",
      task: "PHASE CORRECTION(PPA)",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "1",
      paymentStatus: 100,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "4",
      status: 100,
      customerName: "Priscilla Owusu",
      task: "PHASE CORRECTION(ASL)",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "5",
      paymentStatus: 0,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "5",
      status: 25,
      customerName: "Priscilla Owusu",
      task: "2000A ATS Panel",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "6",
      paymentStatus: 50,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "6",
      status: 63,
      customerName: "Priscilla Owusu",
      task: "2000A ATS Panel",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "3",
      paymentStatus: 100,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "7",
      status: 75,
      customerName: "Priscilla Owusu",
      task: "250A Switchgear Panel",
      clientStartDate: Date.now(),

      comments: [],
      customerId: "2",
      paymentStatus: 0,
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "8",
      status: 87,
      customerName: "Priscilla Owusu",
      task: "1250A 10-Way  DB Panel",
      clientStartDate: Date.now(),

      comments: [],
      paymentStatus: 50,
      customerId: "1",
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
    {
      id: "9",
      status: 63,
      customerName: "Priscilla Owusu",
      task: "1600A DB Panel",
      clientStartDate: Date.now(),

      comments: [],
      paymentStatus: 100,
      customerId: "1",
      projectManager: "Kwame Owusu",
      estimatedEndDate: Date.now(),
      actualEndDate: Date.now(),
      clientEndDate: Date.now(),
    },
  ];

  getProjects() {
    return this.projects;
  }

  getProject(id: any) {
    return this.projects.find((project) => project.id === id);
  }

  getOrders() {
    return this.orders;
  }

  getOrder(id: any) {
    return this.orders.find((order) => order.id === id);
  }
}
