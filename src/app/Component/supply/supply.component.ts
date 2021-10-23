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
  data: any = []
  balance: any = 0
  currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
  Cnum: any;
  Cname: any;
  detailsForm: any = new FormGroup({
    'Amount': new FormControl(0, [Validators.required]),
    'Rate': new FormControl(0, [Validators.required]),
    'bags': new FormControl(0, [Validators.required]),
  })
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
    this.getServData()
  }

  getServData() {
    this.Cnum = this._serv.Cnum
    this.Cname = this._serv.Cname
    this.detailsForm.controls['Rate'].setValue(1000);
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
      amount = rate * bag
      this.detailsForm.controls['Amount'].setValue(amount);
    }
  }

  postData() {
    var rate = this.detailsForm.get('Rate').value
    var bag = this.detailsForm.get('bags').value
    var amount = this.detailsForm.get('Amount').value
    var temp: any
    temp = {
      Name: this.Cname,
      No: this.Cnum,
      type: "supply",
      date: this.currentDate,
      addAmount: amount,
      rate: rate,
      bag: bag,
      UId: sessionStorage.getItem("UId")
    }
    this._api.PostSupply(temp).subscribe(res => {
      this.data.push(temp)
      this.null()
    }, err => {
      this.null()
      console.log(err);
    })

  }
  null() {
    this.detailsForm.controls['Amount'].setValue("");
    this.detailsForm.controls['Rate'].setValue("");
    this.detailsForm.controls['bags'].setValue("");
  }
}
