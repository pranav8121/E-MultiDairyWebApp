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
  onClickReg:any=false
  onRegRes: any=false
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  RegisterForm:any = new FormGroup({
    'Date': new FormControl({value:this.currentDate,disabled:this.onRegRes}, [Validators.required]),
    'Hour': new FormControl({value:"Morning",disabled:this.onRegRes}, [Validators.required]),
    'Type': new FormControl({value:"Buffalow",disabled:this.onRegRes}, [Validators.required]),
    'Milk': new FormControl({value:null,disabled:this.onRegRes}, [Validators.required]),
    'SNF': new FormControl({value:null,disabled:this.onRegRes}, [Validators.required]),
    'Fat': new FormControl({value:null,disabled:this.onRegRes}, [Validators.required]),
    'Good': new FormControl({value:"G",disabled:this.onRegRes}, [Validators.required]),
    'Rate': new FormControl({value:null,disabled:this.onRegRes}, [Validators.required]),
    'totalRate': new FormControl({value:null,disabled:this.onRegRes}, [Validators.required]),
  })
  TotalMilk: any;
  Rate: any;
  TotalRate: any;
  
  hideOkay:any=true
  ExtraMilk: any;
  ExtraTotalRate: any;
  ExtraRate: any;
  noData: any;
  entry: any;
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.flag_1 = false
  }

  Register(){
    this.onClickReg=true
    let date = this.RegisterForm.get('Date').value
    let etype = this.RegisterForm.get('Type').value
    let ehour = this.RegisterForm.get('Hour').value
    let milk = this.RegisterForm.get('Milk').value
    let snf = this.RegisterForm.get('SNF').value
    let fat = this.RegisterForm.get('Fat').value
    let good = this.RegisterForm.get('Good').value
    let rate = this.RegisterForm.get('Rate').value
    let totalRate = this.RegisterForm.get('totalRate').value
    let newdate=formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    var hour 
    var type
    if(ehour=="Morning"){hour="सकाळ"}else{hour="संध्याकाळ"}
    if(etype=="Buffalow"){type="म्हैस"}else{type="गाय"}
    var temp:any={
      "date":newdate,
      "type":type,
      "etype":etype,
      "ehours":ehour,
      "hours":hour,
      "milk":milk,
      "snf":snf,
      "fat":fat,
      "good":good,
      "rate":rate,
      "totalRate":totalRate,
      "UId":sessionStorage.getItem('UId')
    }
this._api.CheckDairyReg(temp).subscribe(result=>{
  this.entry=false
  this._api.FindOneDayTotal(temp).subscribe(res=>{
    this.hideOkay=false
    this.noData=false
    var temp:any=res
    this.TotalMilk=temp.TotalMilk
    this.Rate=temp.Rate
    this.TotalRate=temp.TotalRate
    this.ExtraMilk=(this.TotalMilk-milk).toFixed(2)
    this.ExtraTotalRate=(this.TotalRate-totalRate).toFixed(2)
    this.ExtraRate=(this.Rate-rate).toFixed(2)
    this.onRegRes=true
    this.RegisterForm.disable()
  },
  err=>{
    this.noData=true
    this.onClickReg=false

  });
},
  error=>{
    this.entry=true
    this.onClickReg=false
  })

    
  }


  onSave(){
    let date = this.RegisterForm.get('Date').value
    let etype = this.RegisterForm.get('Type').value
    let ehour = this.RegisterForm.get('Hour').value
    let milk = this.RegisterForm.get('Milk').value
    let snf = this.RegisterForm.get('SNF').value
    let fat = this.RegisterForm.get('Fat').value
    let good = this.RegisterForm.get('Good').value
    let rate = this.RegisterForm.get('Rate').value
    let totalRate = this.RegisterForm.get('totalRate').value
    let newdate=formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    let hour
    let type
    if(ehour=="Morning"){hour="सकाळ"}else{hour="संध्याकाळ"}
    if(etype=="Buffalow"){type="म्हैस"}else{type="गाय"}
    var temp:any={
      "date":newdate,
      "type":type,
      "etype":etype,
      "ehours":ehour,
      "hours":hour,
      "milk":milk,
      "snf":snf,
      "fat":fat,
      "good":good,
      "rate":rate,
      "totalRate":totalRate,
      "dairyMilk":this.TotalMilk,
      "dairyTotalRate":this.TotalRate,
      "dairyRate":this.Rate,
      "extraMilk":this.ExtraMilk,
      "extraTotalRate":this.ExtraTotalRate,
      "extraRate":this.ExtraRate,
      "UId":sessionStorage.getItem('UId')
    }
    if(sessionStorage.getItem("UId")){
      this._api.PostDairyReg(temp).subscribe(res=>{
        console.log(res);
        this.onCancel()
      },err=>{
        console.log(err);
        
      })
    }
    
    
  }

  onCancel(){
    this.onClickReg=false
    this.onRegRes=false
    this.hideOkay=true
    this.noData=false
    this.RegisterForm.enable()
    }
}
