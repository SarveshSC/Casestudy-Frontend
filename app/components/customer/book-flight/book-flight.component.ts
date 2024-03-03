import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flightSearch } from 'src/app/model/flightSearch.model';
import { flightTrip } from 'src/app/model/flightTrip.model';
import { passenger } from 'src/app/model/passenger';

import { seat } from 'src/app/model/seat.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit{
  flightTripId : number = 0;
  selectedSeats = new Set<seat>();

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


  constructor(private route : ActivatedRoute, private service : CustomerDashboardService, private bookingService : BookingService, private router : Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightTripId = params['flightTripId'];
      // console.log(this.flightTripId);
    });
    this.getFlightData();
    // console.log(this.flight);
    this.getSelectedSeats();
  }

  readFormData(data : any){
    console.log(data);
  }

  getFlightData() {
    this.source = localStorage.getItem('source') || '';
    this.destination = localStorage.getItem('destination') || '';

    // console.log(this.source + ' ' + this.destination);

    if (this.source) {
      this.service.getAirport(this.source).subscribe(airport => {
        if (airport) {
          this.flight.source = airport;
        }
      });
    }
    if (this.destination) {
      this.service.getAirport(this.destination).subscribe(airport => {
        if (airport) {
          this.flight.destination = airport;
        }
      });
    }
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
}