import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';
import { SharedService } from 'src/app/core/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  drName: string;
  drImagePath: string;
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.drName = this.sharedService.getLocalItem('doctorInfo').doctorName;
    this.drImagePath = this.sharedService.getLocalItem('doctorInfo').doctorImage;
  }

  signOut(){
    this.router.navigateByUrl('/');
    this.sharedService.clearLocalItem();
  }
}
