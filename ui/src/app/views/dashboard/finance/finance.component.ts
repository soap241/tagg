import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-finance",
  templateUrl: "./finance.component.html",
  styleUrls: ["./finance.component.css"],
})
export class FinanceComponent implements OnInit {
  constructor(private location: Location) {}

  activeTab = 0;

  menuTabs = ["Payments", "invoices", "summary"];

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  onSetActiveTab(tab: number) {
    this.activeTab = tab;
  }
}
