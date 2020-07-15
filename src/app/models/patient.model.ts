import { CareProvider } from './care-provider.model';
import { Name } from './patient-name.model';
import { Identifier } from './identifier.model';
import { Address } from './address.model';
import { Telecom } from './telecom.model';
import { MaritalStatus } from './marital-status.model';
import { Communication } from './communication.model';
import { Extension } from './extension.model';
import { Injectable } from '@angular/core';
import { ModelAdapter } from './model-adapter';

export interface IPatient {
    id: string;
    birthdate: Date;
    active: boolean;
    age: string;
    gender: string;
    flag: string;
    imagePath: string;
    deceasedBoolean: boolean;
    careProvider: CareProvider;
    name: Name[];
    identifier: Identifier[];
    address: Address[];
    telecom: Telecom[];
    maritalStatus: MaritalStatus;
    communication: Communication;
    extension: Extension[];
}

export class Patient implements IPatient {
    id: string;
    birthdate: Date;
    active: boolean;
    age: string;
    gender: string;
    flag: string;
    imagePath: string;
    deceasedBoolean: boolean;
    careProvider: CareProvider;
    name: Name[];
    identifier: Identifier[];
    address: Address[];
    telecom: Telecom[];
    maritalStatus: MaritalStatus;
    communication: Communication;
    extension: Extension[];

    constructor(obj?: IPatient) {
        if (obj) {
            Object.assign(this, obj);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class PatientAdapter implements ModelAdapter<Patient> {
    adapt(item: any): Patient {
        const obj = new Patient(item);
        if (item.birthdate) {
            obj.birthdate = new Date(item.birthdate);
        }
        return obj;
    }
}
