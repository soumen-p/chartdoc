import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder,FormArray,FormControl,ValidatorFn,FormsModule } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { AppointmentService } from '../services/appointment.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
	@ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
    constructor(private router: Router,
        private loginService: AuthenticationService,
        private formBuilder: FormBuilder,
        private avRoute: ActivatedRoute,
        private appointmentService: AppointmentService,
        private config: NgbDatepickerConfig) {
        const current = new Date();
        this.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
		this.alldoctors=false;
		this.selecteddoctors=false;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const strdate = mm + '' + dd + '' + yyyy;
        this.getDoctorList(strdate);
        this.defaultDate = yyyy + '-' + mm + '-' + dd;
    }
    selectable: boolean = true;
    isNew: boolean;
    nextListener: any;
    prevListener: any;
    doctorName: string;
    doctorImg: string;
    errorMsg = '';
    userName: string;
    password: string;
    errorCode: string;
    errorDesc: string;
	doctorsData=[];
  doctorsRes=[];
  doctorsRes1=[];
  alldoctors: boolean;
  selecteddoctors: boolean;
    defaultDate: any;
    @ViewChild(FullCalendarComponent, { static: false }) calendarComponent: any; // the #calendar in the template
    @ViewChild('external', { static: false }) external: ElementRef;
    calendarVisible = true;
    model1: string;
    calendarPlugins = [timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
    calendarWeekends = true;
    calendarEvents: EventInput[] = [];
    minDate = undefined;
    clickCount = 0;
    singleClickTimer: any;
    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit() {
       
        new Draggable(this.external.nativeElement, {
            itemSelector: '.fc-event',
            eventData(eventEl) {
                return {
                    title: eventEl.innerText.substring(0, 1),
                    duration: '00:15:00',
                    overlap: true,
                    // textColor:'#FFFFFF',
                };
            }
        });
        this.bindEvents();
    }
    ngOnInit() {
        this.errorMsg = '';
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        let strdate = mm + '' + dd + '' + yyyy;
        // tslint:disable-next-line: no-string-literal
        if (this.avRoute.snapshot.queryParams['id']) {
            const lastdate = this.appointmentService.getBookingInfo('lastdate');
           // this.defaultDate = lastdate.substring(6, 10) + '-' + lastdate.substring(0, 2) + '-' + lastdate.substring(3, 5);
           this.defaultDate = lastdate.substring(0, 4) + '-' + lastdate.substring(5,7) + '-' + lastdate.substring(8, 10);
            //strdate = lastdate.substring(0, 2) + '' + lastdate.substring(3, 5) + '' + lastdate.substring(6, 10);
            strdate = lastdate.substring(5,7) + '' + lastdate.substring(8, 10) + '' + lastdate.substring(0, 4);
        }
        this.getAppointment(strdate);
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngOnDestroy() {
        // document.body.className = "sidebar-collapse";
    }
	uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }
	checkAll(event: any){
   this.alldoctors=true;
   this.selecteddoctors=false;
   this.doctorsRes=this.doctorsData;
   this.uncheckAll();
}
checkSelect(event: any){
   this.alldoctors=false;
   this.selecteddoctors=true;
   this.doctorsRes=[];
   this.doctorsRes1=[];
   this.uncheckAll();
}

calendarvis() {
	this.calendarVisible=true;
}

selectDoctorapply(){
	this.calendarVisible=false;
	this.doctorsRes1=this.doctorsRes;
	this.doctorsRes=[];
	this.calendarvis();
	this.uncheckAll();
}

checkDoctor(event: any) {
	function match(element, index, array) {		
	return (Number(element.id) == Number(event.target.value)); 
	}
	function unmatch(element, index, array) { 
	return (Number(element.id) != Number(event.target.value)); 
	}
	if(this.doctorsRes.length>0 && this.doctorsRes.filter(match).length>0)
		this.doctorsRes=this.doctorsRes.filter(unmatch);
	else if(this.doctorsRes.length>0)
	{
		let tempdata=this.doctorsRes;
		tempdata.push(this.doctorsData.filter(match)[0]);
		this.doctorsRes=tempdata;
	}
	else
		this.doctorsRes=this.doctorsData.filter(match);
}

    rowclick(arg: any) {
        this.clickCount++;
        const self = this;
        if (this.clickCount === 1) {
            // tslint:disable-next-line: only-arrow-functions
            this.singleClickTimer = setTimeout(function () {
                self.clickCount = 0;
            }, 400);
        } else if (this.clickCount === 2) {
            this.clickCount = 0;
            clearTimeout(this.singleClickTimer);
            if (arg.event.backgroundColor === '#ffc4c4' || arg.event.backgroundColor === '#ffffd8') {
            } else {
                this.clickCount++;
                const doctorid = arg.event.getResources()[0].id;
                const doctorname = arg.event.getResources()[0].title;
                const startdate = new Date(arg.event.start);
                let dd = String(startdate.getDate()).padStart(2, '0');
                let mm = String(startdate.getMonth() + 1).padStart(2, '0'); // January is 0!
                let yyyy = startdate.getFullYear();
                // let strdate = dd+'/'+mm+'/'+yyyy; //mm + '' + dd + '' + yyyy;
                const strdate = `${mm}/${dd}/${yyyy}`;
                const starttime = String(startdate.getHours()) + ':' + String(startdate.getMinutes());

                const enddate = new Date(arg.event.end);
                dd = String(enddate.getDate()).padStart(2, '0');
                mm = String(enddate.getMonth() + 1).padStart(2, '0'); // January is 0!
                yyyy = enddate.getFullYear();
                const enddt = `${mm}${dd}${yyyy}`;
                const endtime = String(enddate.getHours()) + ':' + String(enddate.getMinutes());
                let appointmentId = '0';
                let patientName = '';
                if (arg.event.extendedProps.patientName === undefined) {
                    const temp = arg.el.innerText.split('/');
                    if (temp.length > 1) {
                        patientName = temp[0];
                        appointmentId = temp[1];
                    }
                } else {
                    patientName = arg.event.extendedProps.patientName; // temp[0];
                    appointmentId = arg.event.extendedProps.appointmentId;
                }
                // tslint:disable-next-line: max-line-length
                const patientDetail = this.calendarEvents.filter(x => x.appointmentId === appointmentId && x.patientName === patientName)[0];
                // if(patientDetail != null && patientDetail != undefined){
                this.appointmentService.setBookingInfo('doctorBookingInfo', {
                    doctorid,
                    doctorname, startdate: strdate, enddate: enddt,
                    starttime,
                    endtime, patientname: patientName,
                    patientId: (patientDetail != undefined || patientDetail != null) ? patientDetail.patientID : '',
                    appointmentid: appointmentId,
                    email: (patientDetail != undefined || patientDetail != null) ? patientDetail.email : '',
                    phone: (patientDetail != undefined || patientDetail != null) ? patientDetail.phone : '',
                    dateOfBirth: (patientDetail != undefined || patientDetail != null) ? patientDetail.dateOfBirth : '',
                    gender: (patientDetail != undefined || patientDetail != null) ? patientDetail.gender : '',
                    address: (patientDetail != undefined || patientDetail != null) ? patientDetail.address : '',
                    serviceID: ((patientDetail != undefined || patientDetail != null)
                        && patientDetail.serviceID != '') ? patientDetail.serviceID : '',
                    positionID: ((patientDetail != undefined || patientDetail != null)
                        && patientDetail.positionID != '') ? patientDetail.positionID : '0',
                    reasonID: ((patientDetail != undefined || patientDetail != null)
                        && patientDetail.reasonID != '') ? patientDetail.reasonID : '0',
                    reasonCode: '0',
                    note: (patientDetail != undefined || patientDetail != null) ? patientDetail.note : '',
                    imageUrl: (patientDetail != undefined || patientDetail != null) ? patientDetail.imageUrl : '',
                });
                this.router.navigateByUrl('/book-appointment');
            }
        }
    }
    eventDrop(arg: any) {
    }

    drop(arg: any) {
    }
    datechange(arg: any) {
        this.selectable = true;
        // this.external.nativeElement.style = 'display: visible;';
        const strdate = String(arg.month).padStart(2, '0') + '' + String(arg.day).padStart(2, '0') + '' + arg.year;
        this.defaultDate = arg.year + '-' + String(arg.month).padStart(2, '0') + '-' + String(arg.day).padStart(2, '0');
        this.calendarComponent.calendar.gotoDate(this.defaultDate);
        this.getDoctorList(strdate);
        this.getAppointment(strdate);
		this.doctorsRes=[];
		this.uncheckAll();
    }
    getDoctorList(strdate: any) {
        this.appointmentService.getDoctorList(strdate)
            .subscribe((res) => {
                const tempdata = [];
                res.forEach(element => {
                    tempdata.push({ id: element.id, title: element.name });
                });
                var doctorInfo= this.appointmentService.getBookingInfo("doctorInfo");
                //this.calendarreSources = tempdata.filter((x:any)=>x.id==doctorInfo.doctorId);
				this.doctorsData = tempdata;
            },
                err => {
                   
                });
    }
    getAppointment(strdate: any) {
        const self = this;
        this.appointmentService.getAppointment(strdate)
            .subscribe((res) => {
                const tempdata = [];
                const calendarApi = self.calendarComponent.getApi();
                const nextdaydate = new Date(calendarApi.getDate());
                const dd = String(nextdaydate.getDate()).padStart(2, '0');
                const mm = String(nextdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = nextdaydate.getFullYear();
                const strdate1 = yyyy + '-' + mm + '-' + dd;

                res.forEach((element: any) => {
                    console.log("colorCode ", element.schduleAppoinment)
                    if (element.schduleAppoinment.doctorId != '') {
                        const AppointmentId = String(element.schduleAppoinment.appointmentId) != '0' ? '/' +
                            String(element.schduleAppoinment.appointmentId) : '';
                        tempdata.push({
                            resourceId: element.schduleAppoinment.doctorId,
                            title: element.schduleAppoinment.patientName + AppointmentId,
                            start: strdate1 + 'T' + element.schduleAppoinment.fromTime,
                            end: strdate1 + 'T' + element.schduleAppoinment.toTime,
                            patientName: element.schduleAppoinment.patientName,
                            appointmentId: element.schduleAppoinment.appointmentId,
                            patientID: element.schduleAppoinment.patientId,
                            email: element.schduleAppoinment.email,
                            phone: element.schduleAppoinment.phoneNo
                            , serviceID: element.schduleAppoinment.serviceId,
                            positionID: element.schduleAppoinment.positionId
                            , note: element.schduleAppoinment.note,
                            reasonID: element.schduleAppoinment.reasonId
                            , dateOfBirth: element.schduleAppoinment.dateOfBirth,
                            gender: element.schduleAppoinment.gender,
                            address: element.schduleAppoinment.address,
                            color: element.schduleAppoinment.colorCode.trim(),
                            imageUrl: element.schduleAppoinment.filePath,
                            editable:
                                (element.schduleAppoinment.colorCode.trim() === '#ffc4c4' // holiday
                                    || element.schduleAppoinment.colorCode.trim() === '#ffffd8'
                                    || element.schduleAppoinment.colorCode.trim() === '#d8d8ff') //'Double Booking'
                                    ? false : true,
                            resourceEditable: (element.schduleAppoinment.colorCode.trim() === '#ffc4c4'
                                || element.schduleAppoinment.colorCode.trim() === '#ffffd8'
                                || element.schduleAppoinment.colorCode.trim() === '#d8d8ff') //'Double Booking'
                                ? false : true,
                            overlap:
                                (element.schduleAppoinment.colorCode.trim() === '#ffc4c4' // holiday
                                    || element.schduleAppoinment.colorCode.trim() === '#ffffd8')
                                    ? false : true,
                        });
                    }
                });
                this.calendarEvents = tempdata;
            },
                err => {
                
                });
    }
    bindEvents() {
        //this.selectable=true;
        const prevButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-prev-button');
        const nextButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-next-button');
        const todayButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-today-button');
        nextButton[0].addEventListener('click', () => {
            const calendarApi = this.calendarComponent.getApi();
            const nextdaydate = new Date(calendarApi.getDate());
            const ddnextdaydate = String(nextdaydate.getDate()).padStart(2, '0');
            const mmnextdaydate = String(nextdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyynextdaydate = nextdaydate.getFullYear();
            const strdate = `${mmnextdaydate}${ddnextdaydate}${yyyynextdaydate}`;
            this.getDoctorList(strdate);
            this.getAppointment(strdate);
            
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            const strdate1 = `${mm}${dd}${yyyy}`;
            // if (Number(strdate) < Number(strdate1)) {
            //     this.selectable=false;
            //     //this.external.nativeElement.style = 'display: none;';
            // } else {
            //    // this.external.nativeElement.style = 'display: visible;';
            //    this.selectable=true;
            // }
        });
        prevButton[0].addEventListener('click', () => {
            const calendarApi = this.calendarComponent.getApi();
            const prevdaydate = new Date(calendarApi.getDate());
            const ddprevdaydate = String(prevdaydate.getDate()).padStart(2, '0');
            const mmprevdaydate = String(prevdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyyprevdaydate = prevdaydate.getFullYear();
            const strdate = `${mmprevdaydate}${ddprevdaydate}${yyyyprevdaydate}`;
            this.getDoctorList(strdate);
            this.getAppointment(strdate);
        
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            const strdate1 = `${mm}${dd}${yyyy}`;
            this.selectable = true;
            // this.external.nativeElement.style = 'display: visible;';
            // if (Number(strdate) < Number(strdate1)) {
            //    // this.external.nativeElement.style = 'display: none;';
            //    this.selectable=false;
            // }
        });

        todayButton[0].addEventListener('click', () => {
            const calendarApi = this.calendarComponent.getApi();
            const todaydate = new Date(calendarApi.getDate());
            const dd = String(todaydate.getDate()).padStart(2, '0');
            const mm = String(todaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = todaydate.getFullYear();
            const strdate = `${mm}${dd}${yyyy}`;
            this.getDoctorList(strdate);
            this.getAppointment(strdate);
        
            // this.selectable=true;
            // this.external.nativeElement.style = 'display: visible;';
        });
    }

    public closePopup(myModal: string) {
        document.getElementById(myModal).style.display = 'none';
    }
    timerange:string="";
    select(data: any) {
        let calendarApi = this.calendarComponent.getApi();
        let checkEvents = calendarApi.getEvents();
        let overlap=0;
        // Overlap Checking for specefic color code
        checkEvents.forEach(function(event){
            // If it's not a background element, check whether the new element contains the existing, or vice versa.
            if(event.rendering !== "inverse-background" && 
                    (
                        (event.start >= data.start && event.start <= data.end) ||
                        (event.end >= data.start && event.end <= data.end) ||
                        (data.start >= event.start && data.start <= event.end) ||
                        (data.end >= event.start && data.end <= event.end)
                    )
                    &&
                    (event.backgroundColor.trim() === '#ffc4c4' // // holiday
                    || event.backgroundColor.trim() === '#ffffd8')
                ){
                    // It is an overlapping event, so we reject it.
                    overlap++;
                     calendarApi.unselect();
                     return; 
                    
                }
        });
        if(overlap>0){
            return;
        }
        //overlap
        const doctorid = data.resource.id;
        const doctorname = data.resource.title.trim();
        const startdate = new Date(data.start);
        let dd = String(startdate.getDate()).padStart(2, '0');
        let mm = String(startdate.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = startdate.getFullYear();
        const strdate = `${mm}/${dd}/${yyyy}`;
        const checkstrdate = `${mm}${dd}${yyyy}`;
        const today = new Date();
        const dd1 = String(today.getDate()).padStart(2, '0');
        const mm1 = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy1 = today.getFullYear();
        const strdate1 = `${mm1}${dd1}${yyyy1}`;

        const starttime = String(startdate.getHours()) + ':' + String(startdate.getMinutes()).padStart(2, '0');
        
        const enddate = new Date(data.end);

        dd = String(enddate.getDate()).padStart(2, '0');
        mm = String(enddate.getMonth() + 1).padStart(2, '0'); // January is 0!
        yyyy = enddate.getFullYear();
        if (Number(checkstrdate) < Number(strdate1)) {
            return;
        }
        const enddt = `${mm}${dd}${yyyy}`;
        const endtime = String(enddate.getHours()) + ':' + String(enddate.getMinutes()).padStart(2, '0');
        let ampm=enddate.getHours()>=12?"pm":"am";
        this.timerange=starttime+" - "+endtime +" "+ampm;
        let appointmentId = '0';
        let patientName = '';
        this.appointmentService.setBookingInfo('doctorBookingInfo', {
            doctorid,
            doctorname, startdate: strdate, enddate: enddt,
            starttime,
            endtime, patientname: patientName,
            patientId: '',
            appointmentid: appointmentId,
            email: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            serviceID: '',
            positionID: '0',
            reasonID: '0',
            reasonCode: '0',
            note: '',
            imageUrl: '',
        });
        this.router.navigateByUrl('/book-appointment');
       // document.getElementById('modalmarkDelete').style.display = 'block';

    }
    public openModal(myModal: string, value: any) {

        document.getElementById(myModal).style.display = 'block';
        this.router.navigateByUrl('/book-appointment');
    }
}
