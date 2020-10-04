import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { DatePipe } from '@angular/common';
import { DoctorCalendarService } from '../services/doctor-calendar.service';

@Component({
  selector: 'app-doctor-calender',
  templateUrl: './doctor-calender.component.html',
  styleUrls: ['./doctor-calender.component.css']
})
export class DoctorCalenderComponent implements OnInit {
  @ViewChild(FullCalendarComponent, { static: false }) calendarComponent: any;
  calendarEvents: EventInput[] = [];
  calendarresources: EventInput[] = [];
  calendarVisible = true;
  calendarPlugins = [timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
  currentDate: Date;
  calendarWeekends = true;
  startDate: string;
  endDate: string;
  finalDate: string;
  doctorID: string;
  doctorName: string;
  patientid: string = "";

  encounterList: any;
  patientInfo: any;
  clickCount = 0;
  singleClickTimer: any;
  
  constructor(private datePipe: DatePipe, private doctorCalendarService: DoctorCalendarService
    , private router: Router, private _avRoute: ActivatedRoute,) {
    this.doctorName = this.doctorCalendarService.getLocalStorage('doctorInfo').doctorName;
    if (this._avRoute.snapshot.queryParams.pid) {
      this.patientid = this._avRoute.snapshot.queryParams.pid
    }
    
  }

  ngOnInit() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
    var lastday = new Date(curr.setDate(last)); // 12-Jul-2014
  }
  rowclick(event) {
    this.clickCount++;
    const self = this;
    if (this.clickCount === 1) {
      // tslint:disable-next-line: only-arrow-functions
      this.singleClickTimer = setTimeout(function () {
        console.log('single click');
        self.clickCount = 0;
      }, 400);
    } else if (this.clickCount === 2) {
      console.log('double click');

      this.clickCount = 0;
      clearTimeout(this.singleClickTimer);
      if (this.patientid != "") {
        this.getEncounterDetails(this.patientid, event.event.extendedProps.appoinmentId);
       
      }
    }
  }
  ngAfterViewInit() {
    // alert("data="+this.calendarComponent.getApi());
    let prevButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-prev-button");
    let nextButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-next-button");
    let todayButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-today-button");
    this.doctorCalendarService.getLocalStorage('doctorInfo').doctorName;
  }

  dateRender($event: any) {
    // alert("date rendrer")
    console.log("dateRender....", $event);

    this.startDate = $event.view.activeStart;
    this.endDate = $event.view.activeEnd;
    this.finalDate = this.getDaysArray(this.startDate, this.endDate).toString();
    this.doctorID = this.doctorCalendarService.getLocalStorage('doctorInfo').doctorId;
    // alert("data="+JSON.stringify(this.doctorInfo.doctorId));
    this.getWeeklyCalender(this.finalDate, this.doctorID)
  }

