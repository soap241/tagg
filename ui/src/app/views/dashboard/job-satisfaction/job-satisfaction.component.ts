import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../services/data/data.service";
import { IProject } from "../../../models/@types";

@Component({
  selector: "app-job-satisfaction",
  templateUrl: "./job-satisfaction.component.html",
  styleUrls: ["./job-satisfaction.component.css"],
})
export class JobSatisfactionComponent implements OnInit {
  projectId: any;
  project: IProject;

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.projectId = param["id"];
      this.project = this.dataService.getProject(param["id"]);
      console.log("project: ", this.project);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
