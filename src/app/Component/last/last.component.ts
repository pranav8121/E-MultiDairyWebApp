import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-last',
  templateUrl: './last.component.html',
  styleUrls: ['./last.component.css']
})
export class LastComponent implements OnInit {
  // Boolean
  onload: any = true

  // variable
  lastBill: any = []
  Cname: any;
  Ctype: any;
  Cnum: any;
  onPrintShow: any;
  name: any;
  MCtype: any;
  Ifcow: any;
  Ifbuff: any;

  err: any;
  constructor(private _api: ApiService, private _serv: MatrixService) { }

  ngOnInit(): void {
    this.Cname = this._serv.Cname
    this.Ctype = this._serv.Ctype
    this.Cnum = this._serv.Cnum
    this.onPrintShow = false;
    this.name = sessionStorage.getItem('Name')
    if (this.Ctype == "Buffalow") {
      this.MCtype = "म्हैस"
      this.Ifcow = false
      this.Ifbuff = true
    }
    else {
      this.MCtype = "गाय"
      this.Ifbuff = false
      this.Ifcow = true
    }
    this.API("01/10/2021","11/10/2021")
  }

  API(from: any, to: any) {
    from="01/10/2021"
    to="11/10/2021"
    this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
      console.log(res);
      this.onload = true


    }, err => {
      this.err = "Slow Internet Connection Please Refresh Page"
      this.onload = true
      console.log(err);
    }  
    )};
}


