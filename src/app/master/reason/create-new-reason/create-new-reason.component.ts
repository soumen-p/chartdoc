import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ReasonMasterService } from '../../../services/reason-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-create-new-reason',
  templateUrl: './create-new-reason.component.html',
  styleUrls: ['./create-new-reason.component.css']
})
export class CreateNewReasonComponent implements OnInit {
  formData = new FormData();
  reasonForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private reasonmasterService: ReasonMasterService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrManager) {

  }

  ngOnInit() {
    this.reasonForm = this.formBuilder.group({
      reasonId: ['0'],
      reasonCode: ['', [Validators.required]],
      reasonDescription: ['', [Validators.required]],
      patientName: [''],
      type: ['', [Validators.required]]

    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.reasonmasterService.getReasonbyid()!=undefined || this.reasonmasterService.getReasonbyid()!=null){
      this.reasonForm.patchValue({
        reasonId:params['id'],
        reasonCode:this.reasonmasterService.getReasonbyid().reasonCode,
        reasonDescription:this.reasonmasterService.getReasonbyid().reasonDescription,
        type:params['type'],
      })
     
    }
    });
  
  }
  save() {
    if (!this.reasonForm.valid) {
      return;
    } else {
      this.reasonmasterService.saveReason(this.reasonForm.value).subscribe((res) => {
        
        const result = res.split('|');
        if (result[0] === '1') {
          this.toastr.successToastr("Save Sucessfully..");
          this.router.navigateByUrl('/app-reason');
        }else if (result[0] === '-1') {
          this.toastr.errorToastr("Data already exists");
        }
         else {
          this.toastr.errorToastr(result[1]);
        }
      }, err => {
        
      });
    }
  }
}
