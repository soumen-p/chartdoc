import { Component, OnInit } from '@angular/core';
import { SpecialtyMasterService } from 'src/app/services/specialty-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {
  specialty: [];
  deletedata: any;
  pageOfItems: Array<any>;
  constructor(private specialtyMasterService: SpecialtyMasterService, public toastr: ToastrManager,
    private router: Router) { }

  ngOnInit() {
    this.getAllSpecialty();
  }
  getAllSpecialty() {
    this.specialtyMasterService.getAllSpecialty()
      .subscribe((res) => {
        this.specialty = res;
      }, err => {
        console.log(err);
      });
  }
  editSpecialty(request){
    this.router.navigateByUrl('/new-specialty?id=' + request.pId + '&name=' + request.pCcDescription );
    console.log(request);
  }
  deleteSpecialtyData(request) {
    this.specialtyMasterService.DeleteSpecialty(request).subscribe((res) => {
      const response = res.split('|');
      if (response[0] === '1') {
        this.toastr.successToastr("Record deleted sucessfully..");
        this.closePopup('modalmarkDelete');
        this.getAllSpecialty();
      } else {
        this.toastr.errorToastr("Record cannot be deleted..");
        this.closePopup('modalmarkDelete');
      }
    }, err => {
      console.log('error');
    });
  }

  public openModal(myModal: string, value: any) {
    this.deleteSpecialtyData(this.deletedata);
    document.getElementById(myModal).style.display = 'block';
  }
  deleteSpecialty(value: any) {
    this.deletedata = value;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
  public closePopup(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
