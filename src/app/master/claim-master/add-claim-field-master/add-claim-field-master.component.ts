import { Component, OnInit } from '@angular/core';
import { ClaimFieldMasterService } from 'src/app/services/claim-field-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-claim-field-master',
  templateUrl: './add-claim-field-master.component.html',
  styleUrls: ['./add-claim-field-master.component.css']
})
export class AddClaimFieldMasterComponent implements OnInit {

  claimId: any ;
  claimName: string ;
  claimType: string ;
  claimDetailValue:string;
  drpType: any = '';

  claimFieldDetailList : any;

  constructor(private claimFieldMasterService: ClaimFieldMasterService, private route: ActivatedRoute
    ,public toastr: ToastrManager,private router: Router) { }

  ngOnInit() {
    this.claimFieldDetailList = [];

      this.route.queryParams.subscribe(params => {
        this.claimId = params['id'];
        this.claimName = params['claimName'];
        this.claimType = params['claimType'];
        if(this.claimId != null ){
          if(this.claimType == 'D'){
          this.drpType = 'D';
          this.getClaimFieldsDetails(this.claimId);
          }
          else
          this.drpType = 'T';

        }
        
      });

  }

  getClaimFieldsDetails(id: string) {
    this.claimFieldMasterService.getClaimFieldsDetails(id)
     .subscribe((res) => {
    
      this.claimFieldDetailList = res;
     }, err => {
       
     });
  }

  addClaimDetail(){
    if(this.claimDetailValue==""){
      this.toastr.errorToastr('Value requried');
      return;
    }
    if(this.claimFieldDetailList == undefined)
     this.claimFieldDetailList = [];

      if(this.claimFieldDetailList.length>0 && this.claimFieldDetailList.filter(x=>x.value==this.claimDetailValue).length>0) {
        this.toastr.errorToastr('Duplicate value');
        return;
      }
     
    this.claimFieldDetailList.push({id:this.claimId, value: this.claimDetailValue});

    this.claimDetailValue = '';
    
  }

  deleteClaimDetail(claimDetail:any,index:number ){
    this.claimFieldDetailList.splice(index, 1);
  }

  saveClaimFieldsDetails() {
    if(this.claimName=="" || this.claimName==undefined){
      this.toastr.errorToastr('Name requried');
      return;
    }
    if(this.drpType==""){
      this.toastr.errorToastr('Type requried');
      return;
    }
    if(this.drpType == 'D' && this.claimFieldDetailList.length<=0 )
    {
      this.toastr.errorToastr('Claim detail requried');
      return;
    }
    var claimFieldData = new FormData();
    if(this.claimId != null)
    claimFieldData.append('id', JSON.stringify(this.claimId));
    else
    claimFieldData.append('id', '0');
    claimFieldData.append('name', JSON.stringify(this.claimName));
    claimFieldData.append('type', JSON.stringify(this.drpType));

    if(this.drpType == 'D' && this.claimFieldDetailList.length>0 )
    {
      claimFieldData.append('claimFieldDetails', JSON.stringify(this.claimFieldDetailList));
    }

     this.claimFieldMasterService.saveClaimFieldsDetails(claimFieldData)
    .subscribe(
      data => {
        if (data == "1") {
          this.toastr.successToastr('Save Sucessfully..');
          this.router.navigate(['/app-claim-field-master']);
        }  else if (data == '-1')  {
          this.toastr.errorToastr("Data already exists");
        }else {
          this.toastr.errorToastr(data);
        }
      }
      , err => {
        this.toastr.errorToastr(err);
      });
  }


}
