import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  emailSent: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.emailSent = false;
    //console.log("forget-password component init");
    //this.router.navigateByUrl('/forget-password');
  }

}
