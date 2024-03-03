import { airports } from "./airport.model";

export interface flightSearch{
    source : airports;
    destination : airports;
    date : Date;
}