import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { CommonService } from 'src/app/core/common.service';
import { SharedService } from 'src/app/core/shared.service';

@Component({
  selector: 'app-patient-prescriptions',
  templateUrl: './patient-prescriptions.component.html',
  styleUrls: ['./patient-prescriptions.component.css'],
  providers: [DatePipe]
})
export class PatientPrescriptionsComponent implements OnInit {

  public parameterString: string;
  mac: string;
  url: string;
  currDate: string;
  patientRcopiaId: string;
  patientRcopiaName: string;
  constructor(private sanitizer: DomSanitizer,
              private datePipe: DatePipe, private sharedService: SharedService) { }

  ngOnInit() {
    this.patientRcopiaId = this.sharedService.getLocalItem('patientInfo').rcopiaId;
    this.patientRcopiaName = this.sharedService.getLocalItem('patientInfo').rcopiaName;
  }

  getRcopia() {
    this.currDate = this.datePipe.transform(new Date().toUTCString(), 'MMddyyHHmmss', 'GMT');
    // tslint:disable-next-line: max-line-length
    this.parameterString = 'rcopia_portal_system_name=ravendor1259&rcopia_practice_user_name=rc980013&rcopia_user_external_id=provider_rc980013_1571953807&service=rcopia&action=login&startup_screen=patient&rcopia_patient_system_name=' +
    this.patientRcopiaName + '&rcopia_patient_external_id=' + this.patientRcopiaId + '&skip_auth=n&time=' + this.currDate + 'u3k68vgz';
    this.mac = '&MAC=' + Md5.hashStr(this.parameterString).toString().toUpperCase();
    this.parameterString = this.parameterString.replace('u3k68vgz', this.mac);
    this.url = 'https://web4.staging.drfirst.com/sso/portalServices?' + this.parameterString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
