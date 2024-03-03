import { passenger } from "./passenger";

export interface bookingInput{
    flightTripId : number;
    passengers : passenger[];
}