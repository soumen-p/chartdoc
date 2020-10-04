import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-new-service',
  templateUrl: './create-new-service.component.html',
  styleUrls: ['./create-new-service.component.css']
})
export class CreateNewServiceComponent implements OnInit {
  serviceId:any=0;
  constructor(private serviceMasterService: ServiceMasterService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrManager) { }
  serviceName: string;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.serviceId = params['id'];
      this.serviceName = params['name'];
     
    });
  }
  saveService() {
    if (!this.serviceName) {
      this.toastr.errorToastr('Service Name required.');
      return;
    }
    const data = { serviceId: this.serviceId , serviceName: this.serviceName };
    this.serviceMasterService.saveService(data).subscribe((res) => {
      const result = res.split('|');
      if (result[0] === '1') {
        this.toastr.successToastr("Save Sucessfully..");
        this.router.navigate(['/app-service']);
      } 
      else if (result[0] === '-1') {
        this.toastr.errorToastr("Data already exists");
      }
      else {
        this.toastr.errorToastr(result[1]);
      }
    }, err => {
      console.log(err);
    });
  }

}
