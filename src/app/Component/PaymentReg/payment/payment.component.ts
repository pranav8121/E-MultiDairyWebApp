import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
parentData:any=[
  {from:"12/12/12",to:"12/12/12",totalMilk:"20",totalRate:"20200",totalCutting:"2000",subTotal:"202020"},
  {from:"12/12/12",to:"12/12/12",totalMilk:"20",totalRate:"20200",totalCutting:"2000",subTotal:"202020"},
  {from:"12/12/12",to:"12/12/12",totalMilk:"20",totalRate:"20200",totalCutting:"2000",subTotal:"202020"},
  {from:"12/12/12",to:"12/12/12",totalMilk:"20",totalRate:"20200",totalCutting:"2000",subTotal:"202020"},
  {from:"12/12/12",to:"12/12/12",totalMilk:"20",totalRate:"20200",totalCutting:"2000",subTotal:"202020"},
]

  constructor() { }

  ngOnInit(): void {
  }

}
