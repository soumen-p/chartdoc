import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/shared.service';
import { numberSymbols } from '@progress/kendo-angular-intl';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  userList: [];
  prviderUserList: [];
  medicalUserList: [];
  officeUserList: [];
  pageOfItemsProvider: Array<any>;
  pageOfItemsMedical: Array<any>;
  pageOfItemsOffice: Array<any>;
  constructor(private user: UserService, private router: Router, private sharedService: SharedService, private toast: ToastrManager) { }

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    this.user.getUserList().subscribe((res) => {
      this.prviderUserList = res[0];
      this.medicalUserList = res[1];
      this.officeUserList = res[2];
    });
  }
  editUser(data: object) {
    this.sharedService.setLocalItem('userDetails', data);
    this.router.navigate(['/user'], { queryParams: { id: '1' } });
  }
  disableUser(Id: string, status: number) {

    if (status === 1) {
      status = 0;
    } else { status = 1; }

    this.user.updateStatus(Id, status).subscribe((res) => {
      this.getUserList();
      this.toast.successToastr('Status update successfully', 'Success');

    }, err => {
      this.toast.errorToastr('Something went wrong', 'Error');
      
    });

  }

  picNotLoading(event) {
    event.target.src = 'assets/images/icons8-male-user-50.png';
  }

  onChangePageProvider(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsProvider = pageOfItems;
  }
  onChangePageMedical(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsMedical = pageOfItems;
  }
  onChangePageOffice(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsOffice = pageOfItems;
  }
}
