import { passenger } from "./passenger";
import { payment } from "./payment.model";

export interface booking{
    bookingId : string;
    amount : number;
    bookingDateTime : Date;
    airlineId : string;
    status:string;
    customerId:string;
    flightTripId:number;
    passengers:passenger[]
    showPassengers:boolean;
    payments : payment;
    
}