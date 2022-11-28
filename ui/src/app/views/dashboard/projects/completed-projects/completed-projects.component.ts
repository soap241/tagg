import { Component, OnInit } from "@angular/core";
import { IProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";

@Component({
  selector: "app-completed-projects",
  templateUrl: "./completed-projects.component.html",
})
export class CompletedProjects implements OnInit {
  projects: IProject[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getProjects()
      .filter((item) => item.status === 100);
  }
}
