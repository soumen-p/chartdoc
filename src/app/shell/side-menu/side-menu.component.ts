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
  menulist:any=[];
  submenulist:any=[];
  constructor(private commService: CommonService, private sharedService: SharedService) { 
    // this.menulist=[{"menuID":"1","menuname":"Patients","class":"fa fa-users"},
    // {"menuID":"2","menuname":"Appointment","class":"fa fa-calendar-o"} ]; 
    // this.submenulist=[{"menuID":"1","submenu":"Add Patient","submenuRoute":"/patient-create","queryParamsvalue":"","event":""}
    //         ,{"menuID":"1","submenu":"Edit Patient","submenuRoute":"/patient-search","queryParamsvalue":"edit-patient","event":""}
    //       ,{"menuID":"2","submenu":"Doctor Schedule","submenuRoute":"/appointment","queryParamsvalue":"","event":""}];
    this.menulist=this.sharedService.getLocalItem('menu').clsMenu
    this.submenulist=this.sharedService.getLocalItem('menu').clssubMenu
  
  }

  ngOnInit() {
    this.drName = this.sharedService.getLocalItem('doctorInfo').doctorName;
    this.drImagePath = this.sharedService.getLocalItem('doctorInfo').doctorImage;
  }
  deleteData() {
    this.sharedService.removeLocalStorage('patientInfo');
    this.sharedService.removeLocalStorage('dateInfo'); 
  }
  submenulistdata(menuid:any){
    var data=this.submenulist.filter((x:any)=>x.parentmenuId==menuid);
    console.log(data);
    return data;

  }
  
}
