import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/admin/home/home.component';
import { CustomersComponent } from './components/core/customers/customers.component';
import { InvoiceComponent } from './components/core/invoice/invoice.component';
import { PaymentsComponent } from './components/core/payments/payments.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
{path:'clientes',component:CustomersComponent},
{path:'facturas',component:InvoiceComponent},
{path:'',component:PaymentsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
