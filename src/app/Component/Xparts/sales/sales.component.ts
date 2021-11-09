import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  flag_1: any = false
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
  constructor() { }

  ngOnInit(): void {
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
    this.onClickReg = false
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
  }
}
