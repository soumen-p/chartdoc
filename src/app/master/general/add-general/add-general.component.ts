import { Component, OnInit ,ViewChild, ElementRef,
  AfterViewChecked} from '@angular/core';
import { OthersServiceService } from '../../../services/others-service.service'
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { OtherSave } from '../../../models/other-save';
//import { TabHeadingDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-general',
  templateUrl: './add-general.component.html',
  styleUrls: ['./add-general.component.css']
})
export class AddGeneralComponent implements OnInit {
 
  selectedTypeId = '';
  Types: any[];
  tableId:any=3;
  OtherValues: OtherSave = new OtherSave();
  divclass:string="form-group col-md-4";
  divclass1:string="form-group col-md-3";
  code:any="";
  othermasterid:any="";
  description:any="";
  constructor(private OthersService: OthersServiceService, private activatedRoute: ActivatedRoute,
     public toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
    this.populatetypes();
    
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.OthersService.getOtherbyid()!=undefined || this.OthersService.getOtherbyid()!=null){
        let data=this.OthersService.getOtherbyid().name.split('~');
        this.selectedTypeId=params['typeid'];
        this.othermasterid=params["id"];
        if(data.length>1){
          this.code=data[0];
          this.description=data[1];
          this.tableId=4;
          this.divclass="form-group col-md-3";
        }else{
          this.description=data[0];
          this.tableId=3;
          this.divclass="form-group col-md-4";
        }
      }
      })
  }
  selectChangeHandler(event: any) {
    // update the ui
    this.selectedTypeId = event.target.value;
    let obj=this.Types.filter((x:any)=>x.id==event.target.value)[0];
    if(obj.name=="Allergies" ||obj.name=="IMMUNIZATIONS" ){
      this.tableId=4;
      this.divclass="form-group col-md-3";
    }else{
      this.tableId=3;
      this.divclass="form-group col-md-4";
    }
    
  }

  populatetypes() {
    this.OthersService.getTypes()
      .subscribe((res) => {
        this.Types = res;
      });
  }
  SaveOther() {
    if (this.selectedTypeId === '' || this.selectedTypeId === '-1') {
      this.toastr.warningToastr('Select Type');
      return;
    } 
    else if ( this.code === '' && this.tableId==4) {
      this.toastr.warningToastr('Add code');
      return;
    } 
    else if (this.description === '') {
      this.toastr.warningToastr('Add description');
      return;
    } else {
      const category: OtherSave = {
        id: this.othermasterid==""?'0':this.othermasterid,
        name:this.code==""? this.description:this.code+"~"+this.description,
        type: this.selectedTypeId
      };
      this.OthersService.saveOther(category)
        .subscribe((res) => {
          const result = res.split('|');
          if (result[0] === '1') {
            this.toastr.successToastr("Save Sucessfully..");
            this.router.navigate(['/app-general']);
          }
          else if (result[0] === '-1') {
            this.toastr.errorToastr("Data already exists");
          }
           else {
            this.toastr.errorToastr(result[1]);
          }
        }, err => {
          this.toastr.errorToastr(err);
        });
    }
  }
  updatecode(event: any){
    this.code=event.srcElement.value;
  }
}
