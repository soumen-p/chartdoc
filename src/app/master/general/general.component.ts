import { Component, OnInit } from '@angular/core';
import { OthersServiceService } from 'src/app/services/others-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  types: any[];
  others: any[];
  selectedTypeId: string;
  deletedData: any;

  constructor(private OthersService: OthersServiceService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.populatetypes();
  }
  selectChange(event: any) {
    // update the ui
    this.selectedTypeId = event.target.value;
    this.populatetOthers(this.selectedTypeId);
  }
  populatetypes() {
    this.OthersService.getTypes()
      .subscribe((res) => {
        this.types = res;
      });
  }
  populatetOthers(TypeId: string) {
    this.OthersService.getOthers(TypeId)
      .subscribe((res) => {
        this.others = res;
        // let test = 0;
      }, err => {
        this.toastr.successToastr(err);
      });
  }
  public closePopuop(myModal: string, value: string) {
    document.getElementById(myModal).style.display = 'none';
  }
  public openmodal(myModal: string, value: string) {
    this.OthersService.deleteOther(this.deleteData).subscribe((res) => {
      const response = res.split('|');
      this.closePopuop(myModal, '');
      if (response[0] === '1') {
        this.toastr.successToastr(response[1]);
        this.populatetOthers(this.selectedTypeId);
      } else {
        this.toastr.errorToastr(response[1]);
      }
    }, err => {
      console.log('error');
    });
  }

  public deleteData(other: any) {
    this.deleteData = other;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
}
