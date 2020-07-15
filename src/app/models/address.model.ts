import { StayPeriodAdapter } from './stay-period.model';

export class Address{
    use: string;
    line: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    period: StayPeriodAdapter;
}