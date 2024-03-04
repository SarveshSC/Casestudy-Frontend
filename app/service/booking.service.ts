import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking } from '../model/booking.model';
import { Observable } from 'rxjs';
import { seat } from '../model/seat.model';
import { ReturnStatement } from '@angular/compiler';
import { passenger } from '../model/passenger';
import { bookingInput } from '../model/bookingInput.model';
import { CustomerDashboardService } from './customer-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  selectedSeats = new Set<seat>();
 
  flightTripId : number = 0;
  bookingId : number = 0;
  passengers : passenger[] = [];
  paymentId : string = '';
  bookingInfo : booking = {
    payments: {
      paymentId: '',
      status: '',
      name: '',
      amount: 0
    },
    bookingId: '',
    amount: 0,
    bookingDateTime: new Date,
    status: '',
    passengers: [],
    showPassengers: false,
    flightTripId: 0,
    customerId: 0
  };
  
  setBookingId(data:any){
    this.bookingId=data
  }

  getBookingId(){
    return this.bookingId
  }

  constructor(private http : HttpClient, private customerService : CustomerDashboardService) { }

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

  bookFlights() {
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
      (response) => {
        console.log(response),
        this.bookingInfo.bookingId = response.bookingId;
        this.bookingInfo.amount = response.amount;
        this.bookingInfo.bookingDateTime = response.bookingDateTime;
        this.bookingInfo.passengers = response.passengers;
        this.bookingInfo.payments = response.payments;
        this.bookingInfo.status = response.status;
        this.bookingInfo.flightTripId = response.flightTripId;

        console.log(this.bookingInfo);
        this.customerService.sendEmail(this.bookingInfo.bookingId);
      },
      (error) => console.error(error)
    )
  }

  cancelBooking(bookingId : number){
    console.log('delete')
    console.log(bookingId)
    console.log(this.baseURL+'customers/booking/cancel-flight/'+ localStorage.getItem('username') + '/' + bookingId)
    this.http.put<string>(this.baseURL+'customers/booking/cancel-flight/'+ localStorage.getItem('username') + '/' + bookingId,{}, {headers : this.getHeaders()}).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }

  setPaymentId(paymentId : string){
    this.paymentId = paymentId;
  }

  getCustomerBookings() : Observable<booking[]>{
    console.log(this.baseURL + 'customers/booking/get-by-customer/' + localStorage.getItem('username'));
    return this.http.get<booking[]>(this.baseURL + 'customers/booking/get-by-customer/' + localStorage.getItem('username'), {headers : this.getHeaders()});
  }

  getBookingInfo() : booking{
    return this.bookingInfo;
  }
}
