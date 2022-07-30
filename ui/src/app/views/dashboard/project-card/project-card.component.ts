import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.css"],
})
export class ProjectCardComponent implements OnInit {
  // orderStatus = 75;
  currentStatus = "shipped";

  @Input() orderStatus = 0;
  @Input() orderNumber = "";
  constructor() {}

  ngOnInit(): void {}
}
