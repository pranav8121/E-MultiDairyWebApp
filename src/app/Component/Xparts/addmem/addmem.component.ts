import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-addmem',
  templateUrl: './addmem.component.html',
  styleUrls: ['./addmem.component.css']
})
export class AddmemComponent implements OnInit {
  flag_1:any=true
  temp: any;
  AddMemberForm: any = new FormGroup({
    'Mname': new FormControl(null, [Validators.required]),
    'Ename': new FormControl(null, [Validators.required]),
    'Phone': new FormControl(null, [Validators.required]),
    'type': new FormControl(null, [Validators.required]),
  })
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.getMembers()
  }

  getMembers(){
    this._api.getallMem().subscribe(res=>{
      this.temp=res
      console.log("res length",this.temp.length,"res",this.temp);
      this.flag_1=false
    },err=>{
      console.log(err);
      
    })
  }
}
