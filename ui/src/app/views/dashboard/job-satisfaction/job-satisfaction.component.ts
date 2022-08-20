import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-job-satisfaction",
  templateUrl: "./job-satisfaction.component.html",
  styleUrls: ["./job-satisfaction.component.css"],
})
export class JobSatisfactionComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
