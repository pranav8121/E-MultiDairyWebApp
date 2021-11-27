import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  //  Boolean
  onload: any = false

  // variable
  order:any="date"
  data: any = []
  balance: any = 0
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  Cnum: any;
  Cname: any;
  detailsForm: any = new FormGroup({
    'Amount': new FormControl({value:1060,disabled:true}, [Validators.required]),
    'Rate': new FormControl(1060, [Validators.required]),
    'bags': new FormControl("", [Validators.required]),
    'Date': new FormControl(this.currentDate, [Validators.required]),
    'SupType':new FormControl("सुग्रास",[Validators.required]),
  })
  val: any;
  isClicked:any=false
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
      type: "supply",
    }
    this._api.GetSupply(temp).subscribe(res => {
      this.data = res
      this.onload = true
      this.checkBal(this.data)
    }, err => {
      this.onload = true
      console.log(err);
    })
  }

  calcu() {
    var rate = this.detailsForm.get('Rate').value
    var bag = this.detailsForm.get('bags').value
    var amount
    if (rate && bag) {
      this.val=false
      amount = rate * bag
      this.detailsForm.controls['Amount'].setValue(amount);
    }
    else{
      this.val=true
    }
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

  postData() {
   this.isClicked=true
   let date = this.detailsForm.get('Date').value
    var rate = this.detailsForm.get('Rate').value
    var bag = this.detailsForm.get('bags').value
    var amount = this.detailsForm.get('Amount').value
    var supType=this.detailsForm.get('SupType').value
    var temp: any;
    
    let newdate=formatDate(new Date(date), 'dd/MM/YYYY', 'en')
    if(rate && bag && amount){
    temp = {
      Name: this.Cname,
      No: this.Cnum,
      type: "supply",
      date: newdate,
      addAmount: amount,
      rate: rate,
      bag: bag,
      supType:supType,
      UId: sessionStorage.getItem("UId")
    }
    this._api.PostSupply(temp).subscribe(res => {
      this.data.push(temp)
      this.null()
      this.checkBal(this.data)
      this.isClicked=false
      this.detailsForm.controls['bags'].setValue("");
    }, err => {
      this.null()
      console.log(err);
      this.isClicked=false
      this.detailsForm.controls['bags'].setValue("");
    })
    }
    else{
console.log("errr");

    }
  }


  null() {
    this.detailsForm.controls['Amount'].setValue(1060);
    this.detailsForm.controls['Rate'].setValue(1060);
    this.detailsForm.controls['bags'].setValue(1);
  }
}
