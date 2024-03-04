import { passenger } from "./passenger";
import { payment } from "./payment.model";

export interface booking{
    bookingId : string;
    amount : number;
    bookingDateTime : Date;
    status:string;
    passengers:passenger[]
    payments : payment;
    showPassengers : boolean;
    flightTripId : number;
    customerId : number;
    
}