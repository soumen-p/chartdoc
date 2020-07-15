import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/core/shared.service';
import { TimeGrid } from '@fullcalendar/timegrid';

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
  tempArray: string[];
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
  createNewUserFormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
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
        this.createNewUserFormGroup.patchValue({
          fullName: this.editUserData.doctorName,
          dateOfBirth: userdob,
          ssn: this.editUserData.ssn,
          phone: this.editUserData.phone,
          email: this.editUserData.email
        });
        this.setradio(this.editUserData.roleType);
        this.createNewUserFormGroup.patchValue({
          dateOfBirth: userdob,
        });
      }
      this.roleFormGroup.patchValue({
        roleType: this.editUserData.roleSubType,
        specialtyType: this.editUserData.specialtyType,

      });
      const arr: string[] = this.editUserData.roleList.split(',').map((item: string) => item.trim());
      console.log('after conversion=', arr);
    } else {
      this.setradio(1);
    }
  }

  isSelected(Id: string): boolean {
    if (this.avRoute.snapshot.queryParams.id !== undefined) {
      const arr: string[] = this.editUserData.roleList.split(',').map((item: string) => item.trim());
      const formArray: FormArray = this.roleFormGroup.get('Roles') as FormArray;
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
  removeDuplicateElement() {
    const arr: Array<string> = [];
    const formArray: FormArray = this.roleFormGroup.get('Roles') as FormArray;
    let i;
    for (i = 0; i < this.tempArray.length; i++) {
      const data = this.tempArray[i];
      if (i === 0) {
        arr.push(data);
      } else {
        if (arr.indexOf(data) === -1) {
          arr.push(data);
        }
      }
    }
  }
  // image: new FormControl('')
  Roles(event) {
    const formArray: FormArray = this.roleFormGroup.get('Roles') as FormArray;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  selectProviderChangeHandler(event) {
    this.specialityType = event.target.value;
  }

  validatePhoneno() {
    const phoneNumber = this.createNewUserFormGroup.controls['phone'].value;
    const phoneRGEX = /^(\()\d{3}(\))(-|\s)?-\d{3}-\d{4}$/;
    const phoneResult = phoneRGEX.test(phoneNumber);
    return phoneResult;
  }

  formatphone() {
    let phoneNumber = this.createNewUserFormGroup.controls['phone'].value;
    phoneNumber = phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
    this.createNewUserFormGroup.patchValue({
      phone: phoneNumber
    });
  }

  setradio(id) {
    if (id === '1') {
      this.getRoleType(id);
      this.getSpeciality();
      this.getRole();
      this.isProvider = true;
      this.isMedicalStaff = false;
      this.isOfficeStaff = false,
        this.selectedId = 1;
    } else if (id === '2') {
      this.getRoleType(id);
      this.getRole();
      this.isProvider = false;
      this.isMedicalStaff = true;
      this.isOfficeStaff = false;
      this.selectedId = 2;
    } else if (id === '3') {
      this.getRoleType(id);
      this.getRole();
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
    this.userService.getRoleType(id).subscribe((res) => {
      if (id === '1') {
        this.roleTypeArray = res;
        console.log('provider Data=', this.roleTypeArray);
      } else if (id === '2') {
        this.medicalRoleType = res;
        console.log('data=' + JSON.stringify(res));
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
      console.log('role=', this.role);
    });
  }

  selectChangeHandler(event: any) {
    // update the ui
    this.roleType = event.target.value;
  }

  save() {
    this.addUserDetails();
    console.log('form value' + this.createNewUserFormGroup);

  }
  addUserDetails() {
    if (this.avRoute.snapshot.queryParams.id !== undefined && this.avRoute.snapshot.queryParams.id === '1') {
      this.editUserDetails();
    } else {
      this.addNewUserDetails();
    }
  }
  addNewUserDetails() {

    if (this.createNewUserFormGroup.valid) {
      const roleList = (this.roleFormGroup.controls['roles'].value).toString();
      const requestInfo = {
        Id: '0',
        FULLName: this.createNewUserFormGroup.controls['fullName'].value,
        DateOfBirth: this.createNewUserFormGroup.controls['dateOfBirth'].value,
        SSN: this.createNewUserFormGroup.controls['ssn'].value,
        Phone: this.createNewUserFormGroup.controls['phone'].value,
        Email: this.createNewUserFormGroup.controls['email'].value,
        RoleType: this.selectedId.toString(),
        specialityType: this.specialityType,
        RoleList: roleList,
        RoleSubType: this.roleFormGroup.controls['roleType'].value,
      };

      console.log('data=' + JSON.stringify(requestInfo));
      this.formData.append('userDetails', JSON.stringify(requestInfo));
      this.formData.append('uploadFile', this.files[0]);
      this.userService.addUser(this.formData).subscribe((res) => {
        console.log('response=' + JSON.stringify(res));
        this.router.navigate(['/manage-user']);
        this.toastr.successToastr('New user created successfully ', 'success!');
        this.createNewUserFormGroup.reset();
        this.roleForm.reset();
      }, err => {
        console.log(err);
      });
    } else {
      this.toastr.errorToastr('Please fill all the fields ', 'Oops!');
    }
  }

  editUserDetails() {
    if (this.createNewUserFormGroup.valid) {
      const tempList = (this.roleFormGroup.controls['roles'].value);
      let rolesList: Array<number> = [];
      rolesList = tempList.reduce((unique, item) => {
        console.log(
          item,
          unique,
          unique.includes(item),
          unique.includes(item) ? unique : [...unique, item],
        );

        return unique.includes(item) ? unique : [...unique, item];
      }, []).toString();

      const requestInfo = {
        id: this.editUserData.id,
        fullName: this.createNewUserFormGroup.controls['fullName'].value,
        dateOfBirth: this.createNewUserFormGroup.controls['dateOfBirth'].value,
        SSN: this.createNewUserFormGroup.controls['ssn'].value,
        phone: this.createNewUserFormGroup.controls['phone'].value,
        email: this.createNewUserFormGroup.controls['email'].value,
        roleType: this.selectedId.toString(),
        specialityType: this.specialityType,
        roleList: rolesList,
        roleSubType: this.roleFormGroup.controls['roleType'].value,
      };
      console.log('data=' + JSON.stringify(requestInfo));

      this.formData.append('userDetails', JSON.stringify(requestInfo));
      this.formData.append('uploadFile', this.files[0]);
      this.userService.addUser(this.formData).subscribe((res) => {
        console.log('response=' + JSON.stringify(res));
        this.router.navigate(['/manage-user']);
        this.toastr.successToastr(' user updated successfully ', 'success!');
        this.createNewUserFormGroup.reset();
        this.roleForm.reset();

      }, err => {

        console.log(err);
      });
    } else {
      this.toastr.errorToastr('Please fill all the fields ', 'Oops!');
    }
  }
  cancel() {
    this.createNewUserFormGroup.reset();
    this.roleForm.reset();

  }
}
