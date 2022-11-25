import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-customer-complaints",
  templateUrl: "./customer-complaints.component.html",
  styleUrls: ["./customer-complaints.component.css"],
})
export class CustomerComplaintsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
