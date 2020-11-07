import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDuoService } from '../services/loginDuo.service';
//import { User } from '../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loginDuo',
  templateUrl: './loginDuo.component.html',
  styleUrls: ['./loginDuo.component.css']
})
export class LoginDuoComponent implements OnInit {
 
  //doctorInfo: FormGroup;
  //userList:User[]=[];
  DuoSignature:string;
  constructor(private router: Router,
    private loginDuoService: LoginDuoService,
    formBuilder: FormBuilder) {
  //  this.doctorInfo = formBuilder.group({
    //  doctorEmail: ''

   // })
  }

  ngOnInit() {
    let strEmail:string="suvresh.chatterjee@gmail.com";
    this.getDuoSignatureRequest(strEmail);
  }
  
  getDuoSignatureRequest(strEmail:any) {
    this.loginDuoService.getDuoSignatureRequest(strEmail).subscribe((res) => {
      this.DuoSignature = res;
      
    }, err => {
      
    });
  }
  
}