  getWeeklyCalender(date: string, doctorId: string) {
    // alert("api calling"+date);
    this.doctorCalendarService.getAllCalendar(date, doctorId).subscribe((res) => {
      let tempdata = [];
      res.forEach((element: any) => {
        console.log("ddata", res)
        if (element.schduleAppoinment.doctorID != "") {
          const mm = element.schduleAppoinment.date.substr(3, 2);
          const dd = element.schduleAppoinment.date.substr(0, 2) //January is 0!
          const yyyy = element.schduleAppoinment.date.substr(6, 4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          console.log("s date=" + strdate1);
          tempdata.push({
            resourceId: 1, title: element.schduleAppoinment.patientName.trim(), start: strdate1 + "T" + element.schduleAppoinment.fromTime.trim(),
            end: strdate1 + "T" + element.schduleAppoinment.toTime.trim(), IsReady: element.schduleAppoinment.isReady, appoinmentId: element.schduleAppoinment.appointmentId, patientID: element.schduleAppoinment.patientId,
            email: element.schduleAppoinment.email, phone: element.schduleAppoinment.phoneno, patientName: element.schduleAppoinment.patientName, doctorName: element.schduleAppoinment.doctorName
            , dateOfBirth: element.schduleAppoinment.dateofBirth, gender: element.schduleAppoinment.gender,
            address: element.schduleAppoinment.address, serviceId: element.schduleAppoinment.serviceID,
            note: element.schduleAppoinment.note, reason: element.schduleAppoinment.reason,
            positionID: element.schduleAppoinment.positionID, reasonID: element.schduleAppoinment.reasonID
            , color: element.schduleAppoinment.isReady == "True" ? 'yellow' :
              element.schduleAppoinment.colorCode.trim(), HeaderId: 1, appointmentFromTime: strdate1 + "T" + element.schduleAppoinment.appointmentFromTime.trim(), appointmentToTime: strdate1 + "T" + element.schduleAppoinment.appointmentToTime.trim(),
            roomNo: element.schduleAppoinment.rOOMNO,
            editable: false
          });
        }
        else if (element.waitingArea.doctorID != "") {
          const mm = element.waitingArea.date.substr(3, 2);
          const dd = element.waitingArea.date.substr(0, 2) //January is 0!
          const yyyy = element.waitingArea.date.substr(6, 4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          tempdata.push({
            resourceId: 2, title: element.waitingArea.patientName.trim(), start: strdate1 + "T" + element.waitingArea.fromTime,
            end: strdate1 + "T" + element.waitingArea.toTime, appoinmentId: element.waitingArea.appointmentId, patientID: element.waitingArea.patientId, HeaderId: 2, email: element.waitingArea.email, phone: element.waitingArea.phoneno
            , dateOfBirth: element.waitingArea.dateOfBirth, gender: element.waitingArea.gender, address: element.waitingArea.address,
            patientName: element.waitingArea.patientName, doctorName: element.waitingArea.doctorName,
            serviceId: element.waitingArea.serviceId, note: element.waitingArea.note, reason: element.waitingArea.reason, positionID: element.waitingArea.positionID, reasonID: element.waitingArea.reasonID, appointmentFromTime: strdate1 + "T" + element.waitingArea.appointmentFromTime.trim(), appointmentToTime: strdate1 + "T" + element.waitingArea.AppointmentToTime.trim(), roomNo: element.waitingArea.rOOMNO
            , editable: false

          });
        }
        else if (element.consultationRoom.doctorID != "") {
          const mm = element.consultationRoom.date.substr(3, 2);
          const dd = element.consultationRoom.date.substr(0, 2) //January is 0!
          const yyyy = element.consultationRoom.date.substr(6, 4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;

          tempdata.push({
            resourceId: 3, title: element.consultationRoom.patientName,
            start: strdate1 + "T" + element.consultationRoom.fromTime,
            end: strdate1 + "T" + element.consultationRoom.toTime, appoinmentId: element.consultationRoom.appointmentId,
            patientID: element.consultationRoom.patientId, HeaderId: 3,
            email: element.consultationRoom.email, phone: element.consultationRoom.phoneno,
            patientName: element.consultationRoom.patientName, doctorName: element.consultationRoom.doctorName,
            dateOfBirth: element.consultationRoom.dateOfBirth, gender: element.consultationRoom.gender,
            address: element.consultationRoom.address, roomNo: element.consultationRoom.roomNo,
            serviceId: element.consultationRoom.serviceId, note: element.consultationRoom.note,
            reason: element.consultationRoom.reason, positionID: element.consultationRoom.positionID,
            reasonID: element.consultationRoom.reasonID,
            appointmentFromTime: strdate1 + "T" + element.consultationRoom.appointmentFromTime.trim(),
            appointmentToTime: strdate1 + "T" + element.consultationRoom.appointmentToTime.trim()
            , editable: false
          });
        }
        else if (element.checkingOut.doctorID != "") {
          const mm = element.checkingOut.date.substr(3, 2);
          const dd = element.checkingOut.date.substr(0, 2) //January is 0!
          const yyyy = element.checkingOut.date.substr(6, 4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          tempdata.push({
            resourceId: 4, title: element.checkingOut.patientName, start: strdate1 + "T" + element.checkingOut.fromTime,
            end: strdate1 + "T" + element.checkingOut.toTime, appoinmentId: element.checkingOut.appointmentId,
            patientID: element.checkingOut.this.patientid, HeaderId: 4,
            email: element.checkingOut.email, phone: element.checkingOut.phoneno,
            patientName: element.checkingOut.patientName, doctorName: element.checkingOut.doctorName,
            dateOfBirth: element.checkingOut.dateOfBirth, gender: element.checkingOut.gender, address: element.checkingOut.address,
            serviceId: element.checkingOut.serviceId, note: element.checkingOut.note, reason: element.checkingOut.reason,
            positionID: element.checkingOut.positionID, reasonID: element.checkingOut.reasonID,
            appointmentFromTime: strdate1 + "T" + element.checkingOut.appointmentFromTime,
            appointmentToTime: strdate1 + "T" + element.checkingOut.appointmentToTime.trim(), roomNo: element.checkingOut.roomNo
            , editable: false
          });
        }
      });
      if (this.patientid == "") {
        this.calendarEvents = tempdata;
      } else {
        this.calendarEvents = tempdata.filter((x => x.patientID == this.patientid));

      }
    })

  }
  getEncounterDetails(pID: string, aID: string) {

    this.doctorCalendarService.getEncounterData(pID).subscribe((res) => {
      this.encounterList = res;
      this.patientInfo = {
        patientId: this.encounterList.patientId,
        appointmentId: aID,
        flag: this.encounterList.flag,
        patientFirstName: this.encounterList.firstName,
        patientLastName: this.encounterList.lastName,
        patientFullName: this.encounterList.firstName + ' ' + this.encounterList.lastName,
        patientImagePath: this.encounterList.imagePath,
        patientAge: this.encounterList.age,
        patientGender: this.encounterList.gender,
        rcopiaId: this.encounterList.recopiaId,
        rcopiaName: this.encounterList.recopiaName,
      };
      this.doctorCalendarService.setPatientInfo('patientInfo', this.patientInfo);
      this.router.navigate(['/patient-profile'], { queryParams: { mode:'history', id: aID } });
    }, err => {
      console.log(err);
    });
  }
  getDaysArray(start, end) {
    for (var arr = [], dt = start; dt < end; dt.setDate(dt.getDate() + 1)) {
      let currDate = this.datePipe.transform(new Date(dt).toUTCString(), "MMddyyyy");
      arr.push(currDate);
    }
    return arr;
  };
}
