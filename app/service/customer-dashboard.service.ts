import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { flightSearch } from '../model/flightSearch.model';
import { airports } from '../model/airport.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  selected : string = 'search-flights';
  flight !: flightSearch;
  ticketPrice : number = 0;

  constructor(private http : HttpClient) { }

  private getHeaders() : HttpHeaders{
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }
    )
  }

  setSelected(input : string){
    this.selected = input;
  }

  getSelected(){
    return this.selected;
  }



  getAirport(code : string) : Observable<airports>{
    return this.http.get<airports>('http://localhost:8080/simply-fly/admin/find-airport/'+code, {headers : this.getHeaders()});
  }

  setFlightData(data : flightSearch, ticketPrice : number){
    this.flight = data;
    localStorage.setItem('source',this.flight.source.iataCode);
    localStorage.setItem('destination',this.flight.destination.iataCode);
    this.ticketPrice = ticketPrice;
    console.log(this.ticketPrice);
  }

  getFlightData(){
    return this.flight;
  }

  getTicketPrice(){
    return this.ticketPrice;
  }
}
