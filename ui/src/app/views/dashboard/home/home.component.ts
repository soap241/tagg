import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  dasboardMenuItems = [
    {
      title: "Your Orders",
      link: "/dashboard/orders",
      imageUrl: "../../../assets/img/cargo.png",
      buttonText: "View Orders",
    },
    {
      title: "Your Payments",
      link: "/dashboard/payments",
      imageUrl: "../../../assets/img/cash-payment.png",
      buttonText: "View Payments",
    },
    {
      title: "Your Projects",
      link: "/dashboard/projects",
      imageUrl: "../../../assets/img/settings.png",
      buttonText: "View Projects",
    },
    {
      title: "Job Satisfaction",
      link: "/dashboard/job-satisfaction",
      imageUrl: "../../../assets/img/job.png",
      buttonText: "Fill Form",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
