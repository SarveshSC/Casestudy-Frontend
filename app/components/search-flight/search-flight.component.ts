import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { airports } from 'src/app/model/airport.model';
import { flightSearch } from 'src/app/model/flightSearch.model';
import { flightTrip } from 'src/app/model/flightTrip.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';
import { FlightTripService } from 'src/app/service/flight-trip.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  flightList : flightTrip[] = [];
  airportList: airports[] = [];
  myControl = new FormControl();
  myForm!:FormGroup
  filteredOptionsForSource!:Observable<airports[]>
  filteredOptionsForDestination!:Observable<airports[]>
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
    private route : Router, private dashboardService: FlightOwnerDashboardService, private formbuilder: FormBuilder){ 
      this.getAllAirports();
    }
  ngOnInit(): void {
    this.myForm = this.formbuilder.group({

      source: ['', Validators.required],
      destination: ['',Validators.required],
      date:['',Validators.required]
      

    }); 
    this.filteredOptionsForDestination = (this.myForm.get('destination')?.valueChanges ?? new Observable()).pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    this.filteredOptionsForSource = (this.myForm.get('source')?.valueChanges ?? new Observable()).pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value:string):airports[]{
    const filterValue=value.toLowerCase();
    return this.airportList.filter(option=>option.iataCode.toLocaleLowerCase().includes(filterValue) ||
    option.location.toLocaleLowerCase().includes(filterValue) ||
    option.name.toLocaleLowerCase().includes(filterValue) );
  }


  searchFlight(){ 
    this.flight = this.myForm.value;
    this.customerService.getAirport(this.myForm.get('source')?.value).subscribe( (airport) => this.flight.source = airport);
    this.customerService.getAirport(this.myForm.get('destination')?.value).subscribe( (airport) => this.flight.destination = airport);

    console.log(this.flight);

    this.tripService.searchFlights(this.myForm.value).subscribe((list) => this.flightList = list);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): flightTrip[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.flightList.length;
    return this.flightList.slice(startIndex, startIndex + this.pageSize);
  }

  setFlightData(flight : flightSearch, ticketPrice : number, flightTripId : number){
    if(localStorage.getItem('username') === 'Guest'){
      this.route.navigate(['/login']);
    }
    this.bookingService.clearSelectedSeats();
    this.customerService.setFlightData(flight, ticketPrice);

    this.route.navigate(['/customer/book-flight/',flightTripId])
  }

  getAllAirports() {
    this.dashboardService.getAllAirports().subscribe((list) => {
      this.airportList = list
      console.log(this.airportList)
    })
}
}
