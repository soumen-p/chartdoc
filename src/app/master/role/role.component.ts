import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../../services/book-appointment.service';
import { RoleMasterService } from '../../services/role-master.service';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private bookAppointmentService: BookAppointmentService,
              private rolemasterService: RoleMasterService,
              private toastr: ToastrManager,
              private router: Router) { 
                this.rolemasterService.setRolebyid(null);
              }
  roles: any[] = [];
  deletedata: any;
  public selectedType: any;
  pageOfItems: Array<any>;

  ngOnInit() {
  }
  type:string="";
  getRole(param: any) {
    this.type=param.target.value;
    if (param.target.value === '999') {
      this.roles = [];
      return;
    }
    this.selectedType = param;
    this.rolemasterService.getRole(param.target.value)
      .subscribe((res) => {
        this.roles = res;
        console.log('roles : %o', res);
      }, err => {
        console.log(err);
      });
  }

  delete(value: any) {
    this.deletedata = value;
    this.deletedata.utId= this.type;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
  public closePopuop(myModal: string, roomNo: string) {
    document.getElementById(myModal).style.display = 'none';
  }

  public openmodal(myModal: string, value: any) {
    const selType = this.selectedType;
    this.rolemasterService.deleteRole(this.deletedata)
      .subscribe((res) => {
        const response = res.split('|');
        document.getElementById(myModal).style.display = 'none';
        if (response[0] === '1') {
          this.toastr.successToastr("Record deleted sucessfully..");
          this.getRole(selType);
        } else {
          this.toastr.errorToastr("Record cannot be deleted..");
        }
      }, err => {
        console.log(err);
      });
    document.getElementById(myModal).style.display = 'block';
  }
  editRole(value: any) {
    console.log(value);
    this.rolemasterService.setRolebyid(value);
    this.router.navigateByUrl('/new-role?id=' + value.utCode+'&role='+ this.type );
   
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
