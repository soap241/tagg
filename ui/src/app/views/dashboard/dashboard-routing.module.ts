import { CustomerComplaintsComponent } from "./customer-complaints/customer-complaints.component";
import { DocumentationDetailsComponent } from "./documentation-details/documentation-details.component";
import { OrderTrackerComponent } from "./order-tracker/order-tracker.component";
import { DocumentationComponent } from "./documentation/documentation.component";
import { FinanceComponent } from "./finance/finance.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";
import { JobSatisfactionComponent } from "./job-satisfaction/job-satisfaction.component";

import { ProjectsComponent } from "./projects/projects.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { OrdersComponent } from "./orders/orders.component";
import { PaymentsComponent } from "./payments/payments.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: {
      title: "Dashboard",
    },
    children: [
      {
        path: "",
        component: HomeComponent,
        data: {
          title: "Home",
        },
        pathMatch: "full",
      },
      {
        path: "projects",
        component: ProjectsComponent,
        data: {
          title: "Projects",
        },
        // children: [{ path: ":id", component: ViewDetailsComponent }],
      },
      {
        path: "projects/:id",
        component: ViewDetailsComponent,
        data: {
          title: "Project Details",
        },
      },
      {
        path: "orders",
        component: OrdersComponent,
        data: {
          title: "Orders",
        },
      },
      {
        path: "projects/job-satisfaction/:id",
        component: JobSatisfactionComponent,
        data: {
          title: "Job Satisfaction",
        },
      },
      {
        path: "documents",
        component: JobSatisfactionComponent,
        data: {
          title: "Documents",
        },
      },
      {
        path: "payments",
        component: PaymentsComponent,
        data: {
          title: "Payments",
        },
      },
      {
        path: "finance/:id",
        component: FinanceComponent,
        data: {
          title: "Finance",
        },
      },
      {
        path: "documentation",
        component: DocumentationComponent,
        data: {
          title: "Documentation",
        },
      },
      {
        path: "documentation/:id",
        component: DocumentationDetailsComponent,
      },
      {
        path: "order-tracker/:id",
        component: OrderTrackerComponent,
        data: {
          title: "Order Tracker",
        },
      },
      {
        path: "customer-complaints",
        component: CustomerComplaintsComponent,
        data: {
          title: "Order Tracker",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
