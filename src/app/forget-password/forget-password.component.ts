import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  emailSent: boolean;
  userName: string;
  errorMsg: string = '';
  captcha_clicked: boolean;
  resendMsg: string= '';

  constructor(private router: Router, 
              private loginService: AuthenticationService) { }

  ngOnInit() {
    this.emailSent = false;
	  this.captcha_clicked=false;
    //console.log("forget-password component init");
    //this.router.navigateByUrl('/forget-password');
    /*const test = this.loginService.test({
      "compId": 10001,
      "userId": 4
    }).subscribe((res) => {
      console.log('test called ', res);
      test.unsubscribe();
    })*/
  }

  resetPassword() {
    console.log("resetPassword");
    if (this.userName === undefined || this.userName.trim() === '') {
      this.errorMsg = 'Enter an email id. Email field empty';
      return
    }
	else
	{
	const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if( !regularExpression.test(String(this.userName).toLowerCase())){
		this.errorMsg = 'Email id not valid. Please check your email id';
		return
	}
	}
	if (this.captcha_clicked==false) {
      this.errorMsg = 'Please click on captcha. Please verify captcha';
      return
    }
    const subscription = this.loginService.resetPassword(this.userName)
      .subscribe((res) => {
		  if(res.data.Valid)
			  this.emailSent = true;
		  else
		  {
			  this.emailSent=false;
			  this.errorMsg=res.data.Message;
		  }
			  
        subscription.unsubscribe();
      });

  }
  
  resendPassword() {
	  if(this.emailSent!=true)
	  {
		  this.resendMsg= 'The email has not been sent even once';
		  return;
	  }
	  this.resendMsg= 'The email has been sent again';
	  const subscription = this.loginService.resetPassword(this.userName)
      .subscribe((res) => {
        if(!res.data.Valid)
			  this.resendMsg=res.data.Message;
        subscription.unsubscribe();
      });
  }
  resolved(captchaResponse: string) {
        this.captcha_clicked=true;
		this.errorMsg='';
    }

}
