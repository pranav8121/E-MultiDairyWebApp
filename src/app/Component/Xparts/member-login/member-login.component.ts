  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router ,Params} from '@angular/router';
  import { ApiService } from 'src/app/Service/api.service';
  
 @Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.css']
})
export class MemberLoginComponent implements OnInit {
    err: any
    temp: any
    isClicked: any = false
  
  
    LoginForm: any = new FormGroup({
      'Username': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required]),
    });
   memId: any;
  
    constructor(private _api: ApiService, private router: Router,private ar:ActivatedRoute) { 
      // this.ar.params.subscribe(
      //   (route) => {
      //     this.memId = route.memId;
      //   }
      // )
      // console.log(this.memId);
      
    }
  
    ngOnInit(): void {
    //   this.ar.params.forEach((params: Params) => {
    //     this.memId = params['memId'];
    // });
    // console.log(this.memId);
    
    }
  
    submit() {
      this.isClicked = true
      let uname = this.LoginForm.get('Username').value
      let pass = this.LoginForm.get('Password').value
      this._api.LoginMemAuth(uname, pass).subscribe(
        res => {
          this.isClicked = false
          this.temp = res
          sessionStorage.setItem('UId', this.temp.Id);
          sessionStorage.setItem('Name', this.temp.Name);
          sessionStorage.setItem('MemberId', uname);
          sessionStorage.setItem('auth', this.temp.auth);
  
          this._api.UId = this.temp.Id;
          this.router.navigate([`/MemberDetails`]);
  
          this.err = '';
        },
        err => {
          this.isClicked = false
          this.err = err.error.message
        })
    }
  }
  
