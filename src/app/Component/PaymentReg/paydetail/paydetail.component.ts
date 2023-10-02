import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import * as xlsx from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
// import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  pdfdata: any;
  modifiedMainData: any;
  constructor(private _Activatedroute:ActivatedRoute,private _api:ApiService,private router:Router) { }
  ngOnInit(): void {
    this.getData();
    this.dairyName=sessionStorage.getItem('Name') 
    let num = 1234567890

console.log(num.toLocaleString("hi-u-nu-latn"),num.toLocaleString("hi-u-nu-deva"));




  }
  getData(){
    let f:any=this._Activatedroute.snapshot.paramMap.get("from")
    
    
    let t:any=this._Activatedroute.snapshot.paramMap.get("to")
    console.log(typeof f,t);
    let data:any=this._Activatedroute.snapshot.paramMap.get("data")
    this.from=decodeURIComponent(f)
    this.to=decodeURIComponent(t)
    console.log(typeof this.from,this.to);
    this.mainData=JSON.parse(decodeURIComponent(data)) 
    console.log(this.mainData)
    this._api.FindPaymentReg(this.from,this.to).subscribe(res=>{
      this.data=res
      console.log(this.data);
      this.data.forEach((ele:any) => {
        ele.blank=""
        
      });
      this.pdfdata=this.data
      this.modifiedMainData = {
        "No": parseFloat(`${this.data.length}`),
        "Name":"",
        "morTotalmilk": parseFloat(`${this.mainData.morTotalmilk}`),
        "mortotalRate" : parseFloat(`${this.mainData.mortotalRate}`),
        "eveTotalmilk" : parseFloat(`${this.mainData.eveTotalmilk}`),
        "evetotalRate" :parseFloat (`${this.mainData.evetotalRate}`),
        "totalmilk":parseFloat(`${this.mainData.totalmilk}`),
        "totalRate":parseFloat(`${this.mainData.totalRate}`),
        "adv":parseFloat(`${this.mainData.adv}`),
        "bank" :parseFloat(`${this.mainData.bank}`),
        "supply":parseFloat(`${this.mainData.supply}`),
        "cutting":parseFloat(`${this.mainData.cutting}`),
        "subAmount":parseFloat(`${this.mainData.subAmount}`),
        "blank":""
      }

      this.pdfdata.push(this.modifiedMainData)
       console.log(this.pdfdata);
      // this.data.push({'blank':""})
      console.log(this.data,this.to);
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
      // pageSize: 'A3',

  // by default we use portrait, you can change it to landscape if you wish
  // pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ 10, 10, 10, 10 ],
      content: [
                 {
            // text: `${this.dairyName} (${this.from} - ${this.to})`,
            text: `${this.dairyName} (${this.from} - ${'30/04/2023'})`,
            fontSize:12,
            // font:'Segoe', 
            alignment: 'center',
            color: 'brown'
          },
        {
          table: {
            style: 'tableExample',
            headerRows: 1,
            // fontSize: 5,
            //  bold: true,
            widths: ['auto',90,'auto','auto', 'auto','auto','auto', 'auto', 'auto','auto','auto'],
            body: [
              [{text: 'क्र', bold: true},{text: 'सभासदाचे नाव', bold: true},{text: 'सकाळ(लि/रु)', bold: true},{text: 'संध्या(लि/रु)', bold: true} ,{text: 'ए दूध(लि/रु)', bold: true},{text: 'ऍड(रु)', bold: true},{text: 'भरणा(रु)', bold: true},{text: 'खाद्य(रु)', bold: true},{text: 'कपात(रु)', bold: true},{text: 'रक्कम(रु)', bold: true},{text: 'मिळाले', bold: true}],
              //{text: 'भरणा(रु.)', bold: true},{text: 'खाद्य(रु.)', bold: true},{text: 'ए कपात(रु.)', bold: true},{text: 'देय रक्कम(रु.)', bold: true},{text: 'मिळाले', bold: true}
               ...this.pdfdata.map((p:any) => ([(p.No).toLocaleString("hi-u-nu-deva"),p.Name,(p.morTotalmilk).toLocaleString("hi-u-nu-deva") +"/"+ (p.mortotalRate).toLocaleString("hi-u-nu-deva") ,p.eveTotalmilk.toLocaleString("hi-u-nu-deva") +"/"+  p.evetotalRate.toLocaleString("hi-u-nu-deva") , p.totalmilk.toLocaleString("hi-u-nu-deva") +"/"+ p.totalRate.toLocaleString("hi-u-nu-deva"),p.adv.toLocaleString("hi-u-nu-deva"),p.bank.toLocaleString("hi-u-nu-deva"),p.supply.toLocaleString("hi-u-nu-deva"),p.cutting.toLocaleString("hi-u-nu-deva"),p.subAmount.toLocaleString("hi-u-nu-deva"),p.blank])),//,p.bank,p.supply,p.cutting,p.subAmount
              // [{ text: '', colSpan: 4 },{}, {}, {},{text: 'Amount',colSpan: 2},{}, this.base_amount],
              // [{ text: ``, colSpan: 4 },{}, {}, {},{text: `CGST ${this.invoice.cgst} %`,colSpan: 2},{}, this.cgst_amount],
              // p.Name, ,{text: 'सभासदाचे नाव', bold: true,width:'50px'} {text: 'संध्या(लि./रु.)', bold: true}
            ]
           
          }
        },
     
      ],
      styles: {
        defaultStyle:{
          // font:'Segoe', 
          // fontWeight:200,
          fontSize:5
        },
        // font:'Segoe',
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 10,
          margin: [0, 2, 0, 2]
        },
        space: {
          // bold: true,
          // decoration: 'underline',
          // fontSize: 14,
          margin: [0, 2, 0, 2]
        },
        tableExample: {
          fontSize: 8,
      
      },
      },
      
    };



    if (action === 'download') {
     const fonts ={
      Roboto: {
        
        fontSize:8,
        // normal: 'http://localhost:4200/assets/font/SakalBharati Normal.ttf',
        normal: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        bold: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        italics: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        bolditalics: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
  
      },
      Segoe: {
        
        fontSize:8,
        // normal: 'http://localhost:4200/assets/font/SakalBharati Normal.ttf',
        normal: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        bold: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        italics: 'http://localhost:4200/assets/font/Akshar Unicode.ttf',
        bolditalics: 'http://localhost:4200/assets/font/Akshar Unicode.ttf'
      },
     }
      pdfMake.createPdf(docDefinition,undefined, fonts).download();
    } 
    // else if (action === 'print') {
    //   pdfMake.createPdf(docDefinition).print();
    // } else {
    //   pdfMake.createPdf(docDefinition).open();
    // }

  }

}
