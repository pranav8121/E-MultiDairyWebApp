import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Xparts/login/login.component';
import { MainComponent } from './Component/Member Reg/main/main.component';
import { PaymentComponent } from './Component/Payment Reg/payment/payment.component';
import { AddmemComponent } from './Component/Member Reg/addmem/addmem.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'Main', component:MainComponent},
  {path:'Payment', component:PaymentComponent},
  {path:'AddMember', component:AddmemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
