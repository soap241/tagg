import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-documentation-card",
  templateUrl: "./documentation-card.component.html",
  styleUrls: ["./documentation-card.component.css"],
})
export class DocumentationCardComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
