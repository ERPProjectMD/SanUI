import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { ListComponent } from './Purchase/Order/list/list.component';

const routes: Routes = [
   { path : 'login' , component : LoginComponent },
   { path : '', component: NavComponent,  canActivate: [authGuard] ,
     children : [
      {
        path : '', component : DashboardComponent, canActivate : [authGuard]
      },
      {
        path: 'purchase', component: ListComponent, canActivate : [authGuard]
      }
] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
