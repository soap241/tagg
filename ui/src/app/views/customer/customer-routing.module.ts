import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from '../customer/overview/overview.component';
import { CreatecustomerComponent } from '../customer/createcustomer/createcustomer.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    data: {
      title: 'Overview'
    }
  },
  {
    path: 'create-customer',
    component: CreatecustomerComponent,
    data: {
      title: 'Create Customer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule {}