import { ProjectsComponent } from "./projects/projects.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";
import { PaymentsComponent } from "./payments/payments.component";
import { ProjectCardComponent } from "./project-card/project-card.component";
import { JobSatisfactionComponent } from "./job-satisfaction/job-satisfaction.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    HomeComponent,
    JobSatisfactionComponent,
    OrdersComponent,
    PaymentsComponent,
    ProjectCardComponent,
    JobSatisfactionComponent,
  ],
})
export class DashboardModule {}
