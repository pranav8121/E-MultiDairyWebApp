import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
//  Boolean
  onload:any=false

  // variable
data:any=[]
  constructor() { }

  ngOnInit(): void {
    this.onload=true
  }

}
