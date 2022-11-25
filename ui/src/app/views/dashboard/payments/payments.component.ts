import { Component, OnInit } from "@angular/core";
import { IProject } from "../../../models/@types";
import { DataService } from "../../../services/data/data.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"],
})
export class PaymentsComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService.getProjects();
  }
}
