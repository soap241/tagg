import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order-tracker",
  templateUrl: "./order-tracker.component.html",
  styleUrls: ["./order-tracker.component.css"],
})
export class OrderTrackerComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
