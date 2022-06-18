import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import * as xlsx from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-paydetail',
  templateUrl: './paydetail.component.html',
  styleUrls: ['./paydetail.component.css']
})
export class PaydetailComponent implements OnInit {
from:any
to:any
  data: any;
  order:any="No"
  flag_1:any=false
  err: any;
  hideErr:any
  mainData:any
  @ViewChild('tabledata', { static: false }) tabledata: any;
  dairyName: any;
  constructor(private _Activatedroute:ActivatedRoute,private _api:ApiService,private router:Router) { }
  ngOnInit(): void {
    this.getData();
    this.dairyName=sessionStorage.getItem('Name') 
  }
  getData(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    let data:any=this._Activatedroute.snapshot.paramMap.get("data")
    this.from=decodeURIComponent(f)
    this.to=decodeURIComponent(t)
    this.mainData=JSON.parse(decodeURIComponent(data)) 
    console.log(this.mainData)
    this._api.FindPaymentReg(this.from,this.to).subscribe(res=>{
      this.data=res
      this.flag_1=true
      this.hideErr=true
      
    },err=>{
      this.flag_1=true
      this.hideErr=false
      this.err="*Something Wrong Please Refresh!!"
    })
  }


  export(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.tabledata.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, `पेमेंट रजिस्टर${this.from}-${ this.to}.xlsx`);
  }

  goBack(){
    this.router.navigate([`/Payment`]);
  }
  generatePDF(action = 'open') {
    
    let docDefinition:any = {
      content: [

                 {
            text:this.dairyName,
            fontSize: 12,
            alignment: 'center',
            color: 'brown'
          },
        {
          table: {
            headerRows: 1,
            widths: ['auto','auto', '*','*','*', 'auto', 'auto'],
            body: [
              [{text: 'SN', bold: true},{text: 'Name', bold: true},{text: 'Mor', bold: true}, {text: 'Eve', bold: true},{text: 'Milk', bold: true},{text: 'Rate', bold: true},{text: 'Advace', bold: true}],
               ...this.data.map((p:any) => ([p.No,p.Name, p.totalmilk, p.mortotalRate,p.evetotalRate,p.totalRate,p.adv])),
              // [{ text: '', colSpan: 4 },{}, {}, {},{text: 'Amount',colSpan: 2},{}, this.base_amount],
              // [{ text: ``, colSpan: 4 },{}, {}, {},{text: `CGST ${this.invoice.cgst} %`,colSpan: 2},{}, this.cgst_amount],
             
            ]
           
          }
        },
       
      
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 12,
          margin: [0, 10, 0, 10]
        },
        space: {
          // bold: true,
          // decoration: 'underline',
          // fontSize: 14,
          margin: [0, 10, 0, 10]
        }
      },
      
    };



    if (action === 'download') {
     
      pdfMake.createPdf(docDefinition).download();
    } 
    // else if (action === 'print') {
    //   pdfMake.createPdf(docDefinition).print();
    // } else {
    //   pdfMake.createPdf(docDefinition).open();
    // }

  }

}
