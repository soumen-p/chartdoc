import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
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
  doctorName:string;
  constructor(private datePipe: DatePipe, private doctorCalendarService: DoctorCalendarService) {
  this.doctorName=this.doctorCalendarService.getLocalStorage('doctorInfo').doctorName
  }

  ngOnInit() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
    var lastday = new Date(curr.setDate(last)); // 12-Jul-2014
  }
  rowclick(event) {
    console.log("event", event);
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
        if (element.schduleAppoinment.DoctorID != "") {
          const mm = element.schduleAppoinment.Date.substr(3,2);
          const dd = element.schduleAppoinment.Date.substr(0,2) //January is 0!
          const yyyy =element.schduleAppoinment.Date.substr(6,4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          console.log("s date="+strdate1);
          tempdata.push({
            resourceId: 1, title: element.schduleAppoinment.PatientName.trim() , start: strdate1 + "T" + element.schduleAppoinment.FromTime.trim(),
            end: strdate1 + "T" + element.schduleAppoinment.ToTime.trim(), IsReady: element.schduleAppoinment.IsReady, appoinmentId: element.schduleAppoinment.AppointmentId, patientID: element.schduleAppoinment.PatientID,
            email: element.schduleAppoinment.Email, phone: element.schduleAppoinment.Phoneno, patientName: element.schduleAppoinment.PatientName, doctorName: element.schduleAppoinment.DoctorName
            , dateOfBirth: element.schduleAppoinment.DateofBirth, gender: element.schduleAppoinment.Gender, address: element.schduleAppoinment.Address, serviceId: element.schduleAppoinment.ServiceID, note: element.schduleAppoinment.Note, reason: element.schduleAppoinment.Reason, positionID: element.schduleAppoinment.PositionID, reasonID: element.schduleAppoinment.ReasonID
            , color: element.schduleAppoinment.IsReady == "True" ? 'yellow' : element.schduleAppoinment.ColorCode.trim(), HeaderId: 1, appointmentFromTime: strdate1 + "T" + element.schduleAppoinment.AppointmentFromTime.trim(), appointmentToTime: strdate1 + "T" + element.schduleAppoinment.AppointmentToTime.trim(), roomNo: element.schduleAppoinment.ROOMNO,
            editable: false
          });
        }
        else if (element.WaitingArea.DoctorID != "") {
          const mm = element.WaitingArea.Date.substr(3,2);
          const dd = element.WaitingArea.Date.substr(0,2) //January is 0!
          const yyyy =element.WaitingArea.Date.substr(6,4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          tempdata.push({
            resourceId: 2, title: element.WaitingArea.PatientName.trim(), start: strdate1 + "T" + element.WaitingArea.FromTime,
            end: strdate1 + "T" + element.WaitingArea.ToTime, appoinmentId: element.WaitingArea.AppointmentId, patientID: element.WaitingArea.PatientID, HeaderId: 2, email: element.WaitingArea.Email, phone: element.WaitingArea.Phoneno
            , dateOfBirth: element.WaitingArea.DateofBirth, gender: element.WaitingArea.Gender, address: element.WaitingArea.Address, patientName: element.WaitingArea.PatientName, doctorName: element.WaitingArea.DoctorName,
            serviceId: element.WaitingArea.ServiceID, note: element.WaitingArea.Note, reason: element.WaitingArea.Reason, positionID: element.WaitingArea.PositionID, reasonID: element.WaitingArea.ReasonID, appointmentFromTime: strdate1 + "T" + element.WaitingArea.AppointmentFromTime.trim(), appointmentToTime: strdate1 + "T" + element.WaitingArea.AppointmentToTime.trim(), roomNo: element.WaitingArea.ROOMNO
            ,editable: false

          });
        }
        else if (element.ConsultationRoom.DoctorID != "") {
          const mm = element.ConsultationRoom.Date.substr(3,2);
          const dd = element.ConsultationRoom.Date.substr(0,2) //January is 0!
          const yyyy =element.ConsultationRoom.Date.substr(6,4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;

          tempdata.push({
            resourceId: 3, title: element.ConsultationRoom.PatientName ,
            start: strdate1 + "T" + element.ConsultationRoom.FromTime,
            end: strdate1 + "T" + element.ConsultationRoom.ToTime, appoinmentId: element.ConsultationRoom.AppointmentId, patientID: element.ConsultationRoom.PatientID, HeaderId: 3,
            email: element.ConsultationRoom.Email, phone: element.ConsultationRoom.Phoneno, patientName: element.ConsultationRoom.PatientName, doctorName: element.ConsultationRoom.DoctorName,
            dateOfBirth: element.ConsultationRoom.DateofBirth, gender: element.ConsultationRoom.Gender, address: element.ConsultationRoom.Address, roomNo: element.ConsultationRoom.ROOMNO,
            serviceId: element.ConsultationRoom.ServiceID, note: element.ConsultationRoom.Note, reason: element.ConsultationRoom.Reason, positionID: element.ConsultationRoom.PositionID, reasonID: element.ConsultationRoom.ReasonID, appointmentFromTime: strdate1 + "T" + element.ConsultationRoom.AppointmentFromTime.trim(), appointmentToTime: strdate1 + "T" + element.ConsultationRoom.AppointmentToTime.trim()
            ,editable: false
          });
        }
        else if (element.CheckingOut.DoctorID != "") {
          const mm = element.CheckingOut.Date.substr(3,2);
          const dd = element.CheckingOut.Date.substr(0,2) //January is 0!
          const yyyy =element.CheckingOut.Date.substr(6,4);
          let strdate1 = yyyy + '-' + mm + '-' + dd;
          tempdata.push({
            resourceId: 4, title: element.CheckingOut.PatientName , start: strdate1 + "T" + element.CheckingOut.FromTime,
            end: strdate1 + "T" + element.CheckingOut.ToTime, appoinmentId: element.CheckingOut.AppointmentId, patientID: element.CheckingOut.PatientID, HeaderId: 4,
            email: element.CheckingOut.Email, phone: element.CheckingOut.Phoneno, patientName: element.CheckingOut.PatientName, doctorName: element.CheckingOut.DoctorName,
            dateOfBirth: element.CheckingOut.DateofBirth, gender: element.CheckingOut.Gender, address: element.CheckingOut.Address,
            serviceId: element.CheckingOut.ServiceID, note: element.CheckingOut.Note, reason: element.CheckingOut.Reason, positionID: element.CheckingOut.PositionID, reasonID: element.CheckingOut.ReasonID, appointmentFromTime: strdate1 + "T" + element.CheckingOut.AppointmentFromTime, appointmentToTime: strdate1 + "T" + element.CheckingOut.AppointmentToTime.trim(), roomNo: element.CheckingOut.ROOMNO
            ,editable: false
          });
        }
      });
      this.calendarEvents = tempdata;
    })

  }
  getDaysArray(start, end) {
    for (var arr = [], dt = start; dt < end; dt.setDate(dt.getDate() + 1)) {
      let currDate = this.datePipe.transform(new Date(dt).toUTCString(), "MMddyyyy");
      arr.push(currDate);
    }
    return arr;
  };
}
