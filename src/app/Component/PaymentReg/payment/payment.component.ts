import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
parentData:any=[]
  temp: any;
  data:any
  flag_1:any=false
  err: any;
  hideErr: any;

  constructor(private _api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getData()
  }
getData(){
this._api.GetPaymentReg().subscribe(res=>{
  this.temp=res
  this.data=this.temp.data
  this.flag_1=true
  this.hideErr=true
  this.err="*Something Wrong Please Refresh!!"

},err=>{
  console.log(err);
  this.flag_1=true
  this.hideErr=false
  this.err="*Something Wrong Please Refresh!!"
})
}
moreDetail(from:any,to:any){
  from=encodeURIComponent(from)
  to=encodeURIComponent(to)
  this.router.navigate([`/PaymentDeatails`,from,to]);
}
}
