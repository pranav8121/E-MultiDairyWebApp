import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Xparts/login/login.component';
import { MainComponent } from './Component/MemberReg/main/main.component';
import { PaymentComponent } from './Component/PaymentReg/payment/payment.component';
import { AddmemComponent } from './Component/Xparts/addmem/addmem.component';
// import { DairyComponent } from './Component/DairyReg/dairy/dairy.component';
// import { DairytableComponent } from './Component/DairyReg/dairytable/dairytable.component';
import { TabComponent } from './Component/DairyReg/tab/tab.component';
import { PaydetailComponent } from './Component/PaymentReg/paydetail/paydetail.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'Main', component:MainComponent},
  {path:'Payment', component:PaymentComponent},
  {path:'PaymentDeatails/:from/:to', component:PaydetailComponent},
  {path:'AddMemeber', component:AddmemComponent},
  {path:'DairyRegister', component:TabComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
