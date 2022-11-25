import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { IProject } from "../../../models/@types";
import { DataService } from "../../../services/data/data.service";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.css"],
})
export class DocumentationComponent implements OnInit {
  constructor(private location: Location, private dataService: DataService) {}
  projects: IProject[] = [];

  ngOnInit(): void {
    this.projects = this.dataService
      .getProjects()
      .filter((item) => item.status !== 100);
  }

  goBack(): void {
    this.location.back();
  }
}
