import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-documentation-details",
  templateUrl: "./documentation-details.component.html",
  styleUrls: ["./documentation-details.component.css"],
})
export class DocumentationDetailsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
