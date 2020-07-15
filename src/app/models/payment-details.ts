export class PaymentDetails {

    patientId: string;
    typeOfTxnId: number;
    typeOfTxnName: string;
    reasonId: number;
    reasonName: string;
    instrumentTypeId: number;
    instrumentTypeName: string;
    ref1: string;
    ref2: string;
    paymentDate: Date;
    amount: number;
    transferId: number;
    transferName: string;

    deleteFlag: boolean;

}
