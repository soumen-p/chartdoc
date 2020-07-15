import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../../services/book-appointment.service';
import { ReasonMasterService } from '../../services/reason-master.service';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  constructor(private bookAppointmentService: BookAppointmentService,
              private reasonmasterService: ReasonMasterService,
              private toastr: ToastrManager) { }
  reasons: any[] = [];
  deletedata: any;
  public selectedType: any;
  ngOnInit() {
  }
  getReason(param: any) {
    if (param.target.value === '999') {
      this.reasons = [];
      return;
    }
    this.selectedType = param;
    this.bookAppointmentService.getReason(param.target.value)
      .subscribe((res) => {
        this.reasons = res;
        console.log('Reasons : %o', res);
      }, err => {
        console.log(err);
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
          this.toastr.successToastr(response[1]);
          this.getReason(selType);
        } else {
          this.toastr.errorToastr(response[1]);
        }
      }, err => {
        console.log(err);
      });
    document.getElementById(myModal).style.display = 'block';
  }
}
