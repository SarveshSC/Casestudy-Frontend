import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flightSearch } from 'src/app/model/flightSearch.model';
import { passenger } from 'src/app/model/passenger';

import { seat } from 'src/app/model/seat.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';
import { PaymentService } from 'src/app/service/payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit{
  flightTripId : number = 0;
  selectedSeats = new Set<seat>();
  ticketPrice = 0;
  amount = 0;

  flight : flightSearch = {
    source : {
      iataCode : '',
      name : '',
      location : ''
    },
    destination : {
      iataCode : '',
      name : '',
      location : ''
    },
    date : new Date()
  }

  passengers !: any[];

  passenger : passenger = {
    passengerId: '',
    name: '',
    age: 0,
    gender: 'Gender',
    seatNo: '',
    flightTripId: 0
  }

  source : string = '';
  destination : string = '';

  flag = false;


  constructor(private route : ActivatedRoute, private customerService : CustomerDashboardService, private bookingService : BookingService, private router : Router,
    private paymentService : PaymentService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightTripId = params['flightTripId'];
      // console.log(this.flightTripId);
    });
    this.getFlightData();
    this.ticketPrice = this.customerService.getTicketPrice();
    // console.log(this.flight);
    this.getSelectedSeats();

    this.passengers = Array.from(this.selectedSeats).map(seatNo => ({
      name: '',
      age: '',
      gender: '',
      seatNo: seatNo,
    }));
  }

  readFormData(formData : any){
    console.log(formData.value);
    console.log(this.passengers);

    console.log(this.ticketPrice * this.selectedSeats.size)
    this.paymentService.setAmount(this.selectedSeats.size * this.ticketPrice);
    // this.router.navigate(['customer/payments']);

    // this.bookingService.bookFlights(this.flightTripId, this.passengers);
  }

  getFlightData() {
    this.source = localStorage.getItem('source') || '';
    this.destination = localStorage.getItem('destination') || '';

    // console.log(this.source + ' ' + this.destination);

    if (this.source) {
      this.customerService.getAirport(this.source).subscribe(airport => {
        if (airport) {
          this.flight.source = airport;
        }
      });
    }
    if (this.destination) {
      this.customerService.getAirport(this.destination).subscribe(airport => {
        if (airport) {
          this.flight.destination = airport;
        }
      });
    }
    this.flight = this.customerService.getFlightData();
  }

  getSelectedSeats(){
    console.log('get selected called')
    this.selectedSeats = this.bookingService.getSelectedSeats();
    console.log(this.selectedSeats.size);
    if(this.selectedSeats.size > 0){
      this.flag = true;
      console.log('flag = ' +  this.flag)
    }
    return this.selectedSeats;
  }

  clearSelectedSeats(){
    this.bookingService.clearSelectedSeats();
  }

  routeToPayment(amount : number){
    this.paymentService.setAmount(amount);
    this.paymentService.initiatePayment(amount);
    this.bookingService.passengers = this.passengers;
    this.bookingService.flightTripId = this.flightTripId;
    // this.router.navigate(['/customer/payment']);
    // this.bookingService.bookFlights();
  }

}