import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any
  Cname: any
  Ctype: any
  valid: any
  err: any;
  Cnum: any;
  onload: any = false
  Cmonth: any;
  Cdate: any;
  currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
  Cyear: any;
  CurrentBill: any;
  totalRate: any = 0
  subTotal: any = 0
  detailsForm: any = new FormGroup({
    'Adv': new FormControl(0, [Validators.required]),
    'Sup': new FormControl(0, [Validators.required]),
  })
  totalMilk: any;
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
    this.Cname = this._serv.Cname
    this.Ctype = this._serv.Ctype
    this.Cnum = this._serv.Cnum
    this.sendDate()
  }
  API(from: any, to: any) {
    this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
      this.getCurrentBill(res)
      this.onload = true
      this.valid = true

    }, err => {
      this.err = "Slow Internet Connection Please Refresh Page"
      this.onload = true
      this.valid = false
      console.log(err);

    })

  }

  sendDate() {
    var today = new Date()
    this.Cdate = today.getDate()
    this.Cmonth = today.getMonth() + 1
    this.Cyear = today.getFullYear()

    if (this.Cdate >= 1 && this.Cdate <= 10) {
      console.log("first");
      this.API(`01/${this.Cmonth}/${this.Cyear}`, `11/${this.Cmonth}/${this.Cyear}`)

    }
    else if (this.Cdate >= 11 && this.Cdate <= 20) {
      console.log("second");
      this.API(`11/${this.Cmonth}/${this.Cyear}`, `21/${this.Cmonth}/${this.Cyear}`)

    }
    else if (this.Cdate >= 21 && this.Cdate <= 31) {
      console.log("third");
      if (this.Cmonth == 1) {
        this.API(`21/${this.Cmonth}/${this.Cyear}`, `01/01/${this.Cyear + 1}`)

      }
      else {
        this.API(`21/${this.Cmonth}/${this.Cyear}`, `01/${this.Cmonth + 1}/${this.Cyear}`)
      }

    }

  }

  getCurrentBill(res: any) {
    this.CurrentBill = []
    var t_Trate = 0
    var Tmilk=0
    res.forEach((ele: any) => {
      var emon = (ele.date).slice(3, 5)
      var eyrs = (ele.date).slice(6, 10)
      var cmon = this.currentDate.slice(3, 5)
      var cyrs = this.currentDate.slice(6, 10)
      if (emon == cmon && eyrs == cyrs) {
        this.CurrentBill.push(ele);
        t_Trate = t_Trate + parseFloat(ele.t_rate);
        Tmilk=Tmilk+parseFloat(ele.milk);
      }
    });
    this.totalRate = t_Trate.toFixed(2);
    this.subTotal=this.totalRate
    this.totalMilk=Tmilk.toFixed(2)
  }

  calcu(){
    var adv=this.detailsForm.get('Adv').value
    var sup=this.detailsForm.get('Sup').value
    if(adv && sup){
var sum=parseFloat(adv)+parseFloat(sup)
var sub=this.totalRate-sum
this.subTotal=sub.toFixed(2)
    }
  }
}
