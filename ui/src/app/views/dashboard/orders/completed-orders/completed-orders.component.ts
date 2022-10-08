import { Component, OnInit } from "@angular/core";
import { IOrder, IProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";

@Component({
  selector: "app-completed-orders",
  templateUrl: "./completed-orders.component.html",
  styleUrls: ["./completed-orders.component.css"],
})
export class CompletedOrdersComponent implements OnInit {
  projects: IOrder[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getOrders()
      .filter((item) => item.orderStatus === 100);
  }
}
