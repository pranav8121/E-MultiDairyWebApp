import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  header: any = ["Date", "Hour", "Type", "Milk", "Fat", "Snf", "Rate", "Total Rate", "Good", "DMilk", "DRate", "DTotalRate", "Extra Milk", "Extra Rate", "Extra Total Rate"]
  flag_1: any
  flag_2: any
  getErr: any = false
  order: string = "date"
  p: number = 1
  Data: any = [];
  @ViewChild('tabledata', { static: false }) tabledata: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.flag_1 = true
    this.flag_2 = true
    this.getData()
  }
  getData() {
    this.flag_2 = true
    this._api.GetDairyReg().subscribe(res => {
      this.Data = res    
      // console.log(this.Data);
      this.Data.forEach((element:any) => {
        if(element.extraMilk < 0){
          element.lessMilk = element.extraMilk;
          element.extraMilk = "-"
// console.log(element);
        }else{
          element.lessMilk="-"
        }
      });
      
      this.flag_2 = false
      this.flag_1 = false
      this.getErr = false
    }, err => {
      this.flag_1 = false
      this.flag_2 = false
      this.getErr = true
    })
  }
  OnHistory() {

    this.getData()
  }
  export() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.tabledata.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'डेअरी रजिस्टर.xlsx');
  }
}
