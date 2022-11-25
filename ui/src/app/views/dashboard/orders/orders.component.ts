import { Component, OnInit } from '@angular/core';
import { DataService } from "./../../../services/data/data.service";
import { IProject } from "./../../../models/@types";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

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

