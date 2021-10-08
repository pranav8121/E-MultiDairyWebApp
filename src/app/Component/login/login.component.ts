import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
err:any
temp:any


LoginForm :any = new FormGroup({
    'Username': new FormControl(null, [Validators.required]),
    'Password': new FormControl(null, [Validators.required]),
  });

  constructor(private _api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    let uname=this.LoginForm.get('Username').value
    let pass=this.LoginForm.get('Password').value
this._api.LoginAuth(uname,pass).subscribe(
  res=>{
this.temp=res
console.log(this.temp);
sessionStorage.setItem('UId',this.temp.Id);
sessionStorage.setItem('Name',this.temp.Name);
sessionStorage.setItem('token',this.temp.token);
sessionStorage.setItem('length',this.temp.Member_count);
this.router.navigate([`/Main`]);
this.err='';
  },
  err=>{
    this.err=err.error.message
  })
  }
}
