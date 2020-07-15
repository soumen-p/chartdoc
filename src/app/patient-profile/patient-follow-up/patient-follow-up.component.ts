import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/common.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientFollowupService } from '../../services/patient-followup.service';
import { dateSelectionJoinTransformer } from '@fullcalendar/core';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-patient-follow-up',
  templateUrl: './patient-follow-up.component.html',
  styleUrls: ['./patient-follow-up.component.css']
})
export class PatientFollowUpComponent implements OnInit, OnDestroy {
  oneDayImageName = 'btn-day.png';
  oneWeekImageName = 'btn-week.png';
  oneMonthImageName = 'btn-month.png';
  threeMonthImageName = 'btn-month-3.png';
  sixMonthImageName = 'btn-month-6.png';
  oneYearImageName = 'btn-year.png';
  scheduleImageName = 'btn-scheduleD.png';
  isPosCheckOut = false;
  pipe = new DatePipe('en-US');
  followUpDate: string;
  followUpDateImage: string;
  latestFollowup: string;
  message: string;
  formFollowup: FormGroup;
  patientId: string;
  commonSubscription: Subscription;
  apiSubscription: Subscription;
  flag: string;
  patientInfo: any;
  mindate: Date;
  constructor(private FollowupService: PatientFollowupService, private commonService: CommonService, public toastr: ToastrManager) { }
  ngOnDestroy() {
  }

