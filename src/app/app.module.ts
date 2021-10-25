import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { MainComponent } from './Component/Dairy Reg/main/main.component';
import { HeaderComponent } from './Component/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './Component/Dairy Reg/detail/detail.component';
import { TrimdatePipe } from './Pipes/trimdate.pipe';
import { NgxPrintModule } from 'ngx-print';
import { LastComponent } from './Component/Dairy Reg/last/last.component';
import { AdvanceComponent } from './Component/Dairy Reg/advance/advance.component';
import { SupplyComponent } from './Component/Dairy Reg/supply/supply.component';

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
    SupplyComponent
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
