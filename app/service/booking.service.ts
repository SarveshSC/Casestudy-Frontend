import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking } from '../model/booking.model';
import { Observable } from 'rxjs';
import { seat } from '../model/seat.model';
import { ReturnStatement } from '@angular/compiler';
import { passenger } from '../model/passenger';
import { bookingInput } from '../model/bookingInput.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  selectedSeats = new Set<seat>();
 
  flightTripId : number = 0;
  bookingId : number = 0;
  passengers : passenger[] = [];
  paymentId : string = '';
  
  setBookingId(data:any){
    this.bookingId=data
  }

  getBookingId(){
    return this.bookingId
  }

  constructor(private http : HttpClient) { }

  private getHeaders() : HttpHeaders{
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }

    )
    header.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    return header;
  }

  private newHeader() : HttpHeaders{
    return new HttpHeaders({
      
      'Access-Control-Allow-Origin' : '*'});
  }
  baseURL : string = 'http://localhost:8080/simply-fly/'

  getBookings() : Observable<booking[]> {
    return this.http.get<booking[]>(this.baseURL+'flightTrips/get-bookings-by-username/'+localStorage.getItem('username'), {headers : this.getHeaders()});
  }

  setSelectedSeats(seatsList : any){
    this.selectedSeats = seatsList;
  }

  getSelectedSeats(){
    return this.selectedSeats;
  }

  getVacantSeats(flightTripId : number){
    return this.http.get<seat[]>(this.baseURL + 'customers/booking/get-all-vacant-seats/'+flightTripId, {headers : this.getHeaders()});
  }

  getBookingsByFlightTrip(bookingCode:any){
    return this.http.get<booking[]>(this.baseURL+'flightTrips/get-bookings-by-flightTripId/'+localStorage.getItem('username')+'/'+bookingCode,{headers:this.getHeaders()});
  }

  clearSelectedSeats(){
    this.selectedSeats = new Set<seat>();
  }

  bookFlights(){
    console.log('book flights called ' + this.flightTripId + ' ' + this.passengers);

    const requestBody = {
      passengers: this.passengers.map(passenger => ({
        name: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
        seat: passenger.seatNo
      })),
      paymentId : this.paymentId
    }
    console.log('payment id ' + this.paymentId);
    console.log(requestBody);

    this.http.post<booking>(this.baseURL+'customers/booking/book-flight/' + localStorage.getItem('username') + '/' + this.flightTripId, requestBody, {headers : this.getHeaders()}).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    )
  }
  setPaymentId(paymentId : string){
    this.paymentId = paymentId;
  }
}
