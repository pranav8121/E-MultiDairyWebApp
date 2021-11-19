import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import * as xlsx from 'xlsx';

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
  mainData:any
  @ViewChild('tabledata', { static: false }) tabledata: any;
  constructor(private _Activatedroute:ActivatedRoute,private _api:ApiService,private router:Router) { }
  ngOnInit(): void {
    this.getData()    
  }
  getData(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    let data:any=this._Activatedroute.snapshot.paramMap.get("data")
    this.from=decodeURIComponent(f)
    this.to=decodeURIComponent(t)
    this.mainData=JSON.parse(decodeURIComponent(data)) 
    console.log(this.mainData)
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


  export(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.tabledata.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, `पेमेंट रजिस्टर${this.from}-${ this.to}.xlsx`);
  }

  goBack(){
    this.router.navigate([`/Payment`]);
  }

}
