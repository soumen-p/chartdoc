import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  service: [];
  deletedata: any;
  pageOfItems: Array<any>;
  constructor(private serviceMasterService: ServiceMasterService, public toastr: ToastrManager,
    private router: Router) { }

  ngOnInit() {
    this.getAllService();
  }
  getAllService() {
    this.serviceMasterService.getAllServices()
      .subscribe((res) => {
        this.service = res;
      }, err => {
        
      });
  }
  editService(request){
    this.router.navigateByUrl('/new-service?id=' + request.serviceId + '&name=' + request.serviceName );
    
  }
  deleteServiceData(request) {
    this.serviceMasterService.DeleteService(request).subscribe((res) => {
      const response = res.split('|');
      if (response[0] === '1') {
        this.toastr.successToastr("Record deleted sucessfully..");
        this.closePopup('modalmarkDelete');
        this.getAllService();
      } else {
        this.toastr.errorToastr("Record cannot be deleted..");
        this.closePopup('modalmarkDelete');
      }
    }, err => {
      
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
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
