import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-dairy',
  templateUrl: './dairy.component.html',
  styleUrls: ['./dairy.component.css']
})
export class DairyComponent implements OnInit {
  flag_1: any = true
  onClickReg: any = false
  onRegRes: any = false
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  err_1:any=false
  RegisterForm: any = new FormGroup({
    'Date': new FormControl({ value: this.currentDate, disabled: this.onRegRes }, [Validators.required]),
    'Hour': new FormControl({ value: "Morning", disabled: this.onRegRes }, [Validators.required]),
    'Type': new FormControl({ value: "Buffalow", disabled: this.onRegRes }, [Validators.required]),
    'Milk': new FormControl({ value: null, disabled: this.onRegRes }, [Validators.required]),
    'SNF': new FormControl({ value: null, disabled: this.onRegRes }, [Validators.required]),
    'Fat': new FormControl({ value: null, disabled: this.onRegRes }, [Validators.required]),
    'Good': new FormControl({ value: "G", disabled: this.onRegRes }, [Validators.required]),
    'Rate': new FormControl({ value: null, disabled: this.onRegRes }, [Validators.required]),
    'totalRate': new FormControl({ value: null, disabled: this.onRegRes }, [Validators.required]),
  })
  TotalMilk: any;
  Rate: any;
  TotalRate: any;

  hideOkay: any = true
  ExtraMilk: any;
  ExtraTotalRate: any;
  ExtraRate: any;
  noData: any;
  entry: any;
  initialValues: any;
  onSaveErr: any = false
  onSaveClick = false
  negMilk: any = false
  negTotalRate: any = false
  SalesTotalRate: any;
  SalesTotalMilk: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.initialValues = this.RegisterForm.value
    this.getData()
  }
  getData() {
    this.flag_1 = false
  }

  Register() {
    this.onClickReg = true
    let date = this.RegisterForm.get('Date').value
    let etype = this.RegisterForm.get('Type').value
    let etype2 = this.RegisterForm.get('Type').value
    let ehour = this.RegisterForm.get('Hour').value
    let milk = this.RegisterForm.get('Milk').value
    let snf = this.RegisterForm.get('SNF').value
    let fat = this.RegisterForm.get('Fat').value
    let good = this.RegisterForm.get('Good').value
    let rate = this.RegisterForm.get('Rate').value
    let totalRate = this.RegisterForm.get('totalRate').value
    let newdate = formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    var hour
    var type
    if (ehour == "Morning") { hour = "सकाळ" } else { hour = "संध्याकाळ" }
    if (etype == "Mix") {
      etype = "Cow"
      etype2 = "Buffalow"
    }
    if (etype == "Buffalow") { type = "म्हैस" } else { type = "गाय" }
    var Data: any = {
      "date": newdate,
      "type": type,
      "etype": etype,
      "etype2": etype2,
      "ehours": ehour,
      "hours": hour,
      "milk": milk,
      "snf": snf,
      "fat": fat,
      "good": good,
      "rate": rate,
      "totalRate": totalRate,
      "UId": sessionStorage.getItem('UId')
    }
    this._api.CheckDairyReg(Data).subscribe(result => {
      this.entry = false
      this.negMilk = false
      this.negTotalRate = false
      this._api.FindOneDayTotal(Data).subscribe(res => {
        this._api.FindDairySales(Data).subscribe(res_1=>{
          var temp: any = res_1
          this.SalesTotalRate=temp.SalesTotalRate
          this.SalesTotalMilk=temp.SalesTotalMilk
          this.err_1=false
        },err_1=>{
        this.err_1=true
        })
        this.hideOkay = false
        this.noData = false
        var temp: any = res
        this.TotalMilk = temp.TotalMilk
        this.Rate = temp.Rate
        this.TotalRate = temp.TotalRate
        this.ExtraMilk = (milk - this.TotalMilk).toFixed(2)
        this.ExtraTotalRate = (totalRate - this.TotalRate).toFixed(2)
        this.ExtraRate = (this.Rate - rate).toFixed(2)
        this.onRegRes = true
        this.RegisterForm.disable()

      },
        err => {
          this.noData = true
          this.onClickReg = false

        });
    },
      error => {
        this.entry = true
        this.onClickReg = false
      })


  }


  onSave() {
    this.onSaveClick = true
    let date = this.RegisterForm.get('Date').value
    let etype = this.RegisterForm.get('Type').value
    let ehour = this.RegisterForm.get('Hour').value
    let milk = this.RegisterForm.get('Milk').value
    let snf = this.RegisterForm.get('SNF').value
    let fat = this.RegisterForm.get('Fat').value
    let good = this.RegisterForm.get('Good').value
    let rate = this.RegisterForm.get('Rate').value
    let totalRate = this.RegisterForm.get('totalRate').value
    let newdate = formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    let hour
    let type
    if (etype == "Mix") {etype = "Buffalow"}
    if (ehour == "Morning") { hour = "सकाळ" } else { hour = "संध्याकाळ" }
    if (etype == "Buffalow") { type = "म्हैस" } else { type = "गाय" }
    var temp: any = {
      "date": newdate,
      "type": type,
      "etype": etype,
      "ehours": ehour,
      "hours": hour,
      "salesTotalRate":this.SalesTotalRate,
      "salesTotalMilk":this.SalesTotalMilk,
      "milk": milk,
      "snf": snf,
      "fat": fat,
      "good": good,
      "rate": rate,
      "totalRate": totalRate,
      "dairyMilk": this.TotalMilk,
      "dairyTotalRate": this.TotalRate,
      "dairyRate": this.Rate,
      "extraMilk": this.ExtraMilk,
      "extraTotalRate": this.ExtraTotalRate,
      "extraRate": this.ExtraRate,
      "UId": sessionStorage.getItem('UId')
    }
    if(sessionStorage.getItem("UId")){
      this._api.PostDairyReg(temp).subscribe(res=>{
        this.onCancel()        
        this.RegisterForm.reset(this.initialValues)
        this.onSaveClick=false
        this.onSaveErr=false
      },err=>{
        this.onSaveClick=false
        this.onSaveErr=true

      })
    } 
  }

  onCancel() {
    this.onSaveErr = false
    this.onClickReg = false
    this.onRegRes = false
    this.hideOkay = true
    this.noData = false
    this.RegisterForm.enable()
  }
}
