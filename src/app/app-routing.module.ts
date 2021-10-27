import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Xparts/login/login.component';
import { MainComponent } from './Component/MemberReg/main/main.component';
import { PaymentComponent } from './Component/PaymentReg/payment/payment.component';
import { AddmemComponent } from './Component/Xparts/addmem/addmem.component';
import { DairyComponent } from './Component/DairyReg/dairy/dairy.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'Main', component:MainComponent},
  {path:'Payment', component:PaymentComponent},
  {path:'AddMemeber', component:AddmemComponent},
  {path:'DairyRegister', component:DairyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
