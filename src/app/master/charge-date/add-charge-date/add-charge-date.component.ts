import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-charge-date',
  templateUrl: './add-charge-date.component.html',
  styleUrls: ['./add-charge-date.component.css']
})
export class AddChargeDateComponent implements OnInit {
  formData: FormData;
  
  description : string;
  chargeDate_FormGroup = new FormGroup({
    
    toDate: new FormControl(''),
    fromDate: new FormControl(''),

  });

  constructor(private serviceMasterService: ServiceMasterService, 
    public toastr: ToastrManager,private datePipe: DatePipe, private router: Router) {
    this.formData = new FormData();
   }
  
  ngOnInit() {
  }

  saveChargeDate() {
    let fromDateValue = this.chargeDate_FormGroup.value["fromDate"];
    let toDateValue = this.chargeDate_FormGroup.value["toDate"];
    this.description = this.datePipe.transform(fromDateValue, 'MMddyyyy') + "-" + this.datePipe.transform(toDateValue, 'MMddyyyy'); 
    
    var data = {
      id:0, 
      startDate: this.datePipe.transform(fromDateValue, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(toDateValue, 'MM/dd/yyyy') , 
      description: this.description ,
      status : 'A'
                };

    this.serviceMasterService.saveChargeDate(data).subscribe((res) => {
      let response = res.split('|');
      if(response[0] == '1'){
        this.toastr.successToastr(response[1]);
      }
      else{
        this.toastr.errorToastr(response[1]);
      }
      
//Redirect to Master page
this.router.navigate(['/app-charge-date']);

    }, err => {
      console.log("error");
    });

  }

}
