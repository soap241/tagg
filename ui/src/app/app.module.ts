import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppHeaderModule, AppFooterModule, AppSidebarModule } from '@coreui/angular';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { WrapperComponent } from './views/wrapper.component';

import { Interceptor } from './services/http/_interceptor.http-service';
import { AuthService } from './services/utility/auth.utility-service';
import { ToasterService } from './services/utility/toaster.utility-service';
import { UtilityService } from './services/utility/utility.utility-service';
import { ViewService } from './services/http/view.http-service';
import { LoginGuardService } from './services/router-guard/login.guard-service';
import { HomeGuardService } from './services/router-guard/home.guard-service';

import { AppRoutingModule } from './app.routing';

const APP_CONTAINERS = [
  WrapperComponent
];


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
  ],
  providers: [
    AuthService,
    ToasterService,
    UtilityService,
    ViewService,
    HomeGuardService,
    LoginGuardService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
