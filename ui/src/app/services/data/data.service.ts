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
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 0,
    },
    {
      id: "2",
      status: 25,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 50,
    },
    {
      id: "3",
      status: 50,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 100,
    },
    {
      id: "4",
      status: 39,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 0,
    },
    {
      id: "5",
      status: 25,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 50,
    },
    {
      id: "6",
      status: 63,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 100,
    },
    {
      id: "7",
      status: 75,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 0,
    },
    {
      id: "8",
      status: 87,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 50,
    },
    {
      id: "9",
      status: 63,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
      paymentStatus: 100,
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
