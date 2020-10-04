import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { EventInput } from '@fullcalendar/core';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { OfficeCalendarService } from '../services/officecalendar.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OfficeCalendarReasons } from '../models/office-calendar-reasons';
@Component({
    selector: 'office-calendar-appointment',
    templateUrl: './officecalendar.component.html',
    styleUrls: ['./officecalendar.component.css'],
    providers: [DatePipe]
})
export class OfficeCalendarComponent implements OnInit {

    constructor(private router: Router,
                private loginService: AuthenticationService,
                private formBuilder: FormBuilder,
                public datepipe: DatePipe,
                public appointmentService: AppointmentService,
                public officeCalendarService: OfficeCalendarService,
                public toastr: ToastrManager
    ) {
        const current = new Date();
        this.minDate = current;

        this.officecalendarForm = this.formBuilder.group({
            id: ['0'],
            tag: ['A', [Validators.required]],
            doctorId: ['0', [Validators.required]],
            calendardate: ['', [Validators.required]],
            fromTime: ['', [Validators.required]],
            toTime: ['', [Validators.required]],
            booingTag: ['1', [Validators.required]],
            eventReason: [''],
            date: ['']
        });
        let OfficeCalendar = this.officeCalendarService.getCalendar('OfficeCalendar');
        if (OfficeCalendar.calendardId == 0) {
            this.officecalendarForm.patchValue({
                calendardate: new Date(OfficeCalendar.Date.substring(6, 10) + '-' + OfficeCalendar.Date.substring(0, 2) + '-' + OfficeCalendar.Date.substring(3, 5)),
                date: OfficeCalendar.Date,
                fromTime: { hour: this.officeCalendarService.hourreturn( Number(OfficeCalendar.starttime.split(':')[0])), minute: Number(OfficeCalendar.starttime.split(':')[1]), second: 0 },//rowdata.FromTime.substring(0, 5),
                toTime: { hour: this.officeCalendarService.hourreturn( Number(OfficeCalendar.endtime.split(':')[0])), minute: Number(OfficeCalendar.endtime.split(':')[1]), second: 0 }, //rowdata.ToTime.substring(0, 5),
            });
        }

    }
    formData = new FormData();
    @ViewChild('formDir', { static: false }) private formDirective: NgForm;
    officecalendarForm: FormGroup;
    doctors: any;
    calendardtl: any;
    today = new Date();
    minDate = undefined;
    Reasons: OfficeCalendarReasons[] = [];
    error: boolean;
    deletedata:any;
    getAllReasons() {
        this.appointmentService.getAllReasons()
            .subscribe((res) => {
                for (let i = 0; i < res.length; i++) {
                    let data: OfficeCalendarReasons;
                    data = res[i] as OfficeCalendarReasons;
                    this.Reasons.push(data);
                }
                console.log('Reasons%o', this.Reasons);
            }, err => {
                console.log(err);
            });
    }

    ngOnInit() {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let strdate = mm + '' + dd + '' + yyyy;
        let OfficeCalendar = this.officeCalendarService.getCalendar('OfficeCalendar');
        this.getDoctorList(strdate);
        this.getAllServices(OfficeCalendar.calendardId);
        this.doctorselect();
        this.getAllReasons();
    }
    timeValidation(): boolean {
        if (this.officecalendarForm.value.toTime.hour == 18 && this.officecalendarForm.value.toTime.minute >= 1) {
            this.toastr.errorToastr('Invalid To Time', 'Oops!', { showCloseButton: true });
            return false;
        }
        if (this.officecalendarForm.value.fromTime.hour < 8 || this.officecalendarForm.value.fromTime.hour > 18) {
            this.toastr.errorToastr('Invalid From Time', 'Oops!', { showCloseButton: true });
            return false;
        }
        if (this.officecalendarForm.value.toTime.hour < 8 || this.officecalendarForm.value.toTime.hour > 18) {
            this.toastr.errorToastr('Invalid To Time', 'Oops!', { showCloseButton: true });
            return false;
        }
        if (this.officecalendarForm.value.fromTime.hour > this.officecalendarForm.value.toTime.hour) {
            this.toastr.errorToastr('From time cannot be less than To time ', 'Oops!', { showCloseButton: true });
            return false;
        } else if (this.officecalendarForm.value.fromTime.hour == this.officecalendarForm.value.toTime.hour
            && this.officecalendarForm.value.fromTime.minute > this.officecalendarForm.value.toTime.minute) {
            this.toastr.errorToastr('From time cannot be less than To time ', 'Oops!', { showCloseButton: true });
            return false;
        } else if (!this.ValidateFromToTime(this.officecalendarForm.value.fromTime.minute, this.officecalendarForm.value.toTime.minute)) {
            this.toastr.errorToastr('Minutes should be in multiple of \'15\' in From and To time ', 'Oops!', { showCloseButton: true });
            return false;
        }
        return true;
    }

