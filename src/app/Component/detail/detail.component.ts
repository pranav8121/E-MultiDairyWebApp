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
    'Saving': new FormControl(0, [Validators.required]),
    'Share': new FormControl(0, [Validators.required]),
  })
  totalMilk: any;
  last: any;
  totalDeduct: number = 0;
  onPrintShow: boolean = false;
  name: any;
  Ifcow: any = false
  Ifbuff: any = false
  MCtype: any;
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
    this.Cname = this._serv.Cname
    this.Ctype = this._serv.Ctype
    this.Cnum = this._serv.Cnum
    this.sendDate()
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
  }
  API(from: any, to: any) {
    this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
      this.getCurrentBill(res)
      this.onload = true
      this.valid = true

    }, err => {
      this.err = "No Data to show"
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
        this.API(`21/${this.Cmonth}/${this.Cyear}`, `32/01/${this.Cyear + 1}`)

      }
      else {
        this.API(`21/${this.Cmonth}/${this.Cyear}`, `32/${this.Cmonth + 1}/${this.Cyear}`)
      }

    }

  }

  getCurrentBill(res: any) {
    this.CurrentBill = []
    var t_Trate = 0
    var Tmilk = 0
    res.forEach((ele: any) => {
      var emon = (ele.date).slice(3, 5)
      var eyrs = (ele.date).slice(6, 10)
      var cmon = this.currentDate.slice(3, 5)
      var cyrs = this.currentDate.slice(6, 10)
      if (emon == cmon && eyrs == cyrs) {
        this.CurrentBill.push(ele);
        t_Trate = t_Trate + parseFloat(ele.t_rate);
        Tmilk = Tmilk + parseFloat(ele.milk);
      }
    });
    this.totalMilk = Tmilk.toFixed(2)
    var share = (this.totalMilk * 0.05).toFixed(2)
    this.detailsForm.controls['Saving'].setValue(Math.round(this.totalMilk));
    this.detailsForm.controls['Share'].setValue(share);
    this.totalRate = t_Trate.toFixed(2);
    var sum = parseFloat(this.totalMilk) + parseFloat(share)
    this.totalDeduct = sum;
    var sub = this.totalRate - sum
    this.subTotal = sub.toFixed(2)
    // this.detailsForm.setValue(Saving:)
  }

  calcu() {
    var adv = this.detailsForm.get('Adv').value
    var sup = this.detailsForm.get('Sup').value
    var sav = this.detailsForm.get('Saving').value
    var share = this.detailsForm.get('Share').value
    console.log(adv, sup, sav, share);

    if (adv || sup || sav || share) {
      var sum = parseFloat(adv) + parseFloat(sup) + parseFloat(sav) + parseFloat(share)
      this.totalDeduct = sum;
      var sub = this.totalRate - sum
      if (!sub) {
        console.log("Nan");
        this.subTotal = this.last
      } else {
        this.subTotal = sub.toFixed(2)
        this.last = this.subTotal
      }

    }
  }
}
