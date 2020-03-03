import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilderModule } from './dynamic-form-builder/dynamic-form-builder.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/admin/home/home.component';
import { CustomersComponent } from './components/core/customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  