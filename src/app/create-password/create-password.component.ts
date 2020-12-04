import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  errorMsg: string = '';
  iconview: string = "fa fa-fw fa-eye field-icon";
  password: string;
  re_password: string;
  page_confirm: boolean;
  number: boolean;
  length_ei: boolean;
  caps: boolean;


  constructor(private router: Router, private loginService: AuthenticationService) {

  }

  ngOnInit() {
    this.password = '';
    this.re_password = '';
    this.page_confirm = false;
	this.number=false;
	this.length_ei=false;
	this.caps=false;
  }
  togglePasswordFieldType(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconview = input.type === 'password' ? 'fa fa-fw fa-eye field-icon' : 'fa fa-fw fa-eye-slash field-icon';
    //this.isTextFieldType = !this.isTextFieldType;
  }
  password_check(e)
  {
	  this.password=e;
	  const number1=/^(?=.*[0-9]).*$/;
	  const length_ei1=/^(?=.{8,}$).*$/;
	  const caps1=/^(?=.*[A-Z]).*$/;
	  this.caps=caps1.test(String(this.password))
	  this.number=number1.test(String(this.password))
	  this.length_ei=length_ei1.test(String(this.password))
	  
	  if(this.caps && this.number && this.length_ei)
		  return true;
	  else
		  return false;
  }
	  
  set_password() {
    console.log("in set password");
    if (this.password === undefined || this.password.trim() === '') {
      this.errorMsg = 'Please enter the password';
      return
    }
    if (this.re_password === undefined || this.re_password.trim() === '') {
      this.errorMsg = 'Please confirm your password';
      return
    }
    if (this.re_password != this.password) {
      this.errorMsg = 'Your passwords dont match';
      return
    }

    if (!this.password_check(this.password)) {
      this.errorMsg = 'Password not valid';
      return
    }


    const subscription = this.loginService.changePassword({
      email: "dummy@email.com",
      password: this.password
    }).subscribe((res) => {
        this.page_confirm = true;
        subscription.unsubscribe();
      });
    //this.router.navigateByUrl('/patient-flow-sheet');
  }

  signIn(){
    this.router.navigateByUrl('/');
  }

}
