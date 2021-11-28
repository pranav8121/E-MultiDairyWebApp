import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-addmem',
  templateUrl: './addmem.component.html',
  styleUrls: ['./addmem.component.css']
})
export class AddmemComponent implements OnInit {
  flag_1: any = true
  temp: any;
  getErr:any=false
  AddMemberForm: any = new FormGroup({
    'Mname': new FormControl(null, [Validators.required]),
    'Ename': new FormControl(null, [Validators.required]),
    'Number': new FormControl(null, [Validators.required]),
    'Phone': new FormControl(null),
    'type': new FormControl('Buffalow', [Validators.required]),
  })
  onClickOkay: any = false
  length: any;
  InitialForm: any;
  exist: any=false
  existMsg: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.getMembers()
    this.InitialForm=this.AddMemberForm.value
  }

  getMembers() {
    this._api.getallMem().subscribe(res => {
      this.temp = res
      this.flag_1 = false
      this.getErr=false
    }, err => {
      this.flag_1 = false
      this.getErr=true
    })
  }
  addMem() {
    this.onClickOkay=true
    var mName = this.AddMemberForm.get('Mname').value
    var eName = this.AddMemberForm.get('Ename').value
    var num = this.AddMemberForm.get('Number').value
    var phone = this.AddMemberForm.get('Phone').value
    var type = this.AddMemberForm.get('type').value
if(this.checkExist(num)){
  this.exist=false
  var temp = {
    Name: mName,
    engName: eName,
    No: num,
    type: type,
    Phone: phone
  }
this._api.postToMem(temp).subscribe(res=>{
this.onClickOkay=false
this.temp.push(temp)

this.AddMemberForm.reset(this.InitialForm)
},err=>{
this.onClickOkay=false
})
}
else{
  this.existMsg=`*${num} क्रमांक अस्तित्वात आहे!!`
  this.onClickOkay=false
  this.exist=true
}
  }


  checkExist(num:any){
   var exist= this.temp.find((res: any) => res.No == num)   
   if(exist){
     return false
   }
   else{
     return true
   }
  }
}
