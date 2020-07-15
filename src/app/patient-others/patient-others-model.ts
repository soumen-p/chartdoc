
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
