import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { airports } from '../model/airport.model';
import { airline } from '../model/airline.model';
import { customer } from '../model/customer.model';
import { flightOwner } from '../model/flight-owner.model';
import { flight } from '../model/flight.model';
import { booking } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  selected: string = 'airports';

  baseURL: string = 'http://localhost:8080/simply-fly/admin/';

  constructor(private http: HttpClient) { }

  private _refreshRequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshRequired;
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('the token is' + localStorage.getItem('token'))
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    )
  }

  setSelected(input: string) {
    this.selected = input;
  }

  getSelected(): string {
    return this.selected;
  }

  getAirports(): Observable<airports[]> {
    return this.http.get<airports[]>(this.baseURL + "list-all-airports", { headers: this.getHeaders() });
  }

  getAirlines(): Observable<airline[]> {
    return this.http.get<airline[]>(this.baseURL + "list-all-airlines", { headers: this.getHeaders() });
  }

  getCustomers(): Observable<customer[]> {
    console.log(this.baseURL + "list-all-customers");
    return this.http.get<customer[]>(this.baseURL + "list-all-customers", { headers: this.getHeaders() });
  }

  getFlightOwners(): Observable<flightOwner[]> {
    return this.http.get<flightOwner[]>(this.baseURL + 'list-all-users', { headers: this.getHeaders() });
  }

  approveUser(username: any) {
    return this.http.put<string>(this.baseURL + 'approve-user/' + username, {}, { headers: this.getHeaders() }).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  getCustomerBookingsByUsername(username:any){
    return this.http.get<booking[]>("http://localhost:8080/simply-fly/customers/get-customer-bookings-by-username/"+username,{headers:this.getHeaders()})
  }
}
