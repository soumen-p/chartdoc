import { Component, OnInit } from '@angular/core';
import { ClaimFieldMasterService } from 'src/app/services/claim-field-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-claim-field-master',
  templateUrl: './claim-field-master.component.html',
  styleUrls: ['./claim-field-master.component.css']
})
export class ClaimFieldMasterComponent implements OnInit {

  claimFieldHeaderList : [];
  claimFieldDetailList : [];
  deletedData:any; 
  constructor(private claimFieldMasterService: ClaimFieldMasterService, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {

    this.getClaimFieldsHeader();
    
  }

  getClaimFieldsHeader() {
    this.claimFieldMasterService.getClaimFieldsHeader()
     .subscribe((res) => {
      this.claimFieldHeaderList = res;
      console.log(res);
     }, err => {
       console.log(err);
     });
 }



editClaimMaster(claim: any){

  this.router.navigateByUrl('/app-add-claim-field-master?id=' + claim.id + '&claimName=' + claim.name + '&claimType=' + claim.type );
  console.log(claim);

}

deleteClaimMaster(claim:any){
  this.deletedData=claim;
  document.getElementById("modalmarkDelete").style.display = "block";
}


public openmodal(myModal: string, value: any) {
  var claimFieldData = new FormData();
  claimFieldData.append('id', JSON.stringify(this.deletedData.id));
  claimFieldData.append('name', JSON.stringify(this.deletedData.name));
  claimFieldData.append('type', JSON.stringify(this.deletedData.type));
  claimFieldData.append('isDeleted', JSON.stringify('Y'));
  this.claimFieldMasterService.saveClaimFieldsDetails(claimFieldData)
    .subscribe(
      data => {
        if (data == "1") {
          this.toastr.successToastr("Record deleted sucessfully..");
          this.getClaimFieldsHeader();
        }  else {
          this.toastr.errorToastr("Record cannot be deleted..");
        }
      }
    );
  document.getElementById(myModal).style.display = "none";
}

public closePopuop(myModal: string) {
  document.getElementById(myModal).style.display = "none";
}

}
