import { Time } from '@angular/common';

export class Appointment {
    AppointmentId: number;
    AppointmentNo: string;
    PatientId: string;
    PatientName: string;
    Address: string;
    ContactNo: string;
    Email:string;
    dOB:string;
    Gender:string;
    DoctorId: string;
    Date: string;
    FromTime: Time;
    ToTime: Time;
    ReasonCode: string;
    ReasonDescription: string;
    Tag: string;
    ReasonID: string;
    Reason: string;
    IsReady: boolean;
    PositionID: number;
    PositionName: string;
    RoomNO: string;
    Flowarea: string;
    ServiceId: number;
    Note: string;
    FName :string;
    MName:string;
    LName:string;
}