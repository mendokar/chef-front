import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/admin/home/home.component';
import { CustomersComponent } from './components/core/customers/customers.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
{path:'',component:CustomersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
