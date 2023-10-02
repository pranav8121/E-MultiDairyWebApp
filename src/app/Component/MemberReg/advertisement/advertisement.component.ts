import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Service/auth.service';


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  // showImage: boolean = true;
   showVideo: boolean = true; // Uncomment this line if you're using a video

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  skipIntro() {
    // this.showImage = false;
     this.showVideo = false; // Uncomment this line if you're using a video
    this.authService.login();
  }
}

