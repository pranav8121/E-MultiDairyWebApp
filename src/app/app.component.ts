import { Component,HostListener } from '@angular/core';
import {AutoLogoutService} from '../app/Service/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  constructor(private autologoutService: AutoLogoutService ) {
    this.initInactivityListener();
    
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onUserActivity(event: Event) {
    this.autologoutService.resetInactivityTimer();
  }

  initInactivityListener() {
    this.autologoutService.startInactivityTimer();
  }
}
