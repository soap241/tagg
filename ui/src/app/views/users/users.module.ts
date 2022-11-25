import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }