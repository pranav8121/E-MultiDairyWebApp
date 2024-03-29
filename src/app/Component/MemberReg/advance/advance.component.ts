import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {
  // vari
  data: any = []
  currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
  Cnum: any;
  balance: any = 0
  Cname: any;
  detailsForm: any = new FormGroup({
    'Amount': new FormControl(null, [Validators.required]),
  })


  // Flags
  onload: any = false
  err: any;
  isClicked:any=false;
  userAuth: any;
  showtoAdmin: boolean=true;
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
    this.userAuth = sessionStorage.getItem('auth');
    if(this.userAuth =="Member"){
    console.log(this.userAuth);
this.showtoAdmin=false;
    }
    this.getServData()
  }

  getServData() {
    this.Cnum = this._serv.Cnum
    this.Cname = this._serv.Cname
    this.Api()
  }

  Api() {
    var temp = {
      UId: sessionStorage.getItem("UId"),
      No: this.Cnum,
      type: "advance",
    }
    this._api.GetSupply(temp).subscribe(res => {
      this.data = res
      this.checkBal(this.data)
      this.onload = true
    }, err => {
      this.onload = true
      console.log(err);
    })
  }

  postData() {
    this.isClicked=true
    var amount = this.detailsForm.get('Amount').value
    var temp: any
    if(amount){
      this.err=""
        temp = {
      Name: this.Cname,
      No: this.Cnum,
      type: "advance",
      date: this.currentDate,
      addAmount: amount,
      UId: sessionStorage.getItem("UId")
    }
    this._api.PostSupply(temp).subscribe(res => {
      this.data.push(temp)
      this.null()
      this.checkBal(this.data)
      this.isClicked=false
    }, err => {
      this.null() 
      console.log(err);
      this.isClicked=false
    })  
    }
    else{
      this.err="*Please Enter Valid Amount"
      this.isClicked=false
    }


  }
  null() {
    this.detailsForm.controls['Amount'].setValue(null);
  }
  checkBal(data: any) {
    var add = 0
    var cut = 0
    data.forEach((ele: any) => {
      if (ele.addAmount) { add = add + parseFloat(ele.addAmount) }
      if (ele.cutAmount) { cut = cut + parseFloat(ele.cutAmount) }
    });
    this.balance = add - cut
  }

}
