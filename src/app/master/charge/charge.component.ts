import { Component, OnInit } from '@angular/core';
import { PatientCptService } from '../../services/patient-cpt.service';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ChargeCPTModel } from '../../models/ChargeCPT.model';
import { isNullOrUndefined } from 'util';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';


const form = new FormGroup({
  id: new FormControl(),
  chargeYearId: new FormControl(),
  cptId: new FormControl,
  cptCode: new FormControl(),
  cptDescription: new FormControl(),
  amount: new FormControl()

});

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})

export class ChargeComponent implements OnInit {
  cptCode: any;
  cptDesc: any;
  cptDetailss: ChargeCPTModel[];
  public admin = false;
  public searchTerm: string;
  public tblvisibility = false;
  isIdExist: boolean;
  formCPT: FormGroup;
  patientInfo: [] = [];
  PatientId: string;
  cptDetails: Array<ChargeCPTModel> = [];
  frm: ChargeCPTModel[] = [];
  public tblvisibilityOnload = false;
  message: string;
  IsPosCheckOut = false;
  chargeDateRange: [];
  selectedChargeYearId : any;
  constructor(private patientCptService: PatientCptService, private serviceMasterService: ServiceMasterService, public toastr: ToastrManager) { }

  ngOnInit() {
    const doctorBookingInfo = this.patientCptService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
      this.IsPosCheckOut = true;
      }

      if (isNullOrUndefined(this.patientCptService.getAllCpt('AllCpt'))) {
        this.patientCptService.getPatientCptDetails()
          .subscribe((res) => {
            this.cptDetailss = res;
            this.patientCptService.setAllCpt('AllCpt', this.cptDetailss);
          });
      } else {
        this.cptDetailss = this.patientCptService.getAllCpt('AllCpt');
      }

     // this.cptDetailss = this.patientCptService.getAllCpt('AllCpt');
 // this.PatientId = this.patientCptService.getPatientDetails('patientInfo').appointmentId;
  // if (isNullOrUndefined(this.patientCptService.getAllCpt('AllCpt'))) {
  //   this.patientCptService.getPatientCptDetails()
  //     .subscribe((res) => {
  //       this.cptDetailss = res;
  //       this.patientCptService.setAllCpt('AllCpt', this.cptDetailss);
  //     },
  //       err => {
  //         console.log(err);
  //       });
  // }  else {
  //   this.cptDetailss = this.patientCptService.getAllCpt('AllCpt');
  // }
  this.tblvisibility = true;


  this.formCPT = new FormGroup({
    id: new FormControl(),
    chargeYearId: new FormControl(),
    cptId: new FormControl,
    cptCode: new FormControl(),
    cptDescription: new FormControl(),
    amount: new FormControl()
  });

  this.getAllChargeDates();
  
}

 selectChange(event: any) {
    this.selectedChargeYearId = event.target.value;
    this.getChargeDetails(this.selectedChargeYearId);
  }

getAllChargeDates() {
  
  this.serviceMasterService.getAllChargeDates(" "," ")
   .subscribe((res) => {
     console.log(res);
     this.chargeDateRange = res;
        
   }, err => {
     console.log(err);
   });
}

getChargeDetails(yearId: number){
  this.cptDetails.pop();
  this.serviceMasterService.getChargeDetails(yearId)
  .subscribe((data) => {
    data.forEach(element => {
      this.AddCPTDetails(element.id, element.cptId,element.cptCode,element.cptDescription,element.chargeYearId,element.amount);
    });
   
  },
    err => {
      console.log(err);
    });
  
  }

  AddCPTCode(cptId: number, cptCode: string, cptDesc: string){
    this.AddCPTDetails(0,cptId,cptCode,cptDesc,this.selectedChargeYearId,0);
  };

AddCPTDetails(id: number,cptId: number, cptCode: string, cptDesc: string, chargeYearId : number,amount: number ) {
  this.tblvisibility = true;
  
  form.patchValue({id:id, cptId: cptId, cptCode: cptCode, cptDescription: cptDesc, 
    chargeYearId : chargeYearId, amount: amount  });

  this.isIdExist = false;
  this.cptDetails.forEach(element => {
    if (element.cptId === cptId) {
      this.isIdExist = true;
    }
  });

  if (!this.isIdExist) {
    this.cptDetails.pop();
    this.cptDetails.push(form.value);
   // this.patientCptService.setCptDetailsByPatientId('cpt' + this.PatientId, this.cptDetails);
  }
  console.log("this.cptDetails");
  console.log(this.cptDetails);
}

deleteRow(cpt: ChargeCPTModel) {
  const index: number = this.cptDetails.indexOf(cpt);
  this.cptDetails.splice(index, 1);
  if (this.cptDetails.length < 1) {
    this.tblvisibility = false;
  }
}

public saveChargeDetails(e: Event) {
 // console.log(this.frm);
  e.preventDefault();
  while (this.frm.length) {
    this.frm.pop();
  }
  this.cptDetails.forEach(item => {
    console.log(item);

    this.formCPT.patchValue({
      cptCode: item.cptCode,
      cptDescription: item.cptDescription,
      id: item.id,
      cptId: item.cptId,
      chargeYearId: item.chargeYearId,
      amount: item.amount
    });
    this.frm.push(this.formCPT.value);
  });
 
  console.log(this.frm);

  this.serviceMasterService.saveChargeDetails(this.cptDetails[0])
    .subscribe(
      data => {
        if (data > 0) {
         // this.patientCptService.setCptDetailsByPatientId('cpt' + this.PatientId, this.cptDetails);
          this.toastr.successToastr('Operation Successful');
        }  else {
          this.toastr.successToastr('Operation Unsuccessful');
        }
      }
    );
}
}
