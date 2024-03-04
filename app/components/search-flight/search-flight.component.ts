import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { flightSearch } from 'src/app/model/flightSearch.model';
import { flightTrip } from 'src/app/model/flightTrip.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';
import { FlightTripService } from 'src/app/service/flight-trip.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent {
  flightList : flightTrip[] = [];
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
  currentPage = 0;
  pageSize = 5;
  totalItems = this.flightList.length;
  flag !: boolean;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private tripService : FlightTripService, private customerService : CustomerDashboardService, private bookingService : BookingService, 
    private route : Router){ }

  searchFlight(formdata : any){ 
    this.flight = formdata;
    this.customerService.getAirport(formdata.source).subscribe( (airport) => this.flight.source = airport);
    this.customerService.getAirport(formdata.destination).subscribe( (airport) => this.flight.destination = airport);

    console.log(this.flight);

    this.tripService.searchFlights(formdata).subscribe((list) => this.flightList = list);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): flightTrip[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.flightList.length;
    return this.flightList.slice(startIndex, startIndex + this.pageSize);
  }

  setFlightData(flight : flightSearch, ticketPrice : number){
    if(localStorage.getItem('username') === 'Guest'){
      this.route.navigate(['/login']);
    }
    this.bookingService.clearSelectedSeats();
    this.customerService.setFlightData(flight, ticketPrice);
  }
}
