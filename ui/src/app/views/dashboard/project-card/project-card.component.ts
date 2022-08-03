import { IProject } from "./../../../models/@types";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.css"],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: IProject = {} as IProject;
  constructor() {}

  ngOnInit(): void {}
}
