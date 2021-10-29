import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  header: any = ["Date", "Hour", "Type", "Milk", "Fat", "Snf", "Rate", "Total Rate", "Good", "DMilk", "DRate", "DTotalRate", "Extra Milk", "Extra Rate", "Extra Total Rate"]
  flag_1: any
  order: string = "date"
  Data:any=[];
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.flag_1 = true
    this.getData()
  }
  getData() {
    this._api.GetDairyReg().subscribe(res => {
      this.Data=res
      this.flag_1 = false
    }, err => { console.log(err); })
  }
  OnHistory(){
    console.log("Called");
    
    this.getData()
  }
}