    ValidateFromToTime(from: string, to: string): boolean {
        if ((Number(from) == 0 || Number(from) == 15 || Number(from) == 30 || Number(from) == 45) &&
            (Number(to) == 0 || Number(to) == 15 || Number(to) == 30 || Number(to) == 45))
            return true;
        else return false;
    }

    save() {
        let fromtime = this.officecalendarForm.value.fromTime;
        let toTime = this.officecalendarForm.value.toTime;
        if (!this.officecalendarForm.valid) {
            return;
        } else {
            if (this.timeValidation()) {
                this.officecalendarForm.value.date = String(this.officecalendarForm.value.calendardate.getMonth() + 1).padStart(2, '0') + '/' +
                    String(this.officecalendarForm.value.calendardate.getDate()).padStart(2, '0') + '/' +
                    this.officecalendarForm.value.calendardate.getFullYear();
                this.officecalendarForm.value.doctorId = this.officecalendarForm.controls['doctorId'].value;
                this.officecalendarForm.value.fromTime = String(this.officecalendarForm.value.fromTime.hour).padStart(2, '0') + ':' +
                    String(this.officecalendarForm.value.fromTime.minute).padStart(2, '0');
                this.officecalendarForm.value.toTime = String(this.officecalendarForm.value.toTime.hour).padStart(2, '0') + ':' +
                    String(this.officecalendarForm.value.toTime.minute).padStart(2, '0');
                console.log(this.officecalendarForm.value);


                this.officeCalendarService.saveCalendar(this.officecalendarForm.value)
                    .subscribe((res) => {
                        console.log('Response:%o', res);
                        this.formDirective.resetForm();
                        // this.officecalendarForm.reset();
                        this.officecalendarForm.patchValue({
                            tag: 'A',
                            doctorId: '0',
                            booingTag: '1',
                            date: '',
                            calendardate: '',
                            fromTime: '',
                            toTime: '',
                            eventReason: '',
                            id: 0
                        });
                        this.toastr.successToastr('Save Sucessfully...', '', { showCloseButton: true });
                        this.router.navigateByUrl('/calendar-schedule');
                        this.getAllServices(0);

                    }, err => {
                        console.log(err);
                        this.toastr.errorToastr(String(err) + ' , please contact system admin!', 'Oops!', { showCloseButton: true });
                        this.officecalendarForm.value.fromTime = fromtime;
                        this.officecalendarForm.value.fromTime = toTime;
                    });
            }
        }
    }
    getDoctorList(strdate: any) {
        this.appointmentService.getDoctorList(strdate)
            .subscribe((res) => {
                this.doctors = res;

            },
                err => {
                    console.log(err);
                });
    }
    getAllServices(value: any) {
        this.officeCalendarService.getAllCalendar()
            .subscribe((res) => {
                this.calendardtl = res;
                if (value > 0) {
                    let obj = this.calendardtl.filter((x: any) => x.Id == value)[0];
                    this.rowclick(obj);
                }

            }, err => {
                console.log(err);
            });
    }
    reset(): void {
        this.officecalendarForm.reset();
        this.officecalendarForm.patchValue({
            tag: 'A',
            doctorId: '0',
            booingTag: '1',
            id: 0
        });
        this.router.navigateByUrl('/calendar-schedule');
    }
    rowclick(rowdata: any) {
        let strtdate = rowdata.date.substring(6, 10) + '' + rowdata.date.substring(0, 2) + '' + rowdata.date.substring(3, 5);
        let fromhr = rowdata.fromTime.split(':')[0];
        let frommmin = rowdata.fromTime.split(':')[1];
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let strdate1 = yyyy + '' + mm + '' + dd;
        if (Number(strtdate) >= Number(strdate1)) {
            this.officecalendarForm.patchValue({
                id: rowdata.id,
                tag: rowdata.tag,
                doctorId: rowdata.doctorId,
                booingTag: rowdata.booingTag == '' ? 1 : rowdata.booingTag,
                // tslint:disable-next-line: max-line-length
                calendardate: new Date(rowdata.date.substring(6, 10) + '-' + rowdata.date.substring(0, 2) + '-' + rowdata.date.substring(3, 5)),
                date: rowdata.date,
                fromTime: { hour: Number(fromhr), minute: Number(frommmin), second: 0 },//rowdata.FromTime.substring(0, 5),
                // tslint:disable-next-line: max-line-length
                toTime: { hour: Number(rowdata.toTime.split(':')[0]), minute: Number(rowdata.toTime.split(':')[1]), second: 0 }, //rowdata.ToTime.substring(0, 5),
                eventReason: rowdata.eventReason,

            });
        } else {
            // tslint:disable-next-line: max-line-length
            this.toastr.infoToastr('Creating & editing an event of previous date is not permitted' + ' , please contact system admin!', 'Info!');
        }
    }
    doctorselect() {
        if (this.officecalendarForm.value.tag == 'A') {
            this.officecalendarForm.controls['doctorId']!.disable();
        } else {
            this.officecalendarForm.controls['doctorId']!.enable();
        }
        this.officecalendarForm.patchValue({

            doctorId: '0'

        });
    }
    public changedfromtime(): void {
        if (this.officecalendarForm.controls['fromTime'].value == null) {

        } else {
            if (this.officecalendarForm.controls['fromTime'].value != null &&
                // tslint:disable-next-line: max-line-length
                this.officecalendarForm.controls['fromTime'].value.hour < 8 || this.officecalendarForm.controls['fromTime'].value.hour >= 18) {
                this.toastr.errorToastr('Invalid From Time', 'Oops!', { showCloseButton: true });
                this.officecalendarForm.patchValue({
                    fromTime: { hour: 8, minute: 0, second: 0 },
                    toTime: { hour: 8, minute:15, second: 0 }
                });
                return;
            } else if (this.officecalendarForm.controls['fromTime'].value.hour > this.officecalendarForm.controls['toTime'].value.hour) {
                // this.toastr.errorToastr("From time cannot be less than To time ", 'Oops!');
                if (this.officecalendarForm.controls['fromTime'].value.hour == 17) {
                    this.officecalendarForm.patchValue({
                        toTime: {
                            hour: this.officecalendarForm.controls['fromTime'].value.hour,
                            minute: this.officecalendarForm.controls['toTime'].value.minute, second: 0
                        }

                    });
                } else {
                    if (this.officecalendarForm.controls['fromTime'].value.hour >= 18) {
                        this.officecalendarForm.patchValue({
                            fromTime: { hour: 8, minute: 0, second: 0 },
                            toTime: { hour: 8, minute: 15, second: 0 }
                        });
                    } else {
                        this.officecalendarForm.patchValue({
                            toTime: {
                                hour: this.officecalendarForm.controls['toTime'].value.hour + 1,
                                minute: this.officecalendarForm.controls['toTime'].value.minute, second: 0
                            }

                        });
                    }
                }
                return;
            } else if (this.officecalendarForm.controls['fromTime'].value.hour == this.officecalendarForm.controls['toTime'].value.hour
                && this.officecalendarForm.controls['fromTime'].value.minute >= this.officecalendarForm.controls['toTime'].value.minute) {
                // tslint:disable-next-line: max-line-length
                if (this.officecalendarForm.controls['toTime'].value.hour == 8 && this.officecalendarForm.controls['toTime'].value.minute == 0) {
                    this.officecalendarForm.patchValue({
                        toTime: { hour: 8, minute: 15, second: 0 },
                        fromTime: { hour: 8, minute: 0, second: 0 },
                    });
                    return;
                }
            }
            if (Number(this.officecalendarForm.controls['fromTime'].value.minute) == 45) {
                this.officecalendarForm.patchValue({
                    toTime: {
                        hour: this.officecalendarForm.controls['fromTime'].value.hour + 1,
                        minute: 0, second: 0
                    }
                });
            } else {
                this.officecalendarForm.patchValue({
                    toTime: {
                        hour: this.officecalendarForm.controls['fromTime'].value.hour,
                        minute: 15 + this.officecalendarForm.controls['fromTime'].value.minute, second: 0
                    }
                });
            }
        }
    }
    public changedtotime(): void {
        if (this.officecalendarForm.controls['toTime'].value == null) {

        } else {
            if (this.officecalendarForm.controls['toTime'].value != null &&
                this.officecalendarForm.controls['toTime'].value.hour < 8 || (this.officecalendarForm.controls['toTime'].value.hour >= 18 && this.officecalendarForm.controls['toTime'].value.minute > 0)) {
                this.toastr.errorToastr('Invalid To Time', 'Oops!', { showCloseButton: true });
                this.officecalendarForm.patchValue({
                    toTime: { hour: 8, minute: 15, second: 0 },
                    fromTime: { hour: 8, minute: 0, second: 0 },
                });
                return;
            } else if (this.officecalendarForm.controls['fromTime'].value.hour > this.officecalendarForm.controls['toTime'].value.hour) {
                //this.toastr.errorToastr("From time cannot be less than To time ", 'Oops!');
                this.officecalendarForm.patchValue({
                    toTime: { hour: 8, minute: 15, second: 0 },
                    fromTime: { hour: 8, minute: 0, second: 0 },
                });
                return;
            } else if (this.officecalendarForm.controls['fromTime'].value.hour == this.officecalendarForm.controls['toTime'].value.hour
                && this.officecalendarForm.controls['fromTime'].value.minute >= this.officecalendarForm.controls['toTime'].value.minute) {
               if (this.officecalendarForm.controls['toTime'].value.hour == 8 && this.officecalendarForm.controls['toTime'].value.minute == 0) {
                    this.officecalendarForm.patchValue({
                        toTime: { hour: 8, minute: 15, second: 0 },
                        fromTime: { hour: 8, minute: 0, second: 0 },
                    });
                    return;
                }
               if (Number(this.officecalendarForm.controls['toTime'].value.minute) == 0) {
                    this.officecalendarForm.patchValue({
                        fromTime: {
                            hour: this.officecalendarForm.controls['toTime'].value.hour - 1,
                            minute: 45, second: 0
                        }
                    });
                } else {
                    this.officecalendarForm.patchValue({
                        fromTime: {
                            hour: this.officecalendarForm.controls['toTime'].value.hour,
                            minute: this.officecalendarForm.controls['toTime'].value.minute - 15, second: 0
                        }
                    });
                }
               return;
            }
        }
    }
    rowdelete(rowdata: any) {
        let strtdate = rowdata.date.substring(6, 10) + '' + rowdata.date.substring(0, 2) + '' + rowdata.date.substring(3, 5);
        let fromhr = rowdata.fromTime.split(':')[0];
        let frommmin = rowdata.fromTime.split(':')[1];
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let strdate1 = yyyy + '' + mm + '' + dd;
        if (Number(strtdate) >= Number(strdate1)) {
         this.deletedata=rowdata;
            document.getElementById('modalmarkDelete').style.display = 'block';
        }
        else {
            // tslint:disable-next-line: max-line-length
            this.toastr.infoToastr('Creating & editing an event of previous date is not permitted' + ' , please contact system admin!', 'Info!');
        }
    }
    public openmodal(myModal: string, value: any) {
        this.error = false;
        this.officeCalendarService.deleteCalendar(this.deletedata.id)
            .subscribe((res) => {
                document.getElementById(myModal).style.display = 'none';
                this.toastr.successToastr('Delete Sucessfully...', '', { showCloseButton: true });
                this.getAllServices(0);
            }, err => {
                console.log(err);
            });
        document.getElementById(myModal).style.display = 'block';
    }
    public closePopuop(myModal: string, roomNo: string) {
        document.getElementById(myModal).style.display = 'none';
    }
}
