import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-new-service',
  templateUrl: './create-new-service.component.html',
  styleUrls: ['./create-new-service.component.css']
})
export class CreateNewServiceComponent implements OnInit {

  constructor(private serviceMasterService: ServiceMasterService,
              private router: Router,
              public toastr: ToastrManager) { }
  serviceName: string;

  ngOnInit() {
  }
  saveService() {
    const data = { serviceId: '0', serviceName: this.serviceName };
    this.serviceMasterService.saveService(data).subscribe((res) => {
      const result = res.split('|');
      if (result[0] === '1') {
        this.toastr.successToastr(result[1]);
        this.router.navigate(['/app-service']);
      } else {
        this.toastr.errorToastr(result[1]);
      }
    }, err => {
      console.log(err);
    });
  }

}
