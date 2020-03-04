import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/admin/home/home.component';
import { CustomersComponent } from './components/core/customers/customers.component';
import { InvoiceComponent } from './components/core/invoice/invoice.component';
import { PaymentsComponent } from './components/core/payments/payments.component';
import { HistoryComponent } from './components/core/history/history.component';
import { ReportsComponent } from './components/core/reports/reports.component';
import { WalletComponent } from './components/core/wallet/wallet.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
{path:'clientes',component:CustomersComponent},
{path:'facturas',component:InvoiceComponent},
{path:'pagos',component:PaymentsComponent},
{path:'historial',component:HistoryComponent},
{path:'reportes',component:ReportsComponent},
{path:'cartera',component:WalletComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
