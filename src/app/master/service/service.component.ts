import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  service: [];
  deletedata: any;
  constructor(private serviceMasterService: ServiceMasterService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.getAllService();
  }
  getAllService() {
    this.serviceMasterService.getAllServices()
      .subscribe((res) => {
        this.service = res;
      }, err => {
        console.log(err);
      });
  }
  deleteServiceData(request) {
    this.serviceMasterService.DeleteService(request).subscribe((res) => {
      const response = res.split('|');
      if (response[0] === '1') {
        this.toastr.successToastr(response[1]);
        this.closePopup('modalmarkDelete');
        this.getAllService();
      } else {
        this.toastr.errorToastr(response[1]);
      }
    }, err => {
      console.log('error');
    });
  }

  public openModal(myModal: string, value: any) {
    this.deleteServiceData(this.deletedata);
    document.getElementById(myModal).style.display = 'block';
  }
  deleteService(value: any) {
    this.deletedata = value;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
  public closePopup(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
  }
}
