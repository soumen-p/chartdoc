import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/core/shared.service';
//import { TimeGrid } from '@fullcalendar/timegrid';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isProvider = true;
  isMedicalStaff: boolean;
  isOfficeStaff: boolean;
  formData: FormData;
  files: File[] = [];
  tempArray: Array<Number>;
  public width = 400;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  @ViewChild('file', { static: true }) myInputVariable: ElementRef;
  @ViewChild('roleForm', { static: true }) roleForm;
  roleTypeArray = [];
  medicalRoleType: [];
  officeRoleType: [];
  speciality = [];
  role = [];
  roleType: string;
  specialityType: string;
  imageFilePath: File = null;
  selectedId: number;
  editUserData: any;
  disableSaveButton = false;
  // RoleArray: Array<string> = [];
  fileUrl = '';
  isEdit = false;
  userdob1: Date;
  now = new Date();
  year = this.now.getFullYear();
  month = String(this.now.getMonth() + 1).padStart(2, '0');;
  day = String(this.now.getDate()).padStart(2, '0');
  minDate = String(this.year - 100 + "-" + this.month + "-" + this.day);
  maxDate = String(this.year - 20 + "-" + this.month + "-" + this.day);
  createNewUserFormGroup = new FormGroup({
    fullName: new FormControl(''),
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
  });

  roleFormGroup = new FormGroup({
    roleType: new FormControl(''),
    specialityType: new FormControl(''),
    roles: new FormArray([]),
  });

  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, public toastr: ToastrManager, private avRoute: ActivatedRoute, private sharedService: SharedService, private router: Router) {
    this.formData = new FormData();
    if (this.avRoute.snapshot.queryParams.id !== undefined && this.avRoute.snapshot.queryParams.id === '1') {
      if (this.sharedService.getLocalItem('userDetails').id != null) {
        this.isEdit = true;
        this.disableSaveButton = true;
        this.editUserData = this.sharedService.getLocalItem('userDetails');
        const userdob = new Date(this.editUserData.dateOfBirth);
        this.userdob1 = new Date(this.editUserData.dateOfBirth);

        this.fileUrl = this.editUserData.doctorImage;
        userdob.setMinutes(userdob.getMinutes() + userdob.getTimezoneOffset());
        userdob.setDate(userdob.getDate() + 1);
       let name= this.editUserData.doctorName.trim().split(' ');
       var lastName="";
       name.forEach((element, index) => {
        if(index>0 && element!="" && lastName.trim()!=""){
          lastName=lastName.trim()+" "+element.trim();
        }
        else if (index>0 && element!="" ){
          lastName=element.trim();
        }
       });
        this.createNewUserFormGroup.patchValue({
          fullName: this.editUserData.doctorName.trim(),
          fName:this.editUserData.doctorName.trim().split(' ')[0],
          lName:this.editUserData.doctorName.trim().split(' ').length>1? lastName:'',
          dateOfBirth: userdob,
          ssn: this.editUserData.ssn,
          phone: this.editUserData.phone,
          email: this.editUserData.email
        });
        this.setradio(this.editUserData.roleType);
        this.roleFormGroup.patchValue({
          roleType: this.editUserData.roleSubType,
          specialityType: this.editUserData.specialtyType,
        });
        this.specialityType = this.editUserData.specialtyType;
      }
      this.tempArray = this.editUserData.roleList.split(',').map((item: string) => item.trim());
      
    } else {
      this.setradio('1');
    }
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  isSelected(Id: string): boolean {
    if (this.avRoute.snapshot.queryParams.id !== undefined) {
      const arr: string[] = this.editUserData.roleList.split(',').map((item: string) => item.trim());
      const formArray: FormArray = this.roleFormGroup.get('roles') as FormArray;
      let status: boolean;
      status = arr.indexOf(Id) >= 0 ? true : false;
      if (status) {
        formArray.push(new FormControl(Id));
      }
      return status;
    } else {
      return false;
    }
  }

  ngOnInit() {
  }
  Roles(event) {
    const formArray: FormArray = this.roleFormGroup.get('roles') as FormArray;
    if (this.avRoute.snapshot.queryParams.id !== undefined && this.avRoute.snapshot.queryParams.id === '1') {
      if(event.target.checked){
        this.tempArray.push(event.target.value);
      } else {
        const index:number=this.tempArray.indexOf(event.target.value);
        if(index!==-1){
          this.tempArray.splice(index,1);
        }
      }
    }
    else{
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      let index = formArray.controls.findIndex(x => x.value == event.target.value)
      formArray.removeAt(index);
    }
  }
  }
  selectProviderChangeHandler(event) {
    this.specialityType = event.target.value;
  }

  validatePhoneno(strphoneNumber: any) {
    const phoneNumber = strphoneNumber;
    const phoneRGEX = /^(\()\d{3}(\))(-|\s)?-\d{3}-\d{4}$/;
    const phoneResult = phoneRGEX.test(phoneNumber);
    return phoneResult;
  }
  formatphone(strphoneNumber: any, strcaption: any): any {
    let phoneNumber = strphoneNumber;
    phoneNumber = phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');

    if (!this.validatePhoneno(phoneNumber)) {
      phoneNumber = '';
      this.toastr.errorToastr('Invalid ' + strcaption + '. Mobile Phone number format must be (xxx)-xxx-xxxx', 'Oops!');
    }
    return phoneNumber;

  }
  ssnformat(value: string): string {
    var val = value.replace(/\D/g, '');
    var newVal = '';

    if (val.length > 4) {
      value = val;
    }

    if ((val.length > 3) && (val.length < 6)) {
      newVal += val.substr(0, 3) + '-';
      val = val.substr(3);
    }

    if (val.length > 5) {
      newVal += val.substr(0, 3) + '-';
      newVal += val.substr(3, 2) + '-';
      val = val.substr(5);
    }

    newVal += val;
    return newVal;
  }
  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(this.createNewUserFormGroup.value.email)) {
      return;
    }
    this.toastr.errorToastr("You have entered an invalid email address!", 'Error!');
    this.createNewUserFormGroup.patchValue({
      email: ""
    })
  }
  ssnlencheck() {
    let ssno=this.createNewUserFormGroup.value.ssn.split('-').join('');
    if (ssno.length == 9) {
      let newVal = this.ssnformat(ssno);
      this.createNewUserFormGroup.patchValue({
        ssn: newVal
      });
    } else {
      this.toastr.errorToastr('SSN 9 digit requried', 'Oops!');
      this.createNewUserFormGroup.patchValue({
        ssn: ""
      });
    }
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;


  }
  validatemobilephone() {
    // let phoneNumber = this.createNewUserFormGroup.controls['phone'].value;
    // phoneNumber = phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
    // this.createNewUserFormGroup.patchValue({
    //   phone: phoneNumber
    // });
    const phoneNumber = this.formatphone(this.createNewUserFormGroup.value.phone, 'Mobile Phone');
    this.createNewUserFormGroup.patchValue({
      phone: phoneNumber
    });
  }

  setradio(id) {
    this.getRole();
    if (id === '1') {
      this.getRoleType(id);
      this.getSpeciality();
      this.isProvider = true;
      this.isMedicalStaff = false;
      this.isOfficeStaff = false,
        this.selectedId = 1;
    } else if (id === '2') {
      this.getRoleType(id);
      //this.getRole();
      this.isProvider = false;
      this.isMedicalStaff = true;
      this.isOfficeStaff = false;
      this.selectedId = 2;
    } else if (id === '3') {
      this.getRoleType(id);
      // this.getRole();
      this.isProvider = false;
      this.isMedicalStaff = false;
      this.isOfficeStaff = true;
      this.selectedId = 3;
    }
  }

  getRoleType(id) {
    this.roleTypeArray = [];
    this.medicalRoleType = [];
    this.officeRoleType = [];
    const formArray: FormArray = this.roleFormGroup.get('roles') as FormArray;
    while (formArray.length) {
      formArray.removeAt(0);
    }
    this.userService.getRoleType(id).subscribe((res) => {
      if (id === '1') {
        this.roleTypeArray = res;
        
      } else if (id === '2') {
        this.medicalRoleType = res;
        
      } else if (id === '3') {
        this.officeRoleType = res;
      }
    });
  }

  getSpeciality() {
    this.userService.getSpeciality().subscribe((res) => {
      this.speciality = res;
    });
  }

  getRole() {
    this.userService.getRole().subscribe((res) => {
      this.role = res;
      
    });
  }

  selectChangeHandler(event: any) {
    // update the ui
    this.roleType = event.target.value;
  }

  save() {
    this.addUserDetails();
    

  }
  addUserDetails() {
    if (this.avRoute.snapshot.queryParams.id !== undefined && this.avRoute.snapshot.queryParams.id === '1') {
      this.editUserDetails();
    } else {
      this.addNewUserDetails();
    }
  }
  dobValidation(): boolean {
    let flgdate = true;
    
    if (new Date(this.createNewUserFormGroup.value.dateOfBirth) < new Date(this.minDate)) {
      this.toastr.errorToastr('Invalid DOB ', 'Oops!');
      flgdate = false;
    }
    // else if (new Date(this.createNewUserFormGroup.value.dateOfBirth) > new Date(this.getToday())) {
      else if (new Date(this.createNewUserFormGroup.value.dateOfBirth) > new Date(this.maxDate)) {
      this.toastr.errorToastr('Invalid DOB ', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }
  addNewUserDetails() {
    this.formData= new FormData();
    if (this.createNewUserFormGroup.valid) {
      if (!this.dobValidation()) {
        return;
      }
      const roleList = (this.roleFormGroup.controls['roles'].value).toString();

      const requestInfo = {
        Id: '0',
        FULLName: this.createNewUserFormGroup.controls['fName'].value.trim()+" "+ this.createNewUserFormGroup.controls['lName'].value.trim(),
        DateOfBirth: this.createNewUserFormGroup.controls['dateOfBirth'].value,
        SSN: this.createNewUserFormGroup.controls['ssn'].value,
        Phone: this.createNewUserFormGroup.controls['phone'].value,
        Email: this.createNewUserFormGroup.controls['email'].value,
        RoleType: this.selectedId.toString(),
        specialityType: this.specialityType,
        RoleList: roleList,
        RoleSubType: this.roleFormGroup.controls['roleType'].value,
      };
      
      this.formData.append('userDetails', JSON.stringify(requestInfo));
      this.formData.append('uploadFile', this.files[0]);
      this.userService.addUser(this.formData).subscribe((res) => {
        if(res=="-1"){
          this.toastr.errorToastr("Data already exists");
        }else{
        
        this.router.navigate(['/manage-user']);
        this.toastr.successToastr('New user created successfully ', 'success!');
        this.createNewUserFormGroup.reset();
        this.roleForm.reset();
        }
      }, err => {
      });
    } else {
      this.toastr.errorToastr('Please fill all the fields ', 'Oops!');
    }
  }

  editUserDetails() {
    this.formData= new FormData();
    if (this.createNewUserFormGroup.valid) {
      if (!this.dobValidation()) {
        return;
      }
      const requestInfo = {
        id: this.editUserData.id,
        fullName:this.createNewUserFormGroup.controls['fName'].value.trim()+" "+ this.createNewUserFormGroup.controls['lName'].value.trim(),// this.createNewUserFormGroup.controls['fullName'].value,
        dateOfBirth: this.createNewUserFormGroup.controls['dateOfBirth'].value,
        SSN: this.createNewUserFormGroup.controls['ssn'].value,
        phone: this.createNewUserFormGroup.controls['phone'].value,
        email: this.createNewUserFormGroup.controls['email'].value,
        roleType: this.selectedId.toString(),
        specialityType: this.specialityType,
        roleList: this.tempArray.toString(),
        roleSubType: this.roleFormGroup.controls['roleType'].value,
        imagePath:this.fileUrl ,
      };
      
      this.formData.append('userDetails', JSON.stringify(requestInfo));
      this.formData.append('uploadFile', this.files[0]);
      this.userService.addUser(this.formData).subscribe((res) => {
        if(res=="-1"){
          this.toastr.errorToastr("Data already exists");
        }else{
                  
        
        this.router.navigate(['/manage-user']);
        this.toastr.successToastr(' user updated successfully ', 'success!');
        this.createNewUserFormGroup.reset();
        this.roleForm.reset();
        }

      }, err => {

      });
    } else {
      this.toastr.errorToastr('Please fill all the fields ', 'Oops!');
    }
  }
}
