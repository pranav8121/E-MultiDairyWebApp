import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local URL
 baseUrl=`http://localhost:3000`
// LIVE URL
// baseUrl='https://e-multidairybackend.herokuapp.com'

  UId=sessionStorage.getItem('UId')


  constructor(private http:HttpClient) { }
  
LoginAuth(username:any,password:any){
return this.http.get(`${this.baseUrl}/getCred/${username}/${password}`)
}

ShowMem(Uid:any,No:any){              
  return this.http.get(`${this.baseUrl}/getOneMem/${Uid}/${No}`)
}

getallMem(){
  return this.http.get(`${this.baseUrl}/getallMem/${this.UId}`)
}

postToData(data:any){
  return this.http.post(`${this.baseUrl}/addDataDB`,data) 
}

getMemdetails(No:any){
return this.http.get(`${this.baseUrl}/getalldata/${this.UId}/${No}`)
}

getTodaysData(ehours:any,date:any){
date=encodeURIComponent(date)
  return this.http.get(`${this.baseUrl}/GetTodayData/${this.UId}/${ehours}/${date}`)
}

getBillData(No:any,from:any,to:any){
  from=encodeURIComponent(from)
  to=encodeURIComponent(to)
  return this.http.get(`${this.baseUrl}/GetBillData/${this.UId}/${No}/${from}/${to}`)
}
postBill(data:any){
  return this.http.post(`${this.baseUrl}/postBill`,data)
}

FindBill(inv_no:any,No:any){
  inv_no=encodeURIComponent(inv_no)
  return this.http.get(`${this.baseUrl}/findBill/${this.UId}/${inv_no}/${No}`)
}

GetSupply(data:any){
  return this.http.post(`${this.baseUrl}/GetEntry`,data)
}
PostSupply(data:any){
  return this.http.post(`${this.baseUrl}/postEntry`,data)
}

}
