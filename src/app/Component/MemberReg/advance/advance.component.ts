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
    'Amount': new FormControl(0, [Validators.required]),
  })


  // Flags
  onload: any = false
  err: any;
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {

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
    
    var amount = this.detailsForm.get('Amount').value
    var temp: any
    if(amount>0){
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
    }, err => {
      this.null()
      console.log(err);
    })  
    }
    else{
      this.err="*Please Enter Valid Amount"
      
    }


  }
  null() {
    this.detailsForm.controls['Amount'].setValue("");
  }
  checkBal(data: any) {
    var add = 0
    var cut = 0
    data.forEach((ele: any) => {
      if (ele.addAmount) { add = add + parseFloat(ele.addAmount) }
      if (ele.cutAmount) { cut = cut + parseFloat(ele.cutAmount) }
    });
    console.log("add", add, "cut", cut);
    this.balance = add - cut
  }

}