  ngOnInit() {
    this.mindate = new Date();
    const doctorBookingInfo = this.FollowupService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo.positionID !== 'undefined' && doctorBookingInfo.positionID === '-3') {
      this.isPosCheckOut = true;
    }
    this.patientInfo = this.FollowupService.getPatientDetails('patientInfo');
    this.patientId = this.patientInfo.appointmentId;
    this.flag = this.patientInfo.flag;
    this.followUpDate = '';
    this.formFollowup = new FormGroup({
      pFollowupDate: new FormControl(''),
      pFollowupPeriod: new FormControl(''),
      patientId: new FormControl('')
    });
    this.commonSubscription = this.commonService.CurrentFollowUpLatest.subscribe
      (
        data => {
          this.latestFollowup = data;
        }
      );
    if (this.latestFollowup === '') {
      this.apiSubscription = this.FollowupService.GetPatientFollowup(this.patientId, this.flag)
        .subscribe((res) => {
          if(res.length>0){
          if (res[0].pFollowupPeriod !== '') {
            this.FollowupDay(res[0].pFollowupPeriod);
          } else if (res[0].pFollowupDate !== '') {
            this.FollowupSelectDate((res[0].pFollowupDate));
          }
        }
        },
          err => {
            console.log(err);
          });
    }
    if (this.latestFollowup === 'SD') {
      this.commonSubscription = this.commonService.CurrentFollowUpDate.subscribe
        (
          data => {
            this.followUpDate = data;
            this.formFollowup.get('pFollowupDate').setValue(data);
          }
        );
    } else {
      this.commonSubscription = this.commonService.CurrentFollowupDay.subscribe
        (
          data => {
            this.followUpDate = data;
            this.formFollowup.get('pFollowupDate').setValue(data);
          }
        );
    }
    if (this.latestFollowup === 'SD') {
      this.commonSubscription = this.commonService.CurrentFollowUpDateImage.subscribe
        (
          data => {
            if (data) {
              this.followUpDateImage = data;
              this.scheduleImageName = this.followUpDateImage;
            }
          }
        );
    } else {
      this.commonSubscription = this.commonService.CurrentFollowupDayImage.subscribe
        (
          data => {
            if (data) {
              this.ResetUnselectedView();
              this.followUpDateImage = data;
              if (this.latestFollowup === '1Day') {
                this.oneDayImageName = this.followUpDateImage;
              }
              if (this.latestFollowup === '1Week') {
                this.oneWeekImageName = this.followUpDateImage;
              }
              if (this.latestFollowup === '1Month') {
                this.oneMonthImageName = this.followUpDateImage;
              }
              if (this.latestFollowup === '3Months') {
                this.threeMonthImageName = this.followUpDateImage;
              }
              if (this.latestFollowup === '6Months') {
                this.sixMonthImageName = this.followUpDateImage;
              }
              if (this.latestFollowup === '1Year') {
                this.oneYearImageName = this.followUpDateImage;
              }
            }
          }
        );
    }
  }

  FollowupDay(value: string) {
    this.latestFollowup = value;
    this.UpdateFollowUpDayView(value);
  }
  UpdateFollowUpDayView(value: string) {
    this.ResetUnselectedView();
    if (value === '1Day') {
      this.followUpDate = '1Day';
      this.oneDayImageName = 'btn-day-hover.png';
      this.commonService.FollowUp('1Day');
      this.commonService.FollowupDay('1 Day');
      this.commonService.FollowupDayImage('btn-day-hover.png');
      this.SetDateLabelVal('1Day');
    } else
      if (value === '1Week') {
        this.followUpDate = '1Week';
        this.oneWeekImageName = 'btn-week-hover.png';
        this.commonService.FollowUp('1Week');
        this.commonService.FollowupDay('1 Week');
        this.commonService.FollowupDayImage('btn-week-hover.png');
        this.SetDateLabelVal('1Week');
      } else if (value === '1Month') {
        this.followUpDate = '1Month';
        this.oneMonthImageName = 'btn-month-hover.png';
        this.commonService.FollowUp('1Month');
        this.commonService.FollowupDay('1 Month');
        this.commonService.FollowupDayImage('btn-month-hover.png');
        this.SetDateLabelVal('1Month');
      } else if (value === '3Months') {
        this.followUpDate = '3Months';
        this.threeMonthImageName = 'btn-month-3-hover.png';
        this.commonService.FollowUp('3Months');
        this.commonService.FollowupDay('3 Months');
        this.commonService.FollowupDayImage('btn-month-3-hover.png');
        this.SetDateLabelVal('3Months');
      } else if (value === '6Months') {
        this.followUpDate = '6Months';
        this.sixMonthImageName = 'btn-month-6-hover.png';
        this.commonService.FollowUp('6Months');
        this.commonService.FollowupDay('6 Months');
        this.commonService.FollowupDayImage('btn-month-6-hover.png');
        this.SetDateLabelVal('6Months');
      } else if (value === '1Year') {
        this.followUpDate = '1Year';
        this.oneYearImageName = 'btn-year-hover.png';
        this.commonService.FollowUp('1Year');
        this.commonService.FollowupDay('1 Year');
        this.commonService.FollowupDayImage('btn-year-hover.png');
        this.SetDateLabelVal('1Year');
      }
  }
  FollowupSelectDate(value: string): void {
    this.ResetUnselectedView();
    this.latestFollowup = 'SD';
    this.commonService.FollowUp('SD');
    this.commonService.FollowupDate(this.pipe.transform(new Date(value), 'MMM dd,yyyy'));
    this.commonService.FollowupDateImage('btn-scheduleD-hover.png');
    this.followUpDate = this.pipe.transform(new Date(value), 'MMM dd,yyyy');
    this.SetDateLabelVal(this.pipe.transform(new Date(value), 'MMM dd,yyyy'));
    this.scheduleImageName = 'btn-scheduleD-hover.png';
  }
  SetDateLabelVal(value: string) {
    this.formFollowup.get('pFollowupDate').setValue(value);
  }
  ResetUnselectedView() {
    this.oneDayImageName = 'btn-day.png';
    this.oneWeekImageName = 'btn-week.png';
    this.oneMonthImageName = 'btn-month.png';
    this.threeMonthImageName = 'btn-month-3.png';
    this.sixMonthImageName = 'btn-month-6.png';
    this.oneYearImageName = 'btn-year.png';
    this.scheduleImageName = 'btn-scheduleD.png';
  }
  public saveFollowUp() {

    if (this.latestFollowup === 'SD') {
      this.formFollowup.setValue({
        pFollowupDate: this.followUpDate,
        pFollowupPeriod: '',
        patientId: this.patientId
      });
    } else {
      this.followUpDate = this.followUpDate.replace(' ', '');
      this.formFollowup.setValue({
        pFollowupDate: '',
        pFollowupPeriod: this.followUpDate,
        patientId: this.patientId
      });
    }
    this.FollowupService.saveFolloUp(this.formFollowup.value).subscribe
      (
        data => {
          if (data > 0) {
            this.toastr.successToastr('Operation Successful');
          } else {
            this.toastr.successToastr('Operation Unsuccessful');
          }
        }
      );
  }
}
