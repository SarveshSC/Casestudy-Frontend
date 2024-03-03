import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flightSearch } from '../model/flightSearch.model';
import { flightTrip } from '../model/flightTrip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightTripService {
 

  constructor(private http : HttpClient) { }

  baseURL : string = 'http://localhost:8080/simply-fly/flightTrips/search-flights-by-date-source-destination/'

  searchFlights(data : flightSearch) : Observable<flightTrip[]>{
    return this.http.get<flightTrip[]>(this.baseURL+data.date+'/'+data.source+'/'+data.destination);
  }
}
