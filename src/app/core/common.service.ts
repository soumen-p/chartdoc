import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private doctorName = new BehaviorSubject('');
  currentDoctor = this.doctorName.asObservable();

  private doctorImage = new BehaviorSubject('');
  doctorImg = this.doctorImage.asObservable();

  private patientName = new BehaviorSubject('');
  currentPatient = this.patientName.asObservable();

  private patientFirstName = new BehaviorSubject('');
  currentPatientFirstName = this.patientFirstName.asObservable();

  private patientLastName = new BehaviorSubject('');
  currentPatientLastName = this.patientLastName.asObservable();

  private patientImage = new BehaviorSubject('');
  currentPatientImg = this.patientImage.asObservable();

  private patientAge = new BehaviorSubject('');
  currentPatientAge = this.patientAge.asObservable();

  private patientGender = new BehaviorSubject('');
  currentPatientGender = this.patientGender.asObservable();

  private conditionalFlag = new BehaviorSubject('');
  flag = this.conditionalFlag.asObservable();

  private patientId = new BehaviorSubject('');
  currentPatientId = this.patientId.asObservable();

  private EncounterNote = new BehaviorSubject('');
  CurrentEncounterNote = this.EncounterNote.asObservable();

  private FollowUpDate = new BehaviorSubject('');
  CurrentFollowUpDate = this.FollowUpDate.asObservable();

  private FollowUpDateImage = new BehaviorSubject('');
  CurrentFollowUpDateImage = this.FollowUpDateImage.asObservable();

  private FollowUpDay = new BehaviorSubject('');
  CurrentFollowupDay = this.FollowUpDay.asObservable();

  private FollowUpDayImage = new BehaviorSubject('');
  CurrentFollowupDayImage = this.FollowUpDayImage.asObservable();

  private FollowUpLatest = new BehaviorSubject('');
  CurrentFollowUpLatest = this.FollowUpLatest.asObservable();

  private CCValue = new BehaviorSubject('');
  CurrentCCValue = this.CCValue.asObservable();

  private ImpressionPlanValue = new BehaviorSubject('');
  CurrentImpresionPlanValue = this.ImpressionPlanValue.asObservable();

  private IcdDetailsCode = new BehaviorSubject('');
  IcdCode = this.IcdDetailsCode.asObservable();

  private IcdDetailsDesc = new BehaviorSubject('');
  IcdDesc = this.IcdDetailsDesc.asObservable();

  constructor() { }

  conditionDataToFetch(flag: string){
    this.conditionalFlag.next(flag);
  }
  changeDoctor(doctor: string) {
    this.doctorName.next(doctor);
  }

  changeImage(doctorImg: string){
    this.doctorImage.next(doctorImg);
  }

  changePatient(patient: string) {
    this.patientName.next(patient);
  }

  changePatientFirstName(patientFirstName: string) {
    this.patientFirstName.next(patientFirstName);
  }

  changePatientLastName(patientLastName: string) {
    this.patientLastName.next(patientLastName);
  }

  changePatientImage(patientImg: string){
    this.patientImage.next(patientImg);
  }

  changePatientAge(patientAge: string){
    this.patientAge.next(patientAge);
  }

  changePatientGender(patientGender: string){
    this.patientGender.next(patientGender);
  }

  PatientSearchId(Id:string){
    this.patientId.next(Id);  
  }

  EncounterNotes(Note:string){
    this.EncounterNote.next(Note);
  }  

  FollowupDay(day:string){
    this.FollowUpDay.next(day);
  }
  FollowupDayImage(dayimage:string){
    this.FollowUpDayImage.next(dayimage);
  }

  FollowupDate(FDate:string){
    this.FollowUpDate.next(FDate);
  }

  FollowupDateImage(image:string){
    this.FollowUpDateImage.next(image);
  }
  
  FollowUp(Latest:string){
    this.FollowUpLatest.next(Latest);
  }

  AddCCValue(Value:string){
    this.CCValue.next(Value);
  }
  AddImpressionPlanValue(Value:string){
    this.ImpressionPlanValue.next(Value);
  }

  GetIcdDetailsCode(Id:string){
    this.IcdDetailsCode.next(Id);
  }

  GetIcdDetailsDescription(Text:string){
    this.IcdDetailsDesc.next(Text);
  }
}
