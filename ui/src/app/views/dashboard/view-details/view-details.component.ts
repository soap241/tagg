import { IProject } from "./../../../models/@types";
import { DataService } from "./../../../services/data/data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-view-details",
  templateUrl: "./view-details.component.html",
  styleUrls: ["./view-details.component.css"],
})
export class ViewDetailsComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  project: IProject;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project = this.dataService.getProject(params.id);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
