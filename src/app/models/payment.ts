import { PaymentHeader } from 'src/app/models/payment-header';
import { PaymentBreakup } from '../models/payment-breakup';
import { PaymentClaimHeader } from '../models/payment-claim-header';
import { PaymentDetails } from '../models/payment-details';
export class Payment {

      paymentHeader : PaymentHeader;
      paymentDetails : PaymentDetails[];
      paymentBreakup : PaymentBreakup[];

}

