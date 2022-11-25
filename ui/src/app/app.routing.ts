import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { WrapperComponent } from './views/wrapper.component';

import { LoginGuardService } from './services/router-guard/login.guard-service';
import { HomeGuardService } from './services/router-guard/home.guard-service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'login',
    canActivate: [LoginGuardService],
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  // {
  //   path: 'createcustomer'
  //   canActivate: []

  // }, 

  {
    path: '',
    canActivate: [HomeGuardService],
    component: WrapperComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

