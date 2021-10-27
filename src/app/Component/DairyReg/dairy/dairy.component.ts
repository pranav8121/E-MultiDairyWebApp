import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dairy',
  templateUrl: './dairy.component.html',
  styleUrls: ['./dairy.component.css']
})
export class DairyComponent implements OnInit {
  flag_1: any = true
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  RegisterForm:any = new FormGroup({
    'Date': new FormControl(this.currentDate, [Validators.required]),
    'Hour': new FormControl("Morning", [Validators.required]),
    'Type': new FormControl("Buffalow", [Validators.required]),
    'Milk': new FormControl(null, [Validators.required]),
    'SNF': new FormControl(null, [Validators.required]),
    'Fat': new FormControl(null, [Validators.required]),
    'Good': new FormControl("G", [Validators.required]),
    'Rate': new FormControl(null, [Validators.required]),
    'totalRate': new FormControl(null, [Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.flag_1 = false
  }

  Register(){
    let date = this.RegisterForm.get('Date').value
    let type = this.RegisterForm.get('Type').value
    let hour = this.RegisterForm.get('Hour').value
    let milk = this.RegisterForm.get('Milk').value
    let snf = this.RegisterForm.get('SNF').value
    let fat = this.RegisterForm.get('Fat').value
    let good = this.RegisterForm.get('Good').value
    let rate = this.RegisterForm.get('Rate').value
    let totalRate = this.RegisterForm.get('totalRate').value
    let newdate=formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    var temp:any={
      "date":newdate,
      "type":type,
      "hour":hour,
      "milk":milk,
      "snf":snf,
      "fat":fat,
      "good":good,
      "rate":rate,
      "totalRate":totalRate,
    }
    console.log("temp",temp);
    
    
  }
}
