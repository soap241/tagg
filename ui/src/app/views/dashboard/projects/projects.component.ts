import { DataService } from "./../../../services/data/data.service";
import { IProject } from "./../../../models/@types";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];
  activeTab = "uncompleted";

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getProjects()
      .filter((item) => item.status !== 100);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
