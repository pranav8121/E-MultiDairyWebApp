import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { MatrixService } from 'src/app/Service/matrix.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any
  Cname: any
  Ctype: any
  valid: any
  err: any;
  Cnum: any;
  onload:any=false
  constructor(private _serv: MatrixService, private _api: ApiService) { }

  ngOnInit(): void {
    this.Cname = this._serv.Cname
    this.Ctype = this._serv.Ctype
    this.Cnum=this._serv.Cnum
    this.Api()
    
  }
  Api() {
    this._api.getMemdetails(this.Cnum).subscribe(res => {
      this.data = res
      this.valid = true
      this.onload=true
    },
      err => {
        console.log("DETAILS ERR", err);
        this.err = err.error
        this.valid = false
        this.onload=true
      })
  }

}
