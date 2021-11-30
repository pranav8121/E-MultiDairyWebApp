import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  timeMsg: any;
  currentHour: any;
  time: any
  Name: any = "#######"
  navbaropen: any = false

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.getData()

    setInterval(() => {
      this.Time()
    }, 1000)
  }

  getData() {
    this.Name = sessionStorage.getItem("Name")
    this.Time()
  }


  Time() {
    this.currentHour = moment().format("HH");
    if (this.currentHour >= 3 && this.currentHour < 15) {
      this.timeMsg = "  सकाळ  ";
      // सकाळ-आणि-संध्याकाळ
    } else {
      this.timeMsg = "   संध्याकाळ  ";
    }
  }


  logout() {
    if (confirm("Do you want to logout?")) {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("Name")
      sessionStorage.removeItem("UId")
      sessionStorage.removeItem("multi")
      this.router.navigate(["/"])
    }
  }
  navbarToggel() {
    this.navbaropen = !this.navbaropen
  }
}
