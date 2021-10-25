import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { MainComponent } from './Component/Dairy Reg/main/main.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'Main', component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
