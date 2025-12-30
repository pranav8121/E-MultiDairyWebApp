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
  tabs: any[] = [];
  filteredData: any[]=[];
  monthlyTabs: Date[]=[];
  @ViewChild('tabledata', { static: false }) tabledata: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.flag_1 = true
    this.flag_2 = true
    this.getData();
   
  }
  getData() {
    this.flag_2 = true
    this._api.GetDairyReg().subscribe(res => {
      this.Data = res    
      console.log(this.Data);

// const startDate = new Date("01/01/2023");
//     const endDate = new Date("12/31/2023");
//     const filteredData = this.Data.filter((item:any) => {
//       const itemDateParts = item.date.split('/');
//       const itemDate = new Date(
//         +itemDateParts[2], // year
//         +itemDateParts[1] - 1, // month (JavaScript months are 0-based)
//         +itemDateParts[0] // day
//       );
//       return itemDate >= startDate && itemDate <= endDate;
//     });
this.Data =this.filteredData;
console.log(this.filteredData,this.Data );

      this.filteredData = this.filterDataByDateRange(
        this.Data, new Date("01/01/2023"), new Date("12/31/2023")
      );
 // Generate monthly tabs
 this.monthlyTabs = this.generateMonthlyTabs(
  new Date("01/01/2023"), new Date("12/31/2023")
);
console.log(this.filteredData,this.monthlyTabs);


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
      this.getErr = false;
      // this.generateTabs();
    }, err => {
      this.flag_1 = false
      this.flag_2 = false
      this.getErr = true
    })
  }

  // generateTabs(): void {
  //   const daysInMonth = 30; // Change this based on the actual number of days in the month

  //   const recordsPerPage = 10;
  //   const totalTabs = Math.ceil(this.Data.length / recordsPerPage);

  //   for (let i = 1; i <= totalTabs; i++) {
  //     const startIdx = (i - 1) * recordsPerPage;
  //     const endIdx = i === totalTabs ? this.Data.length : i * recordsPerPage;
  //     const tabData = this.Data.slice(startIdx, endIdx);

  //     const tab = {
  //       label: `Tab ${i}`,
  //       data: tabData
  //     };

  //     this.tabs.push(tab);
  //     console.log(this.tabs);
      
  //   }
  // }


  filterDataByDateRange(data: any[], startDate: Date, endDate: Date): any[] {
    console.log(data,startDate,endDate);
     const filteredData = data.filter((item:any) => {
      const itemDateParts = item.date.split('/');
      const itemDate = new Date(
        +itemDateParts[2], // year
        +itemDateParts[1] - 1, // month (JavaScript months are 0-based)
        +itemDateParts[0] // day
      );
      return itemDate >= startDate && itemDate <= endDate;
    });
    
    // const filteredData = data.filter((item) => {
    //   const itemDate = new Date(item.date);
    //   return itemDate >= startDate && itemDate <= endDate;
    // });
    console.log(filteredData);
    return filteredData;
    
    
  }

  generateMonthlyTabs(startDate: Date, endDate: Date): Date[] {
    const tabs: Date[] = [];
    let currentMonth = startDate.getMonth();
    let currentDate = startDate;

    while (currentDate <= endDate) {
      tabs.push(new Date(currentDate));
      currentDate.setMonth(currentMonth + 1);
      currentMonth = currentDate.getMonth();
    }

    return tabs;
  }
  
    // You can add a method to update the displayed records based on the selected tab
    updateRecords(selectedTab: Date): void {
  
      
      // Example: Filter data for the selected month
      const startOfMonth = new Date(selectedTab);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      console.log(selectedTab,startOfMonth,endOfMonth,this.Data);
      // Example: Update filtered data for the selected month
      this.filteredData = this.filterDataByDateRange(
        this.Data,
        startOfMonth,
        endOfMonth
      );
      this.Data= this.filteredData;
      console.log(this.Data);
      
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
