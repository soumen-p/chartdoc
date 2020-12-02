import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../services/landing-page.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  doctorInfo: FormGroup;
  userList:User[]=[];
  constructor(private router: Router,
    private landingPageService: LandingPageService,
    formBuilder: FormBuilder) {
    document.body.className = "login_page";
    this.doctorInfo = formBuilder.group({
      doctorName: '',
      doctorImage: '',
      doctorEmail: '',
      doctorPhone: '',
      roleType:''
    })
  }

  ngOnInit() {
    this.getUserList();
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  onClick(user:any) {
    this.doctorInfo.setValue({
      doctorName: user ? user.doctorName : '',
      doctorImage: user ? user.doctorImage : '',
      doctorEmail: user ? user.email : '',
      doctorPhone: user ? user.phone : '',
      roleType: user ? user.roleType : '' 
    });

    this.landingPageService.setDoctorInfo('doctorInfo', this.doctorInfo.value);
    
    this.router.navigateByUrl('/login');
    //this.router.navigateByUrl('/test');
  }

  getUserList() {
    this.landingPageService.getUserList().subscribe((res) => {
      this.userList = res;
      
    }, err => {
      
    });
  }

  picNotLoading(event){
    event.target.src = 'assets/images/icons8-male-user-50.png';
  }

}
