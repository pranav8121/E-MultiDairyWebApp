import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local URL
//  baseUrl=`http://localhost:3000`

// LIVE URL
baseUrl='http://e-multidairybackend.herokuapp.com'

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

getTodaysData(ehours:any){

  return this.http.get(`${this.baseUrl}/GetTodayData/${this.UId}/${ehours}`)
}

}
