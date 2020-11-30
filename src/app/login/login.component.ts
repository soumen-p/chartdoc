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
  doctorImage: string;
  doctorEmail:string;
  doctorPhone:string;
  errorMsg: string = '';
  userName: string;
  password: string;
  errorCode: string;
  errorDesc: string;
  email: string;
  emailValid: boolean;
  codeSent: boolean;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  finalCode: string;
  validCode: boolean;
  doctorInfo: FormGroup;
  iconview: string = "fa fa-fw fa-eye field-icon";
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
      doctorEmail: '',
      doctorPhone: '',
      doctorId: 0,
      userType: ''
    });
    this.doctorName = this.loginService.getLocalStorage('doctorInfo').doctorName;
    this.doctorImage = this.loginService.getLocalStorage('doctorInfo').doctorImage;

    this.doctorEmail = this.loginService.getLocalStorage('doctorInfo').doctorEmail;
    this.doctorPhone = this.loginService.getLocalStorage('doctorInfo').doctorPhone;
    
    if (this.doctorName === '') {
      this.isNew = true;
    } else {
      this.isNew = false;
    }
  }
  isTextFieldType: boolean = false;
  togglePasswordFieldType(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconview = input.type === 'password' ? 'fa fa-fw fa-eye field-icon' : 'fa fa-fw fa-eye-slash field-icon';
    //this.isTextFieldType = !this.isTextFieldType;
  }
  ngOnDestroy() {
    document.body.className = 'sidebar-collapse';
  }

  forgetPassword() {
    this.router.navigateByUrl('/forget-password');
    //this.router.navigateByUrl('/patient-flow-sheet');
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
            doctorImage: this.doctorImage,
            doctorEmail: this.doctorEmail,
            doctorPhone: this.doctorPhone,
            doctorId: res.iUserId,
            userType: res.userType
          });
          this.loginService.getmenu().subscribe((res: any) => {
            this.loginService.setDoctorInformation('menu', res);
          })
          this.loginService.getUserAccessDetails(this.doctorInfo.value.userType).subscribe((res: any) => {
            this.loginService.setDoctorInformation('useraccess', res);
          })
          this.loginService.setDoctorInformation('doctorInfo', this.doctorInfo.value);
          //this.router.navigateByUrl('/patient-flow-sheet');
          this.emailValid = true;
          this.codeSent = false;
        } else {
          this.errorMsg = this.errorDesc;
        }
      });
  }

  addUseremail() {
    if (this.email === undefined || this.email.trim() === '') {
      this.errorMsg = 'Enter an email id. Email field empty';
      return
    }
    else {
      const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regularExpression.test(String(this.email).toLowerCase())) {
        this.errorMsg = 'Email id not valid. Please check your email id';
        return
      }
    }
    const subscription = this.loginService.validateEmail(this.email)
      .subscribe((res) => {
        /* if (res.data.Valid) {
          this.errorMsg = '';
          this.router.navigateByUrl('/create-password');
        } else{
          this.errorMsg = 'This Email Id does not exist. Check with admin';
        } */
          
        subscription.unsubscribe();
      });
  }

  validateCode() {
    if ((this.code1 === undefined || this.code1.trim() === '') || (this.code2 === undefined || this.code2.trim() === '') || (this.code3 === undefined || this.code3.trim() === '') || (this.code4 === undefined || this.code4.trim() === '') || (this.code5 === undefined || this.code5.trim() === '') || (this.code6 === undefined || this.code6.trim() === '')) {
      this.errorMsg = 'You have not entered all digits of code. Please check';
      return
    }
    this.finalCode = this.code1.concat(this.code2).concat(this.code3).concat(this.code4).concat(this.code5).concat(this.code6);
    alert(this.finalCode);
    const subscription = this.loginService.validateCode(this.finalCode)
      .subscribe((res) => {
        this.validCode = true;
        this.router.navigateByUrl('/patient-flow-sheet');
        subscription.unsubscribe();
      });
  }

  sendCode() {
    console.log("in send code");
    const subscription = this.loginService.sendCode()
      .subscribe((res) => {
        if (this.codeSent == true)
          this.errorMsg = "the code has been sent again to your selected device";
        this.codeSent = true;
        subscription.unsubscribe();
      });


  }



  // get token(){
  //   let claims: any = this.oauthService.getIdentityClaims();
  //   return claims ? claims : null;
  // }
}
