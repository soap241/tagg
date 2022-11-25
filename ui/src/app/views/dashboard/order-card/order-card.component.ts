import { IOrder } from "./../../../models/@types";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IProject } from "../../../models/@types";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.css"],
})
export class OrderCardComponent implements OnInit {
  @Input() order: IOrder = {} as IOrder;
  id: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }
}
