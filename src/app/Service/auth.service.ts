// auth.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";

@Injectable({
    providedIn: "root",
  })
  export class AutoLogoutService {
    private readonly inactivityTimeout = 15 * 60 * 1000; // 15 minutes in milliseconds
    private inactivityTimer: any;
  
    constructor(private route: Router,private router: ActivatedRoute) { }
  
    startInactivityTimer() {
      this.inactivityTimer = setTimeout(() => {
        let urlroute = this.getCurrentRoute();
        if (urlroute == "/" || urlroute == "/MemberLogin") {
        } else if (urlroute === "/Advertisement") {
          this.memberlogout();
        } else {
          this.adminlogout();
        }
      }, this.inactivityTimeout);
    }
  
    resetInactivityTimer() {
      clearTimeout(this.inactivityTimer);
      this.startInactivityTimer();
    }
  
    getCurrentRoute(): string {
      return this.route.url;
    }
  
    adminlogout() {
      sessionStorage.setItem("logoutByTimeout", "logoutByTimeout");
      this.route.navigate(["/"]);
     
    }
  
    memberlogout() {
      this.route.navigate(["MemberLogin"]);
     
    }
  }