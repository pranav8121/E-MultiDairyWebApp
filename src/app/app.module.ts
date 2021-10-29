import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/Xparts/login/login.component';
import { MainComponent } from './Component/MemberReg/main/main.component';
import { HeaderComponent } from './Component/Xparts/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './Component/MemberReg/detail/detail.component';
import { TrimdatePipe } from './Pipes/trimdate.pipe';
import { NgxPrintModule } from 'ngx-print';
import { LastComponent } from './Component/MemberReg/last/last.component';
import { AdvanceComponent } from './Component/MemberReg/advance/advance.component';
import { SupplyComponent } from './Component/MemberReg/supply/supply.component';
import { PaymentComponent } from './Component/PaymentReg/payment/payment.component';
import { AddmemComponent } from './Component/Xparts/addmem/addmem.component';
import { DairyComponent } from './Component/DairyReg/dairy/dairy.component';
import { TabComponent } from './Component/DairyReg/tab/tab.component';
import { DairytableComponent } from './Component/DairyReg/dairytable/dairytable.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    DetailComponent,
    TrimdatePipe,
    LastComponent,
    AdvanceComponent,
    SupplyComponent,
    PaymentComponent,
    AddmemComponent,
    DairyComponent,
    TabComponent,
    DairytableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    OrderModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
