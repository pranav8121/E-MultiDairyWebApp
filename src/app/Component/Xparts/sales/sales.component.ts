import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  flag_1: any = true
  getErr:any=false
  order:string = "date"
  p: number = 1
  onClickReg: any = false
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  salesForm: any = new FormGroup({
    'Date': new FormControl(this.currentDate, [Validators.required]),
    'Hour': new FormControl("Morning", [Validators.required]),
    'Type': new FormControl("Buffalow", [Validators.required]),
    'Milk': new FormControl(null, [Validators.required]),
    'Rate': new FormControl(null, [Validators.required]),
    'totalRate': new FormControl({ value: null, disabled: true }, [Validators.required]),
  })
  InitialForm:any
  err: any;
  data: any=[]
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.InitialForm=this.salesForm.value
    this.getData()
  }
  getData(){
    this._api.GetDairySales().subscribe(res=>{
      this.data=res
      console.log(res);
      this.flag_1=false
      this.getErr=false
    },err=>{
      console.log(err);
      this.getErr=true
      this.flag_1=false
    })
  }

  calcu() {
    var milk = this.salesForm.get('Milk').value
    var rate = this.salesForm.get('Rate').value
    var totalrate = 0
    if (milk && rate) {
      console.log("valid")
      totalrate = 0
      totalrate = milk* rate
      totalrate=parseFloat(totalrate.toFixed(2))
      this.salesForm.controls['totalRate'].setValue(totalrate);
    }
    else{
      this.salesForm.controls['totalRate'].setValue(0);
    }
  }

  onSave() {
    this.err=false
    this.onClickReg = true
    var hour
    var type
    var date = this.salesForm.get('Date').value
    var ehour = this.salesForm.get('Hour').value
    var etype = this.salesForm.get('Type').value
    var milk = this.salesForm.get('Milk').value
    var rate = this.salesForm.get('Rate').value
    var totalrate = this.salesForm.get('totalRate').value
    var newDate = formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    if (ehour == "Morning") { hour = "सकाळ" } else { hour = "संध्याकाळ" }
    if (etype == "Buffalow") { type = "म्हैस" } else { type = "गाय" }
    var temp = {
      "date": newDate,
      "hours": hour,
      "ehours": ehour,
      "type": type,
      "etype": etype,
      "milk": milk,
      "rate": rate,
      "totalRate": totalrate
    }
    console.log(temp);
    this._api.PostDairySales(temp).subscribe(res=>{
      this.onClickReg=false
      this.data.push(temp)
      console.log(res);
      this.salesForm.reset(this.InitialForm)
      this.err=false
    },err=>{
      console.log(err);
      this.err=true
      this.onClickReg=false
    })

  }
}
