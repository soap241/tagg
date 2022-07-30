import { MessagesComponent } from "./messages/messages.component";
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
      },
      {
        path: "orders",
        component: OrdersComponent,
        data: {
          title: "Orders",
        },
      },
      {
        path: "messages",
        component: MessagesComponent,
        data: {
          title: "Messages",
        },
      },
      {
        path: "payments",
        component: PaymentsComponent,
        data: {
          title: "Payments",
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
