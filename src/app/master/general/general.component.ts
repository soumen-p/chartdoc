import { Component, OnInit } from '@angular/core';
import { OthersServiceService } from 'src/app/services/others-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
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
  public isRecordFound = false;
  pageOfItems: Array<any>;
  public errMsg: string;
  constructor(private OthersService: OthersServiceService, public toastr: ToastrManager
    , private router: Router) { }

  ngOnInit() {
    this.populatetypes();
    this.OthersService.setOtherbyid(null);
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
        if (this.others.length > 0) {
       
            this.isRecordFound = true;
        }else {
          this.isRecordFound = false;
          this.errMsg = 'No Records to Display.';
        }
        // let test = 0;
      }, err => {
        
        this.toastr.successToastr(err);
      });
  }
  deletedatas:any;
  public closePopuop(myModal: string, value: string) {
    document.getElementById(myModal).style.display = 'none';
  }
  public openmodal(myModal: string, value: string) {
    this.OthersService.deleteOther(this.deletedatas).subscribe((res) => {
      const response = res.split('|');
      this.closePopuop(myModal, '');
      if (response[0] === '1') {
        this.toastr.successToastr("Record deleted sucessfully..");
        this.populatetOthers(this.selectedTypeId);
      } else {
        this.toastr.errorToastr("Record cannot be deleted..");
      }
    }, err => {
      console.log('error');
    });
  }

  public deleteData(other: any) {
    this.deletedatas = other;
    document.getElementById('modalmarkDelete').style.display = 'block';
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  editdata(value:any){
    console.log(value);
    this.OthersService.setOtherbyid(value);
    this.router.navigateByUrl('/app-add-general?id=' + value.id+'&typeid='+this.selectedTypeId );
  }
}
