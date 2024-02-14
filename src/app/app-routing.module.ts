import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
   { path : 'login' , component : LoginComponent },
   { path : '', component: DashboardComponent,  canActivate: [authGuard]  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
