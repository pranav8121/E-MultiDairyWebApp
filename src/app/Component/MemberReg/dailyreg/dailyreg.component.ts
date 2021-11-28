import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/Service/api.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-dailyreg',
  templateUrl: './dailyreg.component.html',
  styleUrls: ['./dailyreg.component.css']
})
export class DailyregComponent implements OnInit {
  flag: any = false
  currentDate: any
  engtimeMsg: any
  currentHour: any;
  err: any;
  dataEmp: any;
  data: any;
  timeMsg: any;
  order: any = "No"
  Name: any = sessionStorage.getItem('Name')
  totalCowMilk: any = 0;
  totalCowRate: any = 0;
  totalBuffMilk: any = 0;
  totalBuffRate: any = 0;
  totalMilk: any;
  totalRate: any;
  @ViewChild('print_A4', { static: false }) print_A4: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.flag = false
    this.getDate()
    this.getTodaysData()
  }
  getTodaysData() {
    this._api.getTodaysData(this.engtimeMsg, this.currentDate).subscribe(res => {
      this.err = false
      this.setData(res)
      this.flag = true
    }, err => {
      this.err = true
      this.flag = true
    })
  }
  getDate() {
    this.currentDate = formatDate(new Date(), 'dd/MM/YYYY', 'en')
    this.currentHour = moment().format("HH");
    if (this.currentHour >= 1 && this.currentHour < 15) {
      this.engtimeMsg = "Morning";
      this.timeMsg = "सकाळ";
    } else {
      this.engtimeMsg = "Evening";
      this.timeMsg = "संध्याकाळ";

    }
  }
  setData(res: any) {
    if (res.length < 1) {
      this.dataEmp = true
    }
    else {
      this.dataEmp = false
      this.data = res
     this.Calcu(this.data)
    }
  }
  Calcu(data: any) {
    this.totalCowMilk = 0
    this.totalCowRate = 0
    this.totalBuffMilk = 0
    this.totalBuffRate = 0
    data.forEach((ele: any) => {
      if (ele.type == "Cow") {
        this.totalCowMilk = parseFloat(this.totalCowMilk) + parseFloat(ele.milk)
        this.totalCowRate = parseFloat(this.totalCowRate) + parseFloat(ele.t_rate)
      }
      else {
        this.totalBuffMilk = parseFloat(this.totalBuffMilk) + parseFloat(ele.milk)
        this.totalBuffRate = parseFloat(this.totalBuffRate) + parseFloat(ele.t_rate)
      }


    });
    var temp1 = this.totalBuffMilk.toFixed(2)
    var temp2 = this.totalBuffRate.toFixed(2)
    var temp3 = this.totalCowMilk.toFixed(2)
    var temp4 = this.totalCowRate.toFixed(2)
    this.totalBuffMilk=temp1
    this.totalBuffRate=temp2
    this.totalCowMilk=temp3
    this.totalCowRate=temp4
    
    this.totalMilk = parseFloat(temp1)+parseFloat(temp3)
    this.totalRate = parseFloat(temp2)+parseFloat(temp4)
    var temp5=this.totalMilk.toFixed(2)
    this.totalMilk=temp5
    var temp6=this.totalRate.toFixed(2)
    this.totalRate=temp6
  }
  print() {
    var table_1 = document.getElementById("printSection")?.innerHTML
    var table_2 = document.getElementById("printSection2")?.innerHTML
    var a: any = window.open('', '', 'height=500, width=900');
    a.document.write('<html>');
    a.document.write('<body >');
    a.document.write(`<h4 style="text-align:center;">${this.Name}</h4>`)
    a.document.write('<hr/>')
    a.document.write(`<p style="text-align:center;">${this.currentDate}-${this.timeMsg}</p>`);
    a.document.write('<hr/>')
    a.document.write(table_1)
    a.document.write('<hr/>')
    a.document.write(table_2)
    a.document.write('<hr/>')
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }

  printA4(){
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.print_A4.nativeElement);
    console.log(this.print_A4.nativeElement);
    
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, `दैनिक रजिस्टर`);
    xlsx.writeFile(wb, `दैनिक रजिस्टर${this.currentDate}_${ this.timeMsg}.xlsx`);
  }
}
