import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  from: any;
  to: any;
  err_p: any;
  invNo: any;
  temp: any;
  exist: any;
  onload_1: any;
  morMilk: any;
  morRate: any;
  eveMilk: any;
  eveRate: any;
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
      this.findBill()
      this.onload = true
      this.valid = true

    }, err => {
      this.err = "No Data Found"
      this.onload = true
      this.valid = false

    })

  }


  findBill() {
    this._api.FindBill(this.invNo, this.Cnum).subscribe(
      res => {
        this.temp = res
        this.detailsForm.controls['Adv'].setValue(this.temp[0].adv);
        this.detailsForm.controls['Sup'].setValue(this.temp[0].supply);
        this.detailsForm.controls['Saving'].setValue(this.temp[0].bank);
        this.detailsForm.controls['Share'].setValue(this.temp[0].share);
        this.totalRate = this.temp[0].totalRate
        this.totalDeduct = this.temp[0].cutting
        this.subTotal = this.temp[0].subAmount
        this.exist = true
        this.onload_1 = true
      }, err => {
        this.exist = false
        this.onload_1 = true

      }
    )
  }

  sendDate() {
    var today = new Date()
    this.Cdate = today.getDate()
    this.Cmonth = today.getMonth() + 1
    this.Cyear = today.getFullYear()

    if (this.Cdate >= 1 && this.Cdate <= 10) {
      console.log("1");

      this.from = `01/${this.Cmonth}/${this.Cyear}`
      this.to = `11/${this.Cmonth}/${this.Cyear}`
      this.API(this.from, this.to)
      this.invNo = `${this.Cnum}Bill-01_${this.to}`
    }
    else if (this.Cdate >= 11 && this.Cdate <= 20) {
      console.log("2");

      this.from = `11/${this.Cmonth}/${this.Cyear}`
      this.to = `21/${this.Cmonth}/${this.Cyear}`
      this.API(this.from, this.to)
      this.invNo = `${this.Cnum}Bill-02_${this.to}`
    }
    else if (this.Cdate >= 21 && this.Cdate <= 31) {
      console.log("3");
      if (this.Cmonth == 1) {
        this.from = `21/${this.Cmonth}/${this.Cyear}`
        this.to = `32/01/${this.Cyear + 1}`
        this.API(this.from, this.to)
      }
      else {
        this.from = `21/${this.Cmonth}/${this.Cyear}`
        this.to = `32/${this.Cmonth + 1}/${this.Cyear}`
        this.API(this.from, this.to)
      }
      this.invNo = `${this.Cnum}Bill-03_31/${this.Cmonth + 1}/${this.Cyear}`
    }

  }

  getCurrentBill(res: any) {
    this.CurrentBill = []
    var t_Trate = 0
    var Tmilk = 0
    this.morMilk = 0;
    this.morRate = 0;
    this.eveMilk = 0;
    this.eveRate = 0;
    res.forEach((ele: any) => {
      if (ele.ehours == "Morning") {
        this.morMilk = this.morMilk + parseFloat(ele.milk);
        this.morMilk =parseFloat(this.morMilk).toFixed(2)
        // var morM=parseFloat(this.morMilk)
        this.morRate = this.morRate + parseFloat(ele.t_rate);
        this.morRate=parseFloat(this.morRate).toFixed(2)
      }
      if (ele.ehours == "Evening") {
        this.eveMilk = this.eveMilk + parseFloat(ele.milk);
        this.eveMilk=parseFloat(this.eveMilk).toFixed(2)
        this.eveRate = this.eveRate + parseFloat(ele.t_rate);
        this.eveRate=parseFloat(this.eveRate).toFixed(2)
      }
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
    this.detailsForm.controls['Saving'].setValue(this.totalMilk);
    this.detailsForm.controls['Share'].setValue(share);
    this.totalRate = t_Trate.toFixed(2);
    var sum = parseFloat(this.totalMilk) + parseFloat(share)
    this.totalDeduct = parseFloat(sum.toFixed(2));
    var sub = this.totalRate - sum
    this.subTotal = sub.toFixed(2)
    // this.detailsForm.setValue(Saving:)
  }

  calcu() {
    var adv = this.detailsForm.get('Adv').value
    var sup = this.detailsForm.get('Sup').value
    var sav = this.detailsForm.get('Saving').value
    var share = this.detailsForm.get('Share').value

    if (adv || sup || sav || share) {
      var sum = parseFloat(adv) + parseFloat(sup) + parseFloat(sav) + parseFloat(share)
      this.totalDeduct = parseFloat(sum.toFixed(2));
      var sub = this.totalRate - sum
      if (!sub) {
        this.subTotal = this.last
      } else {
        this.subTotal = sub.toFixed(2)
        this.last = this.subTotal
      }

    }
  }

  Submit() {
    var adv = this.detailsForm.get('Adv').value
    var sup = this.detailsForm.get('Sup').value
    var sav = this.detailsForm.get('Saving').value
    var share = this.detailsForm.get('Share').value
    var temp
    temp = {
      Name: this.Cname,
      No: this.Cnum,
      adv: adv,
      bank: sav,
      supply: sup,
      share: share,
      inv_no: this.invNo,
      from: this.from,
      to: this.to,
      totalmilk: this.totalMilk,
      totalRate: this.totalRate,
      cutting: this.totalDeduct,
      subAmount: this.subTotal,
      UId: sessionStorage.getItem('UId')
    }
    this._api.postBill(temp).subscribe(res => {
      this.err_p = ""
      this.temp = res
      this.detailsForm.controls['Adv'].setValue(this.temp.data.adv);
      this.detailsForm.controls['Sup'].setValue(this.temp.data.supply);
      this.detailsForm.controls['Saving'].setValue(this.temp.data.bank);
      this.detailsForm.controls['Share'].setValue(this.temp.data.share);
      this.totalRate = this.temp.data.totalRate
      this.totalDeduct = this.temp.data.cutting
      this.subTotal = this.temp.data.subAmount
      this.exist = true
    }, err => {
      this.exist = false
      this.err_p = "*ERROR In Saving Data"
    })
    // this.err_p="*ERROR In Saving Data"

  }
}
