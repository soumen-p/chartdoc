import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isNew: boolean;
  doctorName: string;
  doctorImg: string;
  errorMsg: string = '';
  userName: string;
  password: string;
  errorCode: string;
  errorDesc: string;
  doctorInfo: FormGroup;
  iconview:string="fa fa-fw fa-eye field-icon";
  constructor(private router: Router,
    private loginService: AuthenticationService,
    private formBuilder: FormBuilder) {
    document.body.className = 'login_page';
  }

  ngOnInit() {
    this.errorMsg = '';
    this.doctorInfo = this.formBuilder.group({
      doctorName: '',
      doctorImage: '',
      doctorId: 0,
      userType: ''
    });
    this.doctorName = this.loginService.getLocalStorage('doctorInfo').doctorName;
    this.doctorImg = this.loginService.getLocalStorage('doctorInfo').doctorImage;
    if (this.doctorName === '') {
      this.isNew = true;
    } else {
      this.isNew = false;
    }
  }
  isTextFieldType: boolean=false;
  togglePasswordFieldType(input: any){
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconview = input.type === 'password' ? 'fa fa-fw fa-eye field-icon' : 'fa fa-fw fa-eye-slash field-icon';
    //this.isTextFieldType = !this.isTextFieldType;
  }
  ngOnDestroy() {
   document.body.className = 'sidebar-collapse';
  }

  tryLogin() {
    if (this.userName === undefined) {
      this.userName = this.doctorName;
    }

    this.loginService.getLoginCredentials(this.userName.trim(), this.password)
      .subscribe((res: User) => {
        this.errorCode = res.errorCode;
        this.errorDesc = res.errorDesc;
        // tslint:disable-next-line: triple-equals
        if (this.errorCode === '0') {
          this.doctorInfo.patchValue({
            doctorName: this.doctorName,
            doctorImage: this.doctorImg,
            doctorId: res.iUserId,
            userType: res.userType
          });
          this.loginService.setDoctorInformation('doctorInfo', this.doctorInfo.value);
          //this.router.navigateByUrl('/patient-flow-sheet');
          this.router.navigateByUrl('/loginDuo');
        } else {
          this.errorMsg = this.errorDesc;
        }
      });
  }

  // get token(){
  //   let claims: any = this.oauthService.getIdentityClaims();
  //   return claims ? claims : null;
  // }
}
