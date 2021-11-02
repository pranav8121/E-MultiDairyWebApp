import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-paydetail',
  templateUrl: './paydetail.component.html',
  styleUrls: ['./paydetail.component.css']
})
export class PaydetailComponent implements OnInit {
from:any
to:any
  data: any;
  order:any="No"
  flag_1:any=false
  err: any;
  hideErr:any

  constructor(private _Activatedroute:ActivatedRoute,private _api:ApiService) { }

  ngOnInit(): void {
    this.getData()    
  }
  getData(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    this.from=decodeURIComponent(f)
    this.to=decodeURIComponent(t)
    this._api.FindPaymentReg(this.from,this.to).subscribe(res=>{
      this.data=res
      this.flag_1=true
      this.hideErr=true
      
    },err=>{
      this.flag_1=true
      this.hideErr=false
      this.err="*Something Wrong Please Refresh!!"
    })
  }

}
