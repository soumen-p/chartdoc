import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { OfficeCalendarService } from '../services/officecalendar.service';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'calendar-schedule',
    templateUrl: './calendarschedule.component.html'
})
export class CalendarScheduleComponent implements OnInit {
    isNew: boolean;
    nextListener: any;
    prevListener: any;
    doctorName: string;
    doctorImg: string;
    errorMsg: string = "";
    userName: string;
    password: string;
    errorCode: string;
    errorDesc: string;
    doctorInfo: FormGroup;
    defaultDate: any;
    @ViewChild(FullCalendarComponent, { static: false }) calendarComponent: any; // the #calendar in the template
    @ViewChild('external', { static: false }) external: ElementRef;
   
    calendarVisible = true;
    model1: string
    calendarPlugins = [timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
    calendarWeekends = true;
    calendarEvents: EventInput[] = [];
    minDate = undefined;
    calendarresources: EventInput[] = [];
    pipe = new DatePipe('en-US'); // Use your own locale
    constructor(private router: Router,
        private loginService: AuthenticationService,
        private formBuilder: FormBuilder,
        private _avRoute: ActivatedRoute,
private _officeCalendarService:OfficeCalendarService,
        private config: NgbDatepickerConfig) {
            const current = new Date();
            this.minDate = {
              year: current.getFullYear(),
              month: current.getMonth() + 1,
              day: current.getDate()
            };   
        //document.body.className = "login_page";
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname=today.toLocaleString('en-us', {weekday:'short'});
        var yyyy = today.getFullYear();

        //var date = new Date(nextdaydate);
        let nextdaydate1 = new Date(today);
        let nextdaydate2 = new Date(today);
        nextdaydate1.setDate(nextdaydate1.getDate() + 1);
        nextdaydate2.setDate(nextdaydate2.getDate() + 2);

        var dd1 = String(nextdaydate1.getDate()).padStart(2, '0');
        var mm1 = String(nextdaydate1.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname1=nextdaydate1.toLocaleString('en-us', {weekday:'short'})
        var yyyy1 = nextdaydate1.getFullYear();

        var dd2= String(nextdaydate2.getDate()).padStart(2, '0');
        var mm2 = String(nextdaydate2.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname2=nextdaydate2.toLocaleString('en-us', {weekday:'short'})
        var yyyy2 = nextdaydate2.getFullYear();

        let strdate = dayname+' '+dd+'/'+mm;
        let strdate1 =dayname1+' '+dd1+'/'+mm1;
        let strdate2 = dayname2+' '+dd2+'/'+mm2;
        
        this.defaultDate = yyyy + '-' + mm + '-' + dd
        
            let tempdata = [];
            tempdata.push({ id: 1, title: strdate,date: this.pipe.transform(new Date(today), 'MM-dd-yyyy') })
            tempdata.push({ id: 2, title: strdate1,date:this.pipe.transform(new Date(nextdaydate1), 'MM-dd-yyyy') })
            tempdata.push({ id: 3, title: strdate2,date:this.pipe.transform(new Date(nextdaydate2), 'MM-dd-yyyy')})
      
        this.calendarresources = tempdata;
        let dateparam=(this.pipe.transform(new Date(today), 'MM-dd-yyyy') +","
        +this.pipe.transform(new Date(nextdaydate1), 'MM-dd-yyyy') +","
        +this.pipe.transform(new Date(nextdaydate2), 'MM-dd-yyyy')).split('-').join('');
        this.getOfficeCalenderList(dateparam);
        //var containerEl = document.getElementById('external-events-list');

    }
    ngAfterViewInit() {
        console.log(this.external.nativeElement.innerHTML);
        new Draggable(this.external.nativeElement, {
            itemSelector: '.fc-event',
            eventData: function (eventEl) {
                return {
                    title: eventEl.innerText.substring(0,1),
                    duration: '00:15:00',
                    overlap:true,
                   // textColor:'#FFFFFF',
                };
            }
        });
        
        this.bindEvents();
        
    }
    ngOnInit() {
       
       
    }

    ngOnDestroy() {
        //document.body.className = "sidebar-collapse";

    }
    
    clickCount: number = 0;
    singleClickTimer: any
    rowclick(arg: any) {
        
        this.clickCount++;
        

        let self=this;
        if (this.clickCount === 1) {
            this.singleClickTimer = setTimeout(function () {
                console.log('single click');
                self.clickCount = 0;
            }, 400);
        } else if (this.clickCount === 2) {
            console.log('double click');

            this.clickCount = 0;
            clearTimeout(this.singleClickTimer);
            
           
                this.clickCount++;  
                let temp = arg.el.text.split("-")  
                let starttime="";
                let endtime="";
                if(temp.length>1){
                    starttime=temp[0];
                    endtime=temp[1];
                } 
                
                this._officeCalendarService.setCalendar("OfficeCalendar",{"Date":arg.event.getResources()[0]._resource.extendedProps.date ,
                 "starttime":starttime.trim(),"endtime":endtime.trim(),"calendardId":arg.event.extendedProps.calendardId==undefined?0:arg.event.extendedProps.calendardId
                 
                })  ;
                
                
               
        
                this.router.navigateByUrl('/office-calendar');
           
        }



    }
    
    eventDrop(arg:any){
        
       console.log(arg)
    }
    
    drop(arg:any){
       
       console.log(arg)
    }
    bindEvents() {

        let prevButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-prev-button");
        let nextButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-next-button");
        
        let todayButton = this.calendarComponent.element.nativeElement.getElementsByClassName("fc-today-button");
        nextButton[0].addEventListener('click', () => {

            let calendarApi = this.calendarComponent.getApi();
            let nextdaydate = new Date(calendarApi.getDate())
            
            var date = new Date(nextdaydate);
            let nextdaydate1 = new Date(date);
            let nextdaydate2 = new Date(date);
            nextdaydate1.setDate(nextdaydate1.getDate() + 1);
            nextdaydate2.setDate(nextdaydate2.getDate() + 2);

            // let nextdaydate1 = new Date(calendarApi.getDate()+1)
            // let nextdaydate2= new Date(calendarApi.getDate()+2)

            var dd = String(nextdaydate.getDate()).padStart(2, '0');
            var mm = String(nextdaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname=nextdaydate.toLocaleString('en-us', {weekday:'short'});
            var yyyy = nextdaydate.getFullYear();
            let strdate = mm + '' + dd + '' + yyyy;
            
            var dd1 = String(nextdaydate1.getDate()).padStart(2, '0');
            var mm1 = String(nextdaydate1.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname1=nextdaydate1.toLocaleString('en-us', {weekday:'short'});
            var yyyy1 = nextdaydate1.getFullYear();
    
            var dd2= String(nextdaydate2.getDate()).padStart(2, '0');
            var mm2 = String(nextdaydate2.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname2=nextdaydate2.toLocaleString('en-us', {weekday:'short'});
            var yyyy2 = nextdaydate2.getFullYear();
    
            // let strdate1 = mm + '-' + dd + '-' + yyyy;
            // let strdate2 = mm1+ '-' + dd1 + '-' + yyyy1;
            // let strdate3 = mm2+ '-' + dd2 + '-' + yyyy2;
            let strdate1 = dayname+' '+dd+'/'+mm;
            let strdate2 =dayname1+' '+dd1+'/'+mm1;
            let strdate3 = dayname2+' '+dd2+'/'+mm2;

            this.defaultDate = yyyy + '-' + mm + '-' + dd
            let tempdata = [];
            tempdata.push({ id: 1, title: strdate1,date:this.pipe.transform(new Date(date), 'MM-dd-yyyy')})
            tempdata.push({ id: 2, title: strdate2,date:this.pipe.transform(new Date(nextdaydate1), 'MM-dd-yyyy') })
            tempdata.push({ id: 3, title: strdate3,date:this.pipe.transform(new Date(nextdaydate2), 'MM-dd-yyyy') })
            this.calendarresources = tempdata;
            console.log("nextClick")
            let today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            let strdatenext = mm + '' + dd + '' + yyyy;
            if(Number(strdate)<Number(strdatenext)){
                this.external.nativeElement.style="display: none;";
            }
            else{
                this.external.nativeElement.style="display: visible;";
            }
            let dateparam=(this.pipe.transform(new Date(date), 'MM-dd-yyyy')+","+
            this.pipe.transform(new Date(nextdaydate1), 'MM-dd-yyyy') +","+
            this.pipe.transform(new Date(nextdaydate2), 'MM-dd-yyyy')).split('-').join('');
            this.getOfficeCalenderList(dateparam);
        });
        prevButton[0].addEventListener('click', () => {
           
            let calendarApi = this.calendarComponent.getApi();
            let prevdaydate = new Date(calendarApi.getDate())
            // let prevdaydate1 = new Date(calendarApi.getDate()+1)
            // let prevdaydate2 = new Date(calendarApi.getDate()+2)

            var dd = String(prevdaydate.getDate()).padStart(2, '0');
            var mm = String(prevdaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname=prevdaydate.toLocaleString('en-us', {weekday:'short'});
            var yyyy = prevdaydate.getFullYear();
            
            let strdate = mm + '' + dd + '' + yyyy;
            var date = new Date(prevdaydate);
            let prevdaydate1 = new Date(date);
            let prevdaydate2 = new Date(date);
            prevdaydate1.setDate(prevdaydate1.getDate() + 1);
            prevdaydate2.setDate(prevdaydate2.getDate() + 2);

            var dd1 = String(prevdaydate1.getDate()).padStart(2, '0');
            var mm1 = String(prevdaydate1.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname1=prevdaydate1.toLocaleString('en-us', {weekday:'short'});
            var yyyy1 = prevdaydate1.getFullYear();
    
            var dd2= String(prevdaydate2.getDate()).padStart(2, '0');
            var mm2 = String(prevdaydate2.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname2=prevdaydate2.toLocaleString('en-us', {weekday:'short'});
            var yyyy2 = prevdaydate2.getFullYear();
    
            // let strdate1 = mm + '-' + dd + '-' + yyyy;
            // let strdate2 = mm1+ '-' + dd1 + '-' + yyyy1;
            // let strdate3 = mm2+ '-' + dd2 + '-' + yyyy2;
            let strdate1 = dayname+' '+dd+'/'+mm;
            let strdate2 =dayname1+' '+dd1+'/'+mm1;
            let strdate3 = dayname2+' '+dd2+'/'+mm2;

            this.defaultDate = yyyy + '-' + mm + '-' + dd
            let tempdata = [];

            tempdata.push({ id: 1, title: strdate1,date:this.pipe.transform(new Date(date), 'MM-dd-yyyy')})
            tempdata.push({ id: 2, title: strdate2 ,date:this.pipe.transform(new Date(prevdaydate1), 'MM-dd-yyyy')})
            tempdata.push({ id: 3, title: strdate3,date:this.pipe.transform(new Date(prevdaydate2), 'MM-dd-yyyy') })
            this.calendarresources = tempdata;
            console.log("prevClick");




            let today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            let strdatepre = mm + '' + dd + '' + yyyy;

            this.external.nativeElement.style="display: visible;";
            if(Number(strdate)<Number(strdatepre)){
                this.external.nativeElement.style="display: none;";
            }
            let dateparam=(this.pipe.transform(new Date(date), 'MM-dd-yyyy')+","+this.pipe.transform(new Date(prevdaydate1), 'MM-dd-yyyy')+","
            +this.pipe.transform(new Date(prevdaydate2), 'MM-dd-yyyy') ).split('-').join('');
            this.getOfficeCalenderList(dateparam);
        });

        todayButton[0].addEventListener('click', () => {
            let calendarApi = this.calendarComponent.getApi();
            let todaydate = new Date(calendarApi.getDate())
            // let todaydate1 = new Date(calendarApi.getDate()+1)
            // let todaydate2 = new Date(calendarApi.getDate()+2)
            var dd = String(todaydate.getDate()).padStart(2, '0');
            var mm = String(todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname=todaydate.toLocaleString('en-us', {weekday:'short'});
            var yyyy = todaydate.getFullYear();
           
            var date = new Date(todaydate);
            let todaydate1 = new Date(date);
            let todaydate2 = new Date(date);
            todaydate1.setDate(todaydate1.getDate() + 1);
            todaydate2.setDate(todaydate2.getDate() + 2);


            var dd1 = String(todaydate1.getDate()).padStart(2, '0');
            var mm1 = String(todaydate1.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname1=todaydate1.toLocaleString('en-us', {weekday:'short'});
            var yyyy1 = todaydate1.getFullYear();
    
            var dd2= String(todaydate2.getDate()).padStart(2, '0');
            var mm2 = String(todaydate2.getMonth() + 1).padStart(2, '0'); //January is 0!
            var dayname2=todaydate2.toLocaleString('en-us', {weekday:'short'});
            var yyyy2 = todaydate2.getFullYear();
    
            // let strdate = mm + '-' + dd + '-' + yyyy;
            // let strdate1 = mm1+ '-' + dd1 + '-' + yyyy1;
            // let strdate2 = mm2+ '-' + dd2 + '-' + yyyy2;

            let strdate = dayname+' '+dd+'/'+mm;
            let strdate1 =dayname1+' '+dd1+'/'+mm1;
            let strdate2 = dayname2+' '+dd2+'/'+mm2;

            this.defaultDate = yyyy + '-' + mm + '-' + dd
            let tempdata = [];
            tempdata.push({ id: 1, title: strdate,date:this.pipe.transform(new Date(todaydate), 'MM-dd-yyyy') })
            tempdata.push({ id: 2, title: strdate1,date:this.pipe.transform(new Date(todaydate1), 'MM-dd-yyyy') })
            tempdata.push({ id: 3, title: strdate2,date:this.pipe.transform(new Date(todaydate2), 'MM-dd-yyyy') })
          
            this.calendarresources = tempdata;
            console.log("todayClick")
            this.external.nativeElement.style="display: visible;";
            let dateparam=(this.pipe.transform(new Date(todaydate), 'MM-dd-yyyy') +","+
            this.pipe.transform(new Date(todaydate1), 'MM-dd-yyyy')+","+this.pipe.transform(new Date(todaydate2), 'MM-dd-yyyy')).split('-').join('');
            this.getOfficeCalenderList(dateparam);
        });
    }

    getOfficeCalenderList(strdate: any) {
        
        let self=this;
        this._officeCalendarService.getOfficeCalenderList(strdate)
            .subscribe((res) => {

                let tempdata = [];
               
                let index=0;
                res.forEach((element: any) => {
                    if (element.schduleAppoinment.DoctorID != "") {
                        index++;
                         //let nextdaydate = new Date(element.schduleAppoinment.Date)
                        let calendarApi = self.calendarComponent.getApi();
                        let nextdaydate = new Date(calendarApi.getDate())
                        var dd = String(nextdaydate.getDate()).padStart(2, '0');
                        var mm = String(nextdaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = nextdaydate.getFullYear();
                        let strdate1 = yyyy + '-' + mm + '-' + dd;
                      tempdata.push({
                        resourceId: Number(element.schduleAppoinment.AppointmentId),
                        title: "", 
                        start: strdate1 + "T" + element.schduleAppoinment.FromTime.trim(),
                        end: strdate1 + "T" + element.schduleAppoinment.ToTime.trim(), 
                        
                        calendardId: element.schduleAppoinment.PatientID,
                        color: element.schduleAppoinment.ColorCode.trim()
                        // editable:
                      });
                    }
                    
                    
                  });
                  this.calendarEvents = tempdata;
            },
                err => {
                    console.log(err);
                });
    }
     datechange(arg: any) {
        this.external.nativeElement.style="display: visible;";
       
       // let strdate =  String(arg.month).padStart(2, '0')+""+ String(arg.day).padStart(2, '0')+""+arg.year;
        this.defaultDate = arg.year+"-"+String(arg.month).padStart(2, '0')+"-"+ String(arg.day).padStart(2, '0');
        let todaydate = new Date(this.defaultDate);
        this.calendarComponent.calendar.gotoDate(this.defaultDate);

        var dd = String(todaydate.getDate()).padStart(2, '0');
        var mm = String(todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname=todaydate.toLocaleString('en-us', {weekday:'short'});
        var yyyy = todaydate.getFullYear();
       
        var date = new Date(todaydate);
        let todaydate1 = new Date(date);
        let todaydate2 = new Date(date);
        todaydate1.setDate(todaydate1.getDate() + 1);
        todaydate2.setDate(todaydate2.getDate() + 2);


        var dd1 = String(todaydate1.getDate()).padStart(2, '0');
        var mm1 = String(todaydate1.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname1=todaydate1.toLocaleString('en-us', {weekday:'short'});
        var yyyy1 = todaydate1.getFullYear();

        var dd2= String(todaydate2.getDate()).padStart(2, '0');
        var mm2 = String(todaydate2.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dayname2=todaydate2.toLocaleString('en-us', {weekday:'short'});
        var yyyy2 = todaydate2.getFullYear();

        // let strdate = String(arg.month).padStart(2, '0')+"-"+ String(arg.day).padStart(2, '0')+"-"+arg.year;
        // let strdate1 = mm1+ '-' + dd1 + '-' + yyyy1;
        // let strdate2 = mm2+ '-' + dd2 + '-' + yyyy2;
        let strdate = dayname+' '+dd+'/'+mm;
        let strdate1 =dayname1+' '+dd1+'/'+mm1;
        let strdate2 = dayname2+' '+dd2+'/'+mm2;
        this.defaultDate = yyyy + '-' + mm + '-' + dd
        let tempdata = [];
        tempdata.push({ id: 1, title: strdate,date:this.pipe.transform(new Date(date), 'MM-dd-yyyy') })
        tempdata.push({ id: 2, title: strdate1,date:this.pipe.transform(new Date(todaydate1), 'MM-dd-yyyy') })
        tempdata.push({ id: 3, title: strdate2 ,date:this.pipe.transform(new Date(todaydate2), 'MM-dd-yyyy')})
      
        this.calendarresources = tempdata;

        let dateparam=(this.pipe.transform(new Date(date), 'MM-dd-yyyy')+","+this.pipe.transform(new Date(todaydate1), 'MM-dd-yyyy')+","+
        this.pipe.transform(new Date(todaydate2), 'MM-dd-yyyy')).split('-').join('');
        this.getOfficeCalenderList(dateparam);

    }
    


}
