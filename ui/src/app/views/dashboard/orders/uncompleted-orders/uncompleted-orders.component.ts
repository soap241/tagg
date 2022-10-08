import { IOrder } from "./../../../../models/@types";
import { Component, OnInit } from "@angular/core";
import { IProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";

@Component({
  selector: "app-uncompleted-orders",
  templateUrl: "./uncompleted-orders.component.html",
  styleUrls: ["./uncompleted-orders.component.css"],
})
export class UncompletedOrdersComponent implements OnInit {
  projects: IOrder[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getOrders()
      .filter((item) => item.orderStatus !== 100);
  }
}
