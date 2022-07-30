import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  orderStatus = 50;
  currentStatus = "shipped";

  constructor() {}

  ngOnInit(): void {}
}
