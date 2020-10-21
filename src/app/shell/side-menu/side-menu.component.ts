import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';
import { SharedService } from 'src/app/core/shared.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  drName: string;
  drImagePath: string;
  constructor(private commService: CommonService, private sharedService: SharedService) { }

  ngOnInit() {
    this.drName = this.sharedService.getLocalItem('doctorInfo').doctorName;
    this.drImagePath = this.sharedService.getLocalItem('doctorInfo').doctorImage;
  }
  deleteData() {
    this.sharedService.removeLocalStorage('patientInfo');
    this.sharedService.removeLocalStorage('dateInfo'); 
  }
}
