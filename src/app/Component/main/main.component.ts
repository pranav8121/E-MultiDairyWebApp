import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // flags
  flag_1: any = true
  flag_2: any = true
  flag_3: any = true
  flag_4: any = true
  userValid: any = false
  details: any = false
  entryFlag: any = false
  inValid: any = false
  Ifcow: any = false
  Ifbuff: any = false
  isClicked:any=false


  // Variabels
  today: any
  timeMsg: any
  currentHour: any;
  engtimeMsg: any;
  tMilkBuff: any = "00"
  tMilkCow: any = "00"
  tmember: any = "00"
  dmem: any = "00"
  Cnum: any = 1
  Cname: any = "####"
  Ctype: any = "####"
  MCtype: any = "Cow"
  CPhone: any
  RateVal: any
  TotalVal: any
  milk: any
  fat: any
  snf: any
  rate: any
  t_rate: any
  currentDate: any
  time: any
  temp: any;
  cowFat: any
  bufFat: any
  cowSNF: any
  bufSNF: any
  cowtab: any
  buftab: any
  Members: any = [];
  DoneMem: any = [];
  temp_1: any;
  postErr: any;
    totalBuff: any
  totalCow: any
  totalMilk: any
  totalRate: any
  t_rateCow: any
  t_rateBuff: any


  entryForm: any = new FormGroup({
    'Milk': new FormControl(null, [Validators.required]),
    'Snf': new FormControl(null, [Validators.required]),
    'Fat': new FormControl(null, [Validators.required]),
  })
  err: any;
  error: any;
  





  constructor(private _api: ApiService, private _tab: MatrixService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.flag_1 = true
    this.OnLoad()
  }

  OnLoad() {
    this.getTodays()
    this.getallMem()
    this.serviceCall()
    this.CountCall()
    this.currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
  }


  getallMem() {
    sessionStorage.getItem('UId')
    this._api.getallMem().subscribe(res => {
      this.Members = res
      this.showMember(this.Cnum)
      this.flag_1 = false
      this.err=false
      this.tmember = this.Members.length
    }, err => {
      console.log(err);
      this.flag_1 = false
      this.err=true
      this.error="Slow Internet Connection Please Refresh Page"
      
    })
  }

  getTodays() {
    this.Time()
    this.currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
    this._api.getTodaysData(this.engtimeMsg,this.currentDate).subscribe(res => {
      this.DoneMem = res
      this.doneMemCheck(this.DoneMem)
      this.err=false
      this.EntryCheck(this.Cnum)
      // this.showMember(this.Cnum)
    }, err => {
      console.log(err);
      this.err=true
      this.error="Slow Internet Connection Please Refresh Page"
    })
  }

  serviceCall() {
    this.cowFat = this._tab.Cow_fatRate
    this.bufFat = this._tab.Buff_fatRate
    this.cowSNF = this._tab.Cow_snfRate
    this.bufSNF = this._tab.Buff_snfRate
    this.cowtab = this._tab.Cow_matrix
    this.buftab = this._tab.Buff_matrix
  }



  showMember(No: any) {
    this.Hidedetails()
    if (No) {
      this.temp = this.Members.find((ele: any) => ele.No == No)
      if(this.temp==undefined){
        this.userValid = true
      }
      else{
        this.EntryCheck(No)
        this.userValid = false
        this.Cname = this.temp.Name
        this.Cnum = this.temp.No
        this.Ctype = this.temp.type
        this.CPhone = this.temp.Phone
        this.null()
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
      

    }
  }

  EntryCheck(num: any) {
    this.temp_1 = this.DoneMem.find((res: any) => res.No == num)
    if (this.temp_1 == undefined) {
      this.entryFlag = false
    }
    else {
      this.milk=this.temp_1.milk
      this.fat=this.temp_1.fat
      this.snf=this.temp_1.snf
      this.t_rate=this.temp_1.t_rate
      this.rate=this.temp_1.rate
      this.entryFlag = true
    }
  }

  calcu() {
    let rate
    let t_rate
    let milk = parseFloat(this.entryForm.get('Milk').value)
    let snf = parseFloat(this.entryForm.get('Snf').value)
    let fat = parseFloat(this.entryForm.get('Fat').value)
    if (milk && snf && fat) {
      if (this.Ctype == "Buffalow") {
        let i = this.bufFat.indexOf(fat)
        let j = this.bufSNF.indexOf(snf)
        if (i == -1 || j == -1) {
          this.inValid = true
        }
        else {
          this.inValid = false
          rate = this.buftab[i][j] + 2
          let milk = parseFloat(this.entryForm.get('Milk').value)
          t_rate = rate * milk
          this.RateVal = rate.toFixed(2)
          this.TotalVal = t_rate.toFixed(2);
        }
      }
      else {
        let i = this.cowFat.indexOf(fat)
        let j = this.cowSNF.indexOf(snf)
        if (i == -1 || j == -1) {
          this.inValid = true
        }
        else {
          this.inValid = false
          rate = this.cowtab[i][j]
          let milk = parseFloat(this.entryForm.get('Milk').value)
          t_rate = rate * milk
          this.RateVal = rate.toFixed(2)
          this.TotalVal = t_rate.toFixed(2);
        }
      }
    }
  }

  Sub(search: any) {
    this.isClicked=true
    let temp = {
      Name: this.Cname,
      No: this.Cnum,
      date: this.currentDate,
      time: this.time,
      milk: this.entryForm.get('Milk').value,
      type: this.Ctype,
      fat: this.entryForm.get('Fat').value,
      snf: this.entryForm.get('Snf').value,
      rate: this.RateVal,
      t_rate: this.TotalVal,
      hours: this.timeMsg,
      ehours: this.engtimeMsg,
      Phone: this.CPhone,
      eng_hours: this.engtimeMsg,
      UId: sessionStorage.getItem('UId')
    }
    if (this.entryForm.valid && sessionStorage.getItem('UId')) {
      this._api.postToData(temp).subscribe(res => {
        // this.getTodays()
        this.temp=res
        this.entryFlag = true
        this.milk=this.temp.data.milk
        this.fat=this.temp.data.fat
        this.snf=this.temp.data.snf
        this.t_rate=this.temp.data.t_rate
        this.rate=this.temp.data.rate
        this.DoneMem.push(this.temp.data)
        this.doneMemCheck(this.DoneMem)
        this.isClicked=false
        search.focus()
        search.value = ""
      },
        err => {
          this.isClicked=false
          console.log("POST ERR", err);
          this.postErr="Slow Internet Connection,Data not Saved! Please Refresh Page"
          search.focus()
          search.value = ""
        }
      )
    }
  }

  doneMemCheck(doneData: any) {
    this.tMilkBuff = 0
    this.tMilkCow = 0
    this.totalBuff = 0
    this.totalCow = 0
    this.totalMilk = 0
    this.t_rateCow = 0
    this.t_rateBuff = 0
    var cRate = 0
    var bRate = 0
    doneData.forEach((ele: any) => {
      if (ele.type == 'Buffalow') {
        this.tMilkBuff = (this.tMilkBuff + parseFloat(ele.milk))
        this.totalBuff = this.tMilkBuff.toFixed(2)
        bRate = bRate + parseFloat(ele.t_rate)

      } else {
        this.tMilkCow = this.tMilkCow + parseFloat(ele.milk)
        this.totalCow = this.tMilkCow.toFixed(2)
        cRate = cRate + parseFloat(ele.t_rate)
      }

    });
    var tTmilk = parseFloat(this.totalBuff) + parseFloat(this.totalCow)
    this.t_rateCow = cRate.toFixed(2)
    this.t_rateBuff = bRate.toFixed(2)
    this.totalMilk=tTmilk.toFixed(2)
    var totalRate = cRate + bRate
    this.totalRate = totalRate.toFixed(2)
    this.dmem = doneData.length

  }



  Showdetails() {
    this.details = true
    this._tab.Cname = this.Cname
    this._tab.Ctype = this.Ctype
    this._tab.Cnum=this.Cnum

  }
  Hidedetails() {
    this.details = false
  }



  Time() {
    this.currentHour = moment().format("HH");    
    if (this.currentHour >= 1 && this.currentHour < 15) {
      this.timeMsg = "  सकाळ  ";
      this.engtimeMsg = "Morning"
    } else {
      this.timeMsg = "   संध्याकाळ  ";
      this.engtimeMsg = "Evening"
    }
  }

  CountCall() {
    setInterval(() => {
      this.time = moment().format('LT')
    }, 1000
    )

    setInterval(() => {
      this.Time()
    }, 60000
    )
  }

  null() {
    this.entryForm.get('Milk').setValue('')
    this.entryForm.get('Snf').setValue('')
    this.entryForm.get('Fat').setValue('')
    this.entryForm.get('Milk').setValue('')
    this.TotalVal = ""
    this.RateVal = ""
  }
}