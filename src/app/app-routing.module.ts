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
import { SalesComponent } from './Component/Xparts/sales/sales.component';
import { DailyregComponent } from './Component/MemberReg/dailyreg/dailyreg.component';
import { IndividualMemberComponent } from './Component/MemberReg/individual-member/individual-member.component';
import { MemberLoginComponent } from './Component/Xparts/member-login/member-login.component';
import { AdminGuardGuard } from './admin-guard.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'Main', component:MainComponent,canActivate: [AdminGuardGuard]},
  {path:'Payment', component:PaymentComponent,canActivate: [AdminGuardGuard]},
  {path:'PaymentDetails/:from/:to/:data', component:PaydetailComponent,canActivate: [AdminGuardGuard]},
  {path:'AddMemeber', component:AddmemComponent,canActivate: [AdminGuardGuard]},
  {path:'DairyRegister', component:TabComponent,canActivate: [AdminGuardGuard]}, 
  {path:'DairySales', component:SalesComponent,canActivate: [AdminGuardGuard]},
  {path:'DailyRegister', component:DailyregComponent,canActivate: [AdminGuardGuard]},
  {path:'MemberDetails', component:IndividualMemberComponent},
  {path:'MemberLogin', component:MemberLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
