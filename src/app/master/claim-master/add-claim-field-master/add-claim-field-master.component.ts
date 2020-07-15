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

  constructor(private claimFieldMasterService: ClaimFieldMasterService, private route: ActivatedRoute,public toastr: ToastrManager) { }

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
       console.log(err);
     });
  }

  addClaimDetail(){
    
    if(this.claimFieldDetailList == undefined)
     this.claimFieldDetailList = [];

    this.claimFieldDetailList.push({id:this.claimId, value: this.claimDetailValue});

    this.claimDetailValue = '';
    //console.log(this.claimFieldDetailList);
  }

  deleteClaimDetail(claimDetail:any,index:number ){
    this.claimFieldDetailList.splice(index, 1);
  }

  saveClaimFieldsDetails() {
    var claimFieldData = new FormData();
    if(this.claimId != null)
    claimFieldData.append('id', JSON.stringify(this.claimId));
    else
    claimFieldData.append('id', '0');
    claimFieldData.append('name', JSON.stringify(this.claimName));
    claimFieldData.append('type', JSON.stringify(this.drpType));

    if(this.drpType == 'D')
    {
      claimFieldData.append('claimFieldDetails', JSON.stringify(this.claimFieldDetailList));
    }

     this.claimFieldMasterService.saveClaimFieldsDetails(claimFieldData)
    .subscribe(
      data => {
        if (data == null) {
          this.toastr.successToastr('Operation Successful');
        }  else {
          this.toastr.successToastr('Operation Unsuccessful');
        }
      }
    );
  }


}
