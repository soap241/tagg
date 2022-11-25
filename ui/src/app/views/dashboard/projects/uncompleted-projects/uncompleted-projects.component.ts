import { Component, OnInit } from "@angular/core";
import { IProject, NetsuiteProject } from "../../../../models/@types";
import { DataService } from "../../../../services/data/data.service";
import { _cudService } from '../../../../services/http/_cud.http-service'
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-uncompleted-projects",
  templateUrl: "./uncompleted-projects.component.html",
})
export class UncompletedProjects implements OnInit {
  projects: IProject[] = [];
   ns_projects: NetsuiteProject[] = [];

  constructor(private dataService: DataService, private netsuiteService: _cudService, private cookieServ: CookieService) {}

  ngOnInit(): void {
    this.projects = this.dataService
      .getProjects()
      .filter((item) => item.status !== 100);
     // this.loadProjects()
  }

  loadProjects() {
   this.netsuiteService.handle('netsuite','customerprojects', {'customer_id': 8112 }).subscribe((res) =>{
     this.ns_projects = res.data.projects.data
    console.log(res.data.projects.data)
   })
  }
}
