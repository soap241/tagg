import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './customer-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { editcustomerComponent } from './editcustomer/editcustomer.component';


@NgModule({
  declarations: [OverviewComponent, CreatecustomerComponent, editcustomerComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
