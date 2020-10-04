import { Component, OnInit } from '@angular/core';
import { SpecialtyMasterService } from 'src/app/services/specialty-master.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-new-specialty',
  templateUrl: './create-new-specialty.component.html',
  styleUrls: ['./create-new-specialty.component.css']
})
export class CreateNewSpecialtyComponent implements OnInit {
  serviceId:any=0;
  constructor(private specialtyMasterService: SpecialtyMasterService,
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
      this.toastr.errorToastr('Specialty Name required.');
      return;
    }
    const data = { pId: this.serviceId==undefined?0:this.serviceId , pCcDescription: this.serviceName };
    this.specialtyMasterService.saveSpecialty(data).subscribe((res) => {
      const result = res.split('|');
      if (result[0] === '1') {
        this.toastr.successToastr("Save Sucessfully..");
        this.router.navigate(['/app-specialty']);
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
