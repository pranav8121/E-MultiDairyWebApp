import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-last',
  templateUrl: './last.component.html',
  styleUrls: ['./last.component.css']
})
export class LastComponent implements OnInit {
  // Boolean
  onload: any = false
  valid: any

  // variable
  order:string = "date"
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
  Cdate: any;
  Cmonth: any;
  Cyear: any;
  totalMilk: any;
  lastDate: any;
  detailsForm: any = new FormGroup({
    'Adv': new FormControl(0, [Validators.required]),
    'Sup': new FormControl(0, [Validators.required]),
    'Saving': new FormControl(0, [Validators.required]),
    'Share': new FormControl(0, [Validators.required]),
  })
  subTotal: any;
  totalRate: any;
  totalDeduct: any;
  last: any;
  from: any;
  to: any;
  err_p: any
  invNo: any;
  exist: any;
  temp: any;
  onload_1: any;
  clicked: any;
  morMilk: any;
  morRate: any;
  eveMilk: any;
  eveRate: any;
  currentDate: any= formatDate(new Date(), 'dd/MM/YYYY', 'en')
 
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
    this.sendDate()
  }

  API(from: any, to: any) {
    this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
      this.valid = true
      this.getCurrentBill(res)
      this.findBill()
      this.onload = true

    }, err => {
      this.err = "No Data Found"
      this.onload = true
      this.valid = false
    }
    )
  };

  OnPrint(){
    var divContents = document.getElementById("print_section")?.innerHTML
    var a:any = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body >');
    // a.document.write(`<h4 style="text-align:center;">${this.Name}</h4>`);
    // style="text-align:left;font-size:xx-large"
    // a.document.write(`<p style="text-align:center;">नाव:${this.Cnum}-${this.Cname}</p>`);
    // a.document.write(`<p style="text-align:center;">ता./वेळ:${this.currentDate}/${this.timeMsg}</p>`);
    // a.document.write(`<p style="text-align:center;">दुधाचा प्रकार:${this.MCtype}</p>`);
    // a.document.write('<hr/>')
    // a.document.write(`<p> &nbsp दूध : &nbsp  ${this.milk} लिटर</p>`)
    // a.document.write(`<p> &nbsp फॅट: &nbsp ${this.fat}</p>`)
    // a.document.write(`<p> &nbsp एस एन एफ: &nbsp ${this.snf}</p>`)
    // a.document.write(`<p> &nbsp दर/लिटर : &nbsp ${this.rate} रुपये </p>`)
    // a.document.write(`<p> &nbsp एकूण दर  : &nbsp ${this.t_rate} रुपये</p>`)
    // a.document.write('<hr/>')
    a.document.write(divContents)

    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }
  findBill() {
    this._api.FindBill(this.invNo, this.Cnum).subscribe(
      res => {
        this.temp = res
        this.detailsForm.controls['Adv'].setValue(this.temp[0].adv);
        this.detailsForm.controls['Sup'].setValue(this.temp[0].supply);
        this.detailsForm.controls['Saving'].setValue(this.temp[0].bank);
        this.detailsForm.controls['Share'].setValue(this.temp[0].share);
        this.totalRate=this.temp[0].totalRate
      this.totalDeduct=this.temp[0].cutting
      this.subTotal=this.temp[0].subAmount
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
    var myPastDate = new Date(today);
    if(myPastDate.getDate()==31){
      myPastDate.setDate(today.getDate() - 11)
    }
    else{
      myPastDate.setDate(today.getDate() - 10)
    }
    this.Cdate = myPastDate.getDate()
    this.Cmonth = myPastDate.getMonth() + 1
    this.Cyear = myPastDate.getFullYear()
    this.lastDate = formatDate(new Date(myPastDate), 'dd/MM/YYYY', 'en')
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
    this.lastBill = []
    var t_Trate = 0
    var Tmilk = 0
    this.morMilk = 0;
    this.morRate = 0;
    this.eveMilk = 0;
    this.eveRate = 0;
    res.forEach((ele: any) => {

      var emon = (ele.date).slice(3, 5)
      var eyrs = (ele.date).slice(6, 10)
      var cmon = this.lastDate.slice(3, 5)
      var cyrs = this.lastDate.slice(6, 10)
      if (emon == cmon && eyrs == cyrs) {
        this.lastBill.push(ele);
        t_Trate = t_Trate + parseFloat(ele.t_rate);
        Tmilk = Tmilk + parseFloat(ele.milk);

        if (ele.ehours == "Morning") {
          this.morMilk = this.morMilk + parseFloat(ele.milk);
          this.morRate = this.morRate + parseFloat(ele.t_rate);
        }

        if (ele.ehours == "Evening") {
          this.eveMilk = this.eveMilk + parseFloat(ele.milk);
          this.eveRate = this.eveRate + parseFloat(ele.t_rate);
        }
        
      }
    });
    this.eveMilk=parseFloat(this.eveMilk).toFixed(2)
    this.eveRate=parseFloat(this.eveRate).toFixed(2)
    this.morRate=parseFloat(this.morRate).toFixed(2)
    this.morMilk =parseFloat(this.morMilk).toFixed(2)

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
    this.clicked = true
    var adv = this.detailsForm.get('Adv').value
    var sup = this.detailsForm.get('Sup').value
    var sav = this.detailsForm.get('Saving').value
    var share = this.detailsForm.get('Share').value
    var temp
    var adv_temp:any
    var sup_temp:any
    adv_temp={
      Name: this.Cname,
      No: this.Cnum,
      type: "advance",
      date: this.currentDate,
      cutAmount: adv,
      UId: sessionStorage.getItem("UId")
    }
    sup_temp= {
      Name: this.Cname,
      No: this.Cnum,
      type: "supply",
      date: this.currentDate,
      cutAmount: sup,
      UId: sessionStorage.getItem("UId")
    }

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
      morTotalmilk: this.morMilk,
      eveTotalmilk: this.eveMilk,
      totalRate: this.totalRate,
      cutting: this.totalDeduct,
      subAmount: this.subTotal,
      mortotalRate: this.morRate,
      evetotalRate: this.eveRate,
      UId: sessionStorage.getItem('UId')
    }
    this._api.postBill(temp).subscribe(res => {
      this.err_p = ""
      this.temp = res
      this.detailsForm.controls['Adv'].setValue(this.temp.data.adv);
      this.detailsForm.controls['Sup'].setValue(this.temp.data.supply);
      this.detailsForm.controls['Saving'].setValue(this.temp.data.bank);
      this.detailsForm.controls['Share'].setValue(this.temp.data.share);
      this.totalRate=this.temp.data.totalRate
      this.totalDeduct=this.temp.data.cutting
      this.subTotal=this.temp.data.subAmount
      this.CuttingApi( adv_temp,sup_temp)
      this.exist = true
      this.OnPrint()
    }, err => {
      this.clicked = false
      this.exist = false
      this.err_p = "*ERROR In Saving Data"
    })
  }

  CuttingApi(data1:any,data2:any){
    this._api.PostSupply(data1).subscribe(res=>{
      
    },err=>{
      console.log(" adv err");
    })
    this._api.PostSupply(data2).subscribe(res=>{
    },err=>{ 
      console.log(" Sup err");
    })
  }
  
  OnPrint(){
    var divContents = document.getElementById("print_section")?.innerHTML
    var adv = this.detailsForm.get('Adv').value
    var sup = this.detailsForm.get('Sup').value
    var sav = this.detailsForm.get('Saving').value
    var share = this.detailsForm.get('Share').value
    var a:any = window.open('', '', 'height=500, width=900');
    a.document.write('<html>');
    a.document.write('<body >');
    a.document.write(`<h4 style="text-align:center;">${this.name}</h4>`);
    a.document.write(`<p style="text-align:center;">नाव:${this.Cnum}-${this.Cname}</p>`);
    a.document.write('<hr/>')
    a.document.write(divContents)
    a.document.write('<hr/>')
    a.document.write(`<p> &nbsp एकूण दूध: &nbsp <strong> ${this.totalMilk}</strong> &nbsp  &nbsp एकूण रक्कम:<strong> ${this.totalRate} </strong></p>`)
    a.document.write(`<p> &nbsp ऍडव्हान्स: &nbsp <strong>${adv}</strong> &nbsp  &nbsp बँक भरणा:<strong>${sav}</strong> </p>`)
    a.document.write(`<p> &nbsp पशुखाद्य : &nbsp <strong>${sup}</strong> &nbsp  &nbsp शेअर:<strong>${share} </strong></p>`)
    a.document.write(`<p> &nbsp एकूण कपात : &nbsp <strong>${this.totalDeduct}</strong></p>`)
    a.document.write(`<p> &nbsp देय रक्कम : &nbsp <strong> ${this.subTotal}</strong></p>`)
    a.document.write('<hr/>')
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }
}


