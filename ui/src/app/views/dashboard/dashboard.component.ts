import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  form_submit_active: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
