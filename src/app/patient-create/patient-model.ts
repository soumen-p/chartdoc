
export class PatientDetail {
    patientId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    addressLine: string;
    addressLine1: string;
    addressCity: string;
    addressState: string;
    addressPostalCode: string;
    addressCountry: string;
    dob: string;
    gender: string;
    email: string;
    mobNo: string;
    primaryPhone: string;
    secondaryPhone: string;
    imageName: string;
    imagePath: string;
    flag: string;
    age: string;
    recopiaId: string;
    recopiaName: string;
}

export class EmployerContact {
    patientId: string;
    name: string;
    phone: string;
    address: string;
}

export class EmergencyContact{
    patientId: string;
    contactName: string;
    contactPhone: string;
    relationship: string;
}

export class Social{
    patientId: string;
    maritalStatus: string;
    socialMaritalStatusOther: string;
    guardianFName: string;
    guardianLName: string;
    addLine: string;
    addCity: string;
    addState: string;
    addZip: string;
    dob: string;
    patientSSN: string;
    phoneNumber: string;
    guardianSSN: string;
    driversLicenseFilePath: string;
    race: string;
    ethicity: string;
    language: string;
    commMode: string;
   
}

export class Billing{
    patientId: string;
    billingParty: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    addLine: string;
    addLine1: string;
    addCity: string;
    addState: string;
    addZip: string;
    SSN: string;
    driversLicenseFilePath: string;
    primaryPhone: string;
    secondaryPhone: string;
    billingPartyOther:string;
}

export class Insurance{
    patientId: string;
    providerId: string;
    providerName: string;
    insurancePolicy: string;
    policyType: string;
    policyTypeId: string;
    cardImageFilePath: string;
    effectiveFrom: string;
    status: string;
    statusId: string;
    files: File;
}

export class Authorization {
    patientId: string;
    authorizationFilePath: string;
}


//Other Info

export class Alert {
    id: string;
    patientId: string;
    code: string;
    description: string;
}

export class Allergies {
    id: string;
    patientId: string;
    code: string;
    description: string;
}

export class Immunizations {
    id: string;
    patientId: string;
    code: string;
    description: string;
    date: string;
}

export class Socials {
    id: string;
    patientId: string;
    addiection: string;
    frequency: string;
    duration: string;
}
export class Families {
    id: string;
    patientId: string;
    member: string;
    diseases: string;
}

//Other Info