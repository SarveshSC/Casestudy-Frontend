import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flight } from '../model/flight.model';
import { flightTrip } from '../model/flightTrip.model';
import { flightSearch } from '../model/flightSearch.model';
import { Observable } from 'rxjs';
import { airports } from '../model/airport.model';


@Injectable({
  providedIn: 'root'
})
export class FlightOwnerDashboardService {
  

  flightTripCode!:string;

  selected : string = 'flights';

  

  baseURL : string = 'http://localhost:8080/simply-fly';

  constructor(private http : HttpClient) { }

  private getHeaders() : HttpHeaders{
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }
    )
  }

setFlightTripCode(data:any){
  this.flightTripCode=data
}

getFlightTripCode(){
  return this.flightTripCode;
}

  setSelected(input : string){
    this.selected = input;
  }

  getSelected(){
    return this.selected;
  }

 

  addFlight(selectedflight: flight) {
    return this.http.post<flight>(this.baseURL+'/flights/add-flights/'+localStorage.getItem('username'),selectedflight,{headers : this.getHeaders()})
  }
  getAllFlights() {
    return this.http.get<flight[]>(this.baseURL+'/flights/get-flights-by-username/'+localStorage.getItem('username'),{headers : this.getHeaders()})
  }

  updateFlightTrip(flighttrip: flightTrip) {
    return this.http.put<flightTrip>(this.baseURL+'/flightTrips/reschedule-flight/'+localStorage.getItem('username'),flighttrip,{headers : this.getHeaders()});
  }
  findByFlightId(flightcode: string) {
    return this.http.get<flightTrip[]>(this.baseURL+'/flightTrips/get-all-flight-details/'+flightcode,{headers : this.getHeaders()})
  }

  searchFlights(data : flightSearch) : Observable<flightTrip[]>{
    return this.http.get<flightTrip[]>(this.baseURL+'/flightTrips/search-flights-by-date-source-destination/'+data.date+'/'+data.source+'/'+data.destination);
  }

  getAllTrips() : Observable<flightTrip[]>{
    return this.http.get<flightTrip[]>(this.baseURL+'/flightTrips/get-flightTrips-by-username/'+localStorage.getItem('username'),{headers : this.getHeaders()});
  }

  updateFlight(selectedflight: any) {
    console.log(selectedflight)
    return this.http.put<flight>(this.baseURL+'/flights/update-flights/'+localStorage.getItem('username'),selectedflight,{headers:this.getHeaders()});
  }

  getAllFlightTrips() {
    return this.http.get<flightTrip[]>(this.baseURL+'/flightTrips/get-flightTrips-by-username/'+localStorage.getItem('username'),{headers : this.getHeaders()})
  }

  addFlightTrip(data:any,flightCode:string){
    return this.http.post<flightTrip>(this.baseURL+'/flightTrips/schedule-flight/'+flightCode+'/'+data.source+'/'+data.destination+'/'+localStorage.getItem('username'),data,{headers:this.getHeaders()})
  }

  getAllAirports() {
    return this.http.get<airports[]>(this.baseURL+'/admin/list-all-airports');
  }

  cancelFlight(flightTripId:any){
    //return this.http.delete<string>(this.baseURL+'/flightTrips/cancel-flight/'+flightTripId+'/'+localStorage.getItem('username'),{headers:this.getHeaders(),responseType:'text'})
  return this.http.delete<string>(this.baseURL + '/flightTrips/cancel-flight/' + flightTripId + '/' + localStorage.getItem('username'), { headers: this.getHeaders(),responseType:'text' as 'json'});

  }

  deleteFlight(code:any){
    return this.http.delete<string>(this.baseURL+'/flights/delete-flights/'+localStorage.getItem('username')+'/'+code,{headers:this.getHeaders(),responseType:'text' as 'json'})
  }
}
