import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { PatientFlowSheetService } from '../services/patient-flow-sheet.service';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Router } from '@angular/router';
import { parse } from 'querystring';
import { AppointmentService } from '../services/appointment.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from '../services/authentication.service';
import { OthersServiceService } from '../services/others-service.service';
import { SharedService } from 'src/app/core/shared.service';
@Component({
  selector: 'app-patient-flow-sheet',
  templateUrl: './patient-flow-sheet.component.html',
  styleUrls: ['./patient-flow-sheet.component.css']
})
export class PatientFlowSheetComponent implements OnInit {

  useraccess: any = [];
  constructor(private patientFlowSheetService: PatientFlowSheetService, private appointmentService: AppointmentService,
    private router: Router, public toastr: ToastrManager, private loginService: AuthenticationService,
    private OthersService: OthersServiceService,
    private sharedService: SharedService) {
    this.getRoomNumber();
    this.useraccess = this.sharedService.getLocalItem('useraccess');
  }
  @ViewChild(FullCalendarComponent, { static: false }) calendarComponent: any; // the #calendar in the template
  // @ViewChild('external', { static: false }) external: ElementRef;
  isCheckinValid = false;
  calendarVisible = true;
  calendarArgs: any;
  calendarEvents: EventInput[] = [];
  calendarResources: EventInput[] = [];
  appoinmentId: string;
  roomNumber: string;
  savedRoom: string;
  flowArea: string;
  defaultDate: any;
  markStatus: boolean;
  error: boolean;
  currentDate: string;
  roomNumberList: [];
  // tempdata = [];
  calendarPlugins = [timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
  patientData: [];
  doctorId: string;
  isCurrentDateApp = true;
  clickCount = 0;
  singleClickTimer: any;
  insuranceStatus: boolean;
  getAppointmentDetails(strDate: any, doctorId: string) {
    // alert("start date="+strDate);
    this.patientFlowSheetService.getAppointmentDetail(strDate, doctorId)
      .subscribe((res) => {
        this.patientData = res;
        const tempdata = [];

        const calendarApi = this.calendarComponent.getApi();
        const nextdaydate = new Date(calendarApi.getDate());
        const dd = String(nextdaydate.getDate()).padStart(2, '0');
        const mm = String(nextdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = nextdaydate.getFullYear();
        const strdate1 = yyyy + '-' + mm + '-' + dd;
        this.defaultDate = `${yyyy}-${mm}-${dd}`;

        res.forEach((element: any) => {
          if (element.schduleAppoinment.doctorId !== '') {
            tempdata.push({
              resourceId: 1,
              title: element.schduleAppoinment.patientName.trim() +
                ' (' + element.schduleAppoinment.appointmentFromTime.trim() + '-'
                + element.schduleAppoinment.appointmentToTime.trim() + ')',
              start: strdate1 + 'T' + element.schduleAppoinment.fromTime.trim(),
              end: strdate1 + 'T' + element.schduleAppoinment.toTime.trim(),
              IsReady: element.schduleAppoinment.isReady,
              appoinmentId: element.schduleAppoinment.appointmentId,
              patientID: element.schduleAppoinment.patientId,
              email: element.schduleAppoinment.email,
              phone: element.schduleAppoinment.phoneNo,
              patientName: element.schduleAppoinment.patientName,
              doctorName: element.schduleAppoinment.doctorName
              , dateOfBirth: element.schduleAppoinment.dateOfBirth,
              gender: element.schduleAppoinment.gender,
              address: element.schduleAppoinment.address,
              serviceId: element.schduleAppoinment.serviceId,
              note: element.schduleAppoinment.note,
              reason: element.schduleAppoinment.reason,
              positionID: element.schduleAppoinment.positionId,
              reasonID: element.schduleAppoinment.reasonId,
              color: element.schduleAppoinment.isReady === 'True' ? 'yellow' : element.schduleAppoinment.colorCode.trim(),
              HeaderId: 1,
              appointmentFromTime: strdate1 + 'T' + element.schduleAppoinment.appointmentFromTime.trim(),
              appointmentToTime: strdate1 + 'T' + element.schduleAppoinment.appointmentToTime.trim(),
              roomNo: element.schduleAppoinment.roomNo,
              imageUrl: element.schduleAppoinment.filePath
              // editable:
            });
          } else if (element.waitingArea.doctorId !== '') {
            tempdata.push({
              resourceId: 2,
              title: element.waitingArea.patientName.trim() +
                ' (' + element.waitingArea.appointmentFromTime.trim() + '-' + element.waitingArea.appointmentToTime.trim() + ')',
              start: strdate1 + 'T' + element.waitingArea.fromTime,
              end: strdate1 + 'T' + element.waitingArea.toTime,
              appoinmentId: element.waitingArea.appointmentId,
              patientID: element.waitingArea.patientId,
              HeaderId: 2,
              email: element.waitingArea.email,
              phone: element.waitingArea.phoneNo,
              dateOfBirth: element.waitingArea.dateOfBirth,
              gender: element.waitingArea.gender,
              address: element.waitingArea.address,
              patientName: element.waitingArea.patientName,
              doctorName: element.waitingArea.doctorName,
              serviceId: element.waitingArea.serviceId,
              note: element.waitingArea.note,
              reason: element.waitingArea.reason,
              positionID: element.waitingArea.positionId,
              reasonID: element.waitingArea.reasonId,
              appointmentFromTime: strdate1 + 'T' + element.waitingArea.appointmentFromTime.trim(),
              appointmentToTime: strdate1 + 'T' + element.waitingArea.appointmentToTime.trim(),
              roomNo: element.waitingArea.roomNo,
              imageUrl: element.waitingArea.filePath
            });
          } else if (element.consultationRoom.doctorId !== '') {
            this.savedRoom = this.appointmentService.getBookingInfo('SavedRoom' + element.consultationRoom.appointmentId);
            if (!this.savedRoom) {
              this.savedRoom = '';
            }

            tempdata.push({
              resourceId: 3,
              title: element.consultationRoom.patientName +
                ' (' + element.consultationRoom.appointmentFromTime.trim() +
                '-' + element.consultationRoom.appointmentToTime.trim() + ')' + '(Room:' + this.savedRoom + ')',
              start: strdate1 + 'T' + element.consultationRoom.fromTime,
              end: strdate1 + 'T' + element.consultationRoom.toTime,
              appoinmentId: element.consultationRoom.appointmentId,
              patientID: element.consultationRoom.patientId,
              HeaderId: 3,
              email: element.consultationRoom.email,
              phone: element.consultationRoom.phoneno,
              patientName: element.consultationRoom.patientName,
              doctorName: element.consultationRoom.doctorName,
              dateOfBirth: element.consultationRoom.dateOfBirth,
              gender: element.consultationRoom.gender,
              address: element.consultationRoom.address,
              roomNo: element.consultationRoom.roomNo,
              serviceId: element.consultationRoom.serviceId,
              note: element.consultationRoom.note,
              reason: element.consultationRoom.reason,
              positionID: element.consultationRoom.positionId,
              reasonID: element.consultationRoom.reasonId,
              appointmentFromTime: strdate1 + 'T' + element.consultationRoom.appointmentFromTime.trim(),
              appointmentToTime: strdate1 + 'T' + element.consultationRoom.appointmentToTime.trim(),
              imageUrl: element.consultationRoom.filePath
            });
          } else if (element.checkingOut.doctorId !== '') {
            tempdata.push({
              resourceId: 4,
              title: element.checkingOut.patientName +
                ' (' + element.checkingOut.appointmentFromTime.trim() +
                '-' + element.checkingOut.appointmentToTime.trim() + ')',
              start: strdate1 + 'T' + element.checkingOut.fromTime,
              end: strdate1 + 'T' + element.checkingOut.toTime,
              appoinmentId: element.checkingOut.appointmentId,
              patientID: element.checkingOut.patientID,
              HeaderId: 4,
              email: element.checkingOut.email,
              phone: element.checkingOut.phoneNo,
              patientName: element.checkingOut.patientName,
              doctorName: element.checkingOut.doctorName,
              dateOfBirth: element.checkingOut.dateOfBirth,
              gender: element.checkingOut.gender,
              address: element.checkingOut.address,
              serviceId: element.checkingOut.serviceId,
              note: element.checkingOut.note,
              reason: element.checkingOut.reason,
              positionID: element.checkingOut.positionId,
              reasonID: element.checkingOut.reasonId,
              appointmentFromTime: strdate1 + 'T' + element.checkingOut.appointmentFromTime,
              appointmentToTime: strdate1 + 'T' + element.checkingOut.appointmentToTime.trim(),
              roomNo: element.checkingOut.roomNo,
              imageUrl: element.checkingOut.filepath
            });
          }
        });
        this.calendarEvents = tempdata;
      },
        err => {
        });
  }

  ngOnInit() {
    this.isCurrentDateApp = true;
    this.doctorId = this.loginService.getLocalStorage('doctorInfo').doctorId;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const strdate = mm + '' + dd + '' + yyyy;
    this.currentDate = mm + '' + dd + yyyy;
    const header = [];

    header.push({ id: 1, title: 'Scheduled Appointments' });
    header.push({ id: 2, title: 'Waiting Area' });
    header.push({ id: 3, title: 'Consultation Room' });
    header.push({ id: 4, title: 'Checking out' });

    this.calendarResources = header;

    this.getAppointmentDetails(strdate, this.doctorId);
  }
  hideTimeCol() {
    this.calendarComponent.element.nativeElement.getElementsByClassName('fc-axis fc-widget-header')[0].style.display = 'none';
    const timecell = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-axis fc-time');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < timecell.length; i++) {
      timecell[i].style.display = 'none';
      // timecell1[i].style.display = 'none';
    }
    // this.calendarComponent.element.nativeElement.getElementsByClassName("fc-time")[0].style.display = 'none';
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.hideTimeCol();
    this.bindEvents();
  }
  dragdate(arg: any) {

    this.calendarArgs = arg;
    this.roomNumber = '0';
    this.appoinmentId = arg.oldEvent._def.extendedProps.appoinmentId;
    let accessObj :any;
    // tslint:disable-next-line: radix
    if (parseInt(arg.newResource._resource.id) === 1) {
      this.flowArea = 'Appointment';
      // tslint:disable-next-line: radix
    } else if (parseInt(arg.newResource._resource.id) === 2) {
      this.flowArea = 'Waiting';
      // tslint:disable-next-line: radix
    } else if (parseInt(arg.newResource._resource.id) === 3) {
      this.flowArea = 'Encounter';
      // tslint:disable-next-line: radix
    } else if (parseInt(arg.newResource._resource.id) === 4) {
      this.flowArea = 'Finish';
    }
    
    if((parseInt(arg.oldResource._resource.id)) === 1 && this.useraccess.filter((x=>x.ID==33))[0]["Status"]=="0"){
      arg.revert();
      return;
    }
    else if((parseInt(arg.oldResource._resource.id)) === 2 && this.useraccess.filter((x=>x.ID==34))[0]["Status"]=="0"){
      arg.revert();
      return;
    }
    else if((parseInt(arg.oldResource._resource.id)) === 3 && this.useraccess.filter((x=>x.ID==35))[0]["Status"]=="0"){
      arg.revert();
      return;
    }
    else if((parseInt(arg.oldResource._resource.id)) === 4 && this.useraccess.filter((x=>x.ID==36))[0]["Status"]=="0"){
      arg.revert();
      return;
    }
    const today = new Date();
    const ddToday = String(today.getDate()).padStart(2, '0');
    const mmToday = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyyToday = today.getFullYear();
    const strdate = `${mmToday}${ddToday}${yyyyToday}`;

    const calendarApi = this.calendarComponent.getApi();
    const prevdaydate = new Date(calendarApi.getDate());
    const dd = String(prevdaydate.getDate()).padStart(2, '0');
    const mm = String(prevdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = prevdaydate.getFullYear();
    const Appointdate = mm + '' + dd + '' + yyyy;

    if (strdate !== Appointdate) {
      this.toastr.warningToastr('Event movement allowed for Current date only.');
      arg.revert();
    } else {
      // tslint:disable-next-line: radix
      if ((parseInt(arg.oldResource._resource.id)) === 1) {
        if (arg.oldEvent._def.extendedProps.IsReady === 'True') {
          // tslint:disable-next-line: radix
          if (parseInt(arg.newResource._resource.id) === 3) {
            this.roomNumber = arg.oldEvent._def.extendedProps.roomNo;
            this.openRoomDialog('modaladdRoom');
          } else {
            this.updatePatientDetail('0');
            // arg.revert();
          }
        } else {
          arg.revert();
        }
        // tslint:disable-next-line: radix
      } else if (parseInt(arg.newResource._resource.id) === 3) {
        this.roomNumber = arg.oldEvent._def.extendedProps.roomNo;
        this.openRoomDialog('modaladdRoom');
      } else {
        //  arg.revert();
        this.updatePatientDetail('0');
      }
    }

  }
  rowclick(arg: any) {
    this.appoinmentId = arg.event.extendedProps.appoinmentId;
    if((parseInt(arg.event.extendedProps.HeaderId)) === 1 && this.useraccess.filter((x=>x.ID==33))[0]["Status"]=="0"){
      
      return;
    }
    else if((parseInt(arg.event.extendedProps.HeaderId)) === 2 && this.useraccess.filter((x=>x.ID==34))[0]["Status"]=="0"){
    
      return;
    }
    else if((parseInt(arg.event.extendedProps.HeaderId)) === 3 && this.useraccess.filter((x=>x.ID==35))[0]["Status"]=="0"){
     
      return;
    }
    else if((parseInt(arg.event.extendedProps.HeaderId)) === 4 && this.useraccess.filter((x=>x.ID==36))[0]["Status"]=="0"){
      
      return;
    }
    this.clickCount++;
    const self = this;
    if (this.clickCount === 1) {
      if (this.isCurrentDateApp) {
        const HeaderId = arg.event.extendedProps.HeaderId;
        const patientId = arg.event.extendedProps.patientID;
        // tslint:disable-next-line: only-arrow-functions
        this.singleClickTimer = setTimeout(function () {
          if (HeaderId === 1) {
            self.patientFlowSheetService.getInsuranceStatus(patientId).subscribe((res) => {
              if (res == '1') {
                self.insuranceStatus = false;
              }
              else {
                self.insuranceStatus = true;
              }
              self.markStatus = arg.event.extendedProps.IsReady === 'True' ? true : false;
              self.openMarkIn('modalmarkInPatient');

            }, err => {
              
            })

          }
          if (HeaderId === 4) {
            // self.markStatus = arg.event.extendedProps.IsReady === "True" ? true : false;
            self.openCheckin('modalCheckOut');
          }
          if (HeaderId === 3) {
            self.openRoomUpdate('modaladdRoom');
          }
          self.clickCount = 0;
        }, 400);
      } else {
        // this.toastr.warningToastr("MarkIn Patielnts allowed for Current date only.");
        // tslint:disable-next-line: only-arrow-functions
        this.singleClickTimer = setTimeout(function () {
          self.clickCount = 0;
        }, 400);
      }
    } else if (this.clickCount === 2) {
      
      this.clickCount = 0;
      clearTimeout(this.singleClickTimer);
      this.clickCount++;

      const startdate = new Date(arg.event.extendedProps.appointmentFromTime);
      let dd = String(startdate.getDate()).padStart(2, '0');
      let mm = String(startdate.getMonth() + 1).padStart(2, '0'); // January is 0!
      let yyyy = startdate.getFullYear();
      // let strdate = dd+'/'+mm+'/'+yyyy; //mm + '' + dd + '' + yyyy;
      const strdate = mm + '/' + dd + '/' + yyyy; // mm + '' + dd + '' + yyyy;
      const starttime = String(startdate.getHours()) + ':' + String(startdate.getMinutes());

      const enddate = new Date(arg.event.extendedProps.appointmentToTime);
      dd = String(enddate.getDate()).padStart(2, '0');
      mm = String(enddate.getMonth() + 1).padStart(2, '0'); // January is 0!
      yyyy = enddate.getFullYear();
      const enddt = mm + '' + dd + '' + yyyy;
      const endtime = String(enddate.getHours()) + ':' + String(enddate.getMinutes());
      const temp = arg.el.innerText;
      // let appointmentId = "0";
      let patientName = '';
      patientName = temp;
      this.appointmentService.setBookingInfo('doctorBookingInfo', {
        'doctorid': arg.event.extendedProps.doctorId,
        'doctorname': arg.event.extendedProps.doctorName,
        'startdate': strdate, 'enddate': enddt,
        'starttime': starttime,
        'endtime': endtime,
        'patientname': (arg.event.extendedProps != undefined) ? arg.event.extendedProps.patientName : '',
        'patientId': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.patientID : '',
        'appointmentid': this.appoinmentId,
        'email': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.email : '',
        'phone': (arg.event.extendedProps.phone !== undefined) ? arg.event.extendedProps.phone : '',
        'dateOfBirth': (arg.event.extendedProps.dateOfBirth !== undefined) ? arg.event.extendedProps.dateOfBirth : '',
        'gender': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.gender : '',
        'address': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.address : '',
        'serviceID': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.serviceId : '',
        'note': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.note : '',
        'reasonCode': '0',
        'reasonID': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.reasonID : '',
        'positionID': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.positionID : '',
        'imageUrl': (arg.event.extendedProps !== undefined) ? arg.event.extendedProps.imageUrl : '',

      });
      this.router.navigate(['/flowsheet-book-appointment'], { queryParams: { id: arg.event.extendedProps.HeaderId } });
    }
  }

  public openMarkIn(myModal: string) {
    this.error = false;
    document.getElementById(myModal).style.display = 'block';
  }

  public openCheckin(myModal: string) {
    // this.error = false;
    document.getElementById(myModal).style.display = 'block';
  }

  public openRoomUpdate(myModal: string) {
    this.roomNumber = this.appointmentService.getBookingInfo('SavedRoom' + this.appoinmentId);
    document.getElementById(myModal).style.display = 'block';
  }

  public closePopupCancel(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
  }

  public closePopuop(myModal: string, roomNo: string) {
    if (myModal === 'modaladdRoom' && (roomNo || roomNo === '')) {
      if (this.savedRoom !== roomNo && roomNo === 'undefined') {
        roomNo = this.savedRoom;
      }
      this.updatePatientDetail(roomNo);
    } else {
      document.getElementById(myModal).style.display = 'none';
      this.getAppointmentDetails(this.currentDate, this.doctorId);
    }

  }

  public closeRoomPopuop(myModal: string) {
    // alert("close")
    document.getElementById(myModal).style.display = 'none';
    // this.updatePatientDetail("0");
  }
  public closePopuopRoom(myModal: string, roomNo: string) {
    if (myModal === 'modaladdRoom' && (roomNo || roomNo === '')) {
      if (this.savedRoom !== roomNo && roomNo === 'undefined') {
        roomNo = this.savedRoom;
        this.updatePatientDetail(roomNo);
      }
      else {
        document.getElementById(myModal).style.display = 'none';
      }


    } else {
      document.getElementById(myModal).style.display = 'none';
      this.getAppointmentDetails(this.currentDate, this.doctorId);
      this.calendarArgs.revert();
    }
  }
  public handleError() {
    this.error = false;
  }

  public submitMarkIn(status: boolean) {
    if (status === undefined) {
      this.error = true;
      return false;
    }
    this.patientFlowSheetService.updateMarkStatus(this.appoinmentId, status).subscribe((res) => {
      if (res === 1) {
        
        this.getAppointmentDetails(this.currentDate, this.doctorId);
      } 
    }, err => {
      this.closePopuop('modalmarkInPatient', '');
    });
    this.closePopuop('modalmarkInPatient', '');
  }
  public submitRoom(roomNo: string) {
    // this.SavedRoom=roomNo;
    if (roomNo != '') {
      this.flowArea = 'Encounter';
      this.appointmentService.setBookingInfo('SavedRoom' + this.appoinmentId, roomNo);

      this.updatePatientDetail(roomNo);
    }
    else {
      this.toastr.errorToastr("Please select Room Number", "Error");
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getRoomNumber() {
    this.OthersService.getOthers('10')
      .subscribe((res) => {
        this.roomNumberList = res;
      }, error => {
      });
  }
  public openRoomDialog(myModel: string) {
    this.error = false;
    this.roomNumber = this.appointmentService.getBookingInfo('SavedRoom' + this.appoinmentId);
    document.getElementById(myModel).style.display = 'block';
  }

  updatePatientDetail(roomNo: string) {
    if (roomNo === '') {
      roomNo = '0';
    }
    this.patientFlowSheetService.updateAppoinmentDetail(this.appoinmentId, roomNo, this.flowArea).subscribe((res) => {
      this.getAppointmentDetails(this.currentDate, this.doctorId);
      // this.closePopuop('modaladdRoom','');
      this.closeRoomPopuop('modaladdRoom');
    }, err => {
      this.closeRoomPopuop('modaladdRoom');
    });
  }
  toggleVisibility(e) {
    this.isCheckinValid = e.target.checked;
  }

  submitmodalCheckOut() {
    this.patientFlowSheetService.saveCheckOut(this.appoinmentId, '').subscribe((res) => {
      this.toastr.successToastr('Fee Ticket Number: ' + res);
      this.closePopuop('modalCheckOut', '');
      this.isCheckinValid = false;
    }, err => {
      
    });
  }

  bindEvents() {
    const prevButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-prev-button');
    const nextButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-next-button');
    const todayButton = this.calendarComponent.element.nativeElement.getElementsByClassName('fc-today-button');

    nextButton[0].addEventListener('click', () => {
      this.hideTimeCol();
      const calendarApi = this.calendarComponent.getApi();
      const nextdaydate = new Date(calendarApi.getDate());
      const dd = String(nextdaydate.getDate()).padStart(2, '0');
      const mm = String(nextdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = nextdaydate.getFullYear();
      const strdate = mm + '' + dd + '' + yyyy;
      this.currentDate = strdate;
      this.getAppointmentDetails(strdate, this.doctorId);
      
      this.IsCurrentAppointment();
    });
    prevButton[0].addEventListener('click', () => {
      this.hideTimeCol();
      const calendarApi = this.calendarComponent.getApi();
      const prevdaydate = new Date(calendarApi.getDate());
      const dd = String(prevdaydate.getDate()).padStart(2, '0');
      const mm = String(prevdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = prevdaydate.getFullYear();
      const strdate = mm + '' + dd + '' + yyyy;
      this.currentDate = strdate;
      this.getAppointmentDetails(strdate, this.doctorId);
      
      this.IsCurrentAppointment();
    });

    todayButton[0].addEventListener('click', () => {
      this.hideTimeCol();
      const calendarApi = this.calendarComponent.getApi();
      const todaydate = new Date(calendarApi.getDate());
      const dd = String(todaydate.getDate()).padStart(2, '0');
      const mm = String(todaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = todaydate.getFullYear();
      const strdate = mm + '' + dd + '' + yyyy;
      this.currentDate = strdate;
      this.getAppointmentDetails(strdate, this.doctorId);
      
    });
  }

  IsCurrentAppointment() {
    const today = new Date();
    const ddToday = String(today.getDate()).padStart(2, '0');
    const mmToday = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyyToday = today.getFullYear();
    const strdate = `${mmToday}${ddToday}${yyyyToday}`;

    const calendarApi = this.calendarComponent.getApi();
    const prevdaydate = new Date(calendarApi.getDate());
    const dd = String(prevdaydate.getDate()).padStart(2, '0');
    const mm = String(prevdaydate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = prevdaydate.getFullYear();
    const Appointdate = `${mm}${dd}${yyyy}`;

    if (strdate !== Appointdate) {
      this.isCurrentDateApp = false;
    } else {
      this.isCurrentDateApp = true;
    }
  }
}
