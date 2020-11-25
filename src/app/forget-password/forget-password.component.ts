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

  constructor(private router: Router, 
              private loginService: AuthenticationService) { }

  ngOnInit() {
    this.emailSent = false;
    //console.log("forget-password component init");
    //this.router.navigateByUrl('/forget-password');
  }

  resetPassword() {
    console.log("resetPassword");
    if (this.userName === undefined || this.userName.trim() === '') {
      this.errorMsg = 'Enter email';
      return
    }

    const subscription = this.loginService.resetPassword(this.userName)
      .subscribe((res) => {
        this.emailSent = true;
        subscription.unsubscribe();
      });

  }

}
