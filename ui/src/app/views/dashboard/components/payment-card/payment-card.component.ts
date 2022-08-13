import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";

@Component({
  selector: "app-payment-card",
  templateUrl: "./payment-card.component.html",
  styleUrls: ["./payment-card.component.css"],
})
export class PaymentCardComponent implements OnInit {
  @Input() project: IProject = {} as IProject;
  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }
}
