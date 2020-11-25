import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
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
  menulist: any = [];
  submenulist: any = [];
  useraccess: any = [];
  constructor(private commService: CommonService, private sharedService: SharedService) {

    this.menulist = this.sharedService.getLocalItem('menu').clsMenu
    this.submenulist = this.sharedService.getLocalItem('menu').clssubMenu
    this.useraccess = this.sharedService.getLocalItem('useraccess');
    this.submenulist.forEach(element => {
      element.Status= this.useraccess.filter((x:any)=>x.ID==element.menuId)[0]["Status"];
    });
    console.log(this.submenulist);
  }

  ngOnInit() {
    this.drName = this.sharedService.getLocalItem('doctorInfo').doctorName;
    this.drImagePath = this.sharedService.getLocalItem('doctorInfo').doctorImage;
  }
  deleteData() {
    this.sharedService.removeLocalStorage('patientInfo');
    this.sharedService.removeLocalStorage('dateInfo');
  }
  submenulistdata(menuid: any) {
    var data = this.submenulist.filter((x: any) => x.parentmenuId == menuid);

    return data;

  }
  menudisabled(menuid: number): string {
   
    let obj=this.useraccess.filter((x: any) => x.ID == Number(menuid) && x.Status == "1");
    if (obj.length>0) {
      console.log(obj)
      return "disabled";
    }
    else {
      return "";
    }
  }
}
