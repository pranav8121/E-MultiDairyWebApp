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
Cname: any;
detailsForm: any = new FormGroup({
  'Amount': new FormControl(0, [Validators.required]),
})


  // Flags
  onload:any=false
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
  
    this.getServData()
  }

  getServData() {
    this.Cnum = this._serv.Cnum
    this.Cname = this._serv.Cname
  }

  Api() {
    var temp = {
      UId: sessionStorage.getItem("UId"),
      No: this.Cnum,
      type: "Advance",
    }
    this._api.GetSupply(temp).subscribe(res => {
      this.data=res
      this.onload = true
     }, err => {
      this.onload = true
      console.log(err);
      })
  }

  postData() {
    var amount = this.detailsForm.get('Amount').value
    var temp:any
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
 }, err => {
  
  console.log(err);
  })

  }
}
