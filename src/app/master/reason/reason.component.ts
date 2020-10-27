import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../../services/book-appointment.service';
import { ReasonMasterService } from '../../services/reason-master.service';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  constructor(private bookAppointmentService: BookAppointmentService,
              private reasonmasterService: ReasonMasterService,
              private toastr: ToastrManager,
              private router: Router) { 
                this.reasonmasterService.setReasonbyid(null);
              }
  reasons: any[] = [];
  deletedata: any;
  public selectedType: any;
  pageOfItems: Array<any>;

  ngOnInit() {
  }
  type:string="";
  getReason(param: any) {
    this.type=param.target.value;
    if (param.target.value === '999') {
      this.reasons = [];
      return;
    }
    this.selectedType = param;
    this.bookAppointmentService.getReason(param.target.value)
      .subscribe((res) => {
        this.reasons = res;
       
      }, err => {
      });
  }

  delete(value: any) {
    this.deletedata = value;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
  public closePopuop(myModal: string, roomNo: string) {
    document.getElementById(myModal).style.display = 'none';
  }

  public openmodal(myModal: string, value: any) {
    const selType = this.selectedType;
    this.reasonmasterService.deleteReason(this.deletedata)
      .subscribe((res) => {
        const response = res.split('|');
        document.getElementById(myModal).style.display = 'none';
        if (response[0] === '1') {
          this.toastr.successToastr("Record deleted sucessfully..");
          this.getReason(selType);
        } else {
          this.toastr.errorToastr("Record cannot be deleted..");
        }
      }, err => {
      });
    document.getElementById(myModal).style.display = 'block';
  }
  editReason(value: any) {
    this.reasonmasterService.setReasonbyid(value);
    this.router.navigateByUrl('/new-reason?id=' + value.reasonId+'&type='+ this.type );
   
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
