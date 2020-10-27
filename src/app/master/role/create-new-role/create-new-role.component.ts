import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { RoleMasterService } from '../../../services/role-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-create-new-role',
  templateUrl: './create-new-role.component.html',
  styleUrls: ['./create-new-role.component.css']
})
export class CreateNewRoleComponent implements OnInit {
  formData = new FormData();
  reasonForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private rolemasterService: RoleMasterService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrManager) {

  }

  ngOnInit() {
    this.reasonForm = this.formBuilder.group({
      utCode: ['0'],
     
      userDescription: ['', [Validators.required]],
     
      utId: ['', [Validators.required]]

    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.rolemasterService.getRolebyid()!=undefined || this.rolemasterService.getRolebyid()!=null){
      this.reasonForm.patchValue({
        utCode:params['id'],
     
        userDescription:this.rolemasterService.getRolebyid().userDescription,
        utId:params['role'],
      })
     
    }
    });
  
  }
  save() {
    if (!this.reasonForm.valid) {
      return;
    } else {
      this.rolemasterService.saveRole(this.reasonForm.value).subscribe((res) => {
        
        const result = res.split('|');
        if (result[0] === '1') {
          this.toastr.successToastr("Save Sucessfully..");
          this.router.navigateByUrl('/app-role');
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
