import { Component, OnInit } from "@angular/core";
import { IProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";

@Component({
  selector: "app-uncompleted-projects",
  templateUrl: "./uncompleted-projects.component.html",
})
export class UncompletedProjects implements OnInit {
  projects: IProject[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getProjects()
      .filter((item) => item.status !== 100);
  }
}
