import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { airports } from 'src/app/model/airport.model';
import { flightSearch } from 'src/app/model/flightSearch.model';
import { seat } from 'src/app/model/seat.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent implements OnInit{

  source : string = '';
  destination : string = '';

  flightTripId : number = 0;
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

  leftRows = [
    { name: 'F'},
    { name: 'E'},
    { name: 'D'}    
  ];

  rightRows = [
    { name: 'C'},
    { name: 'B'},
    { name: 'A'}
  ]
  columns = 30;

  selectedSeats = new Set<seat>;
  isSelected : { [seat : string ] : boolean} = {};

  vacantSeats : seat[] = [];

  totalSeats : seat[] = [];

  ticketPrice : number = 0;

  constructor(private bookingService : BookingService, private customerService : CustomerDashboardService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightTripId = params['flightTripId'];
      // console.log(this.flightTripId);
    });
    this.getFlightData();
    this.generateTotalSeats();
    this.getVacantSeats();
    this.getTicketPrice();

    if(this.ticketPrice === 0){
      this.router.navigateByUrl('/customer');
    }
  }

  selectSeat(data : any){
    // console.log(data);
    // console.log(data.target.innerText);
    var seat = data.target.innerText.slice(0,3).trim();
    // console.log(seat);

    if(this.selectedSeats.has(seat)){
      this.selectedSeats.delete(seat);
      this.isSelected[seat] = false;
    }
    else{
      this.selectedSeats.add(seat);
      this.isSelected[seat] = true;
    }
    console.log(this.selectedSeats);
  }

  setSelectedSeats(){
    this.bookingService.setSelectedSeats(this.selectedSeats);
  }

  clearSelectedSeats(){
    this.selectedSeats = new Set<seat>();
  }

  getVacantSeats(){
    // console.log('method called')
    const a : seat[] = [];
    this.bookingService.getVacantSeats(this.flightTripId).subscribe( (list) => {
      // console.log(list);
      this.vacantSeats = list.map((seat) => ({...seat, status:'Vacant'}));
      this.getBookedSeats();
    });
  }

  getSeatsByRow(rowLabel : string){
    return this.totalSeats.filter( (seat) => seat.seatNo.slice(-1) === rowLabel);
  }

  getBookedSeats(){
    if(this.vacantSeats.length > 0){
      // console.log('booked seats called');
      const bookedSeats = new Set<string>(this.totalSeats.filter(seat => 
        !this.vacantSeats.some(vacantSeat => vacantSeat.seatNo === seat.seatNo)).map((seat) => seat.seatNo));

      this.totalSeats.forEach(seat => {
        if (bookedSeats.has(seat.seatNo)) {
          seat.status = 'Booked';
        }
      });
      // console.log(this.totalSeats);
    }
    else{
      console.log('vacant seats data empty');
    }
  }

  generateTotalSeats(){
    for(let row of this.leftRows){
      for(let j = 0; j < this.columns; j++){
        const seatNo = (j+1) + row.name;
        this.totalSeats.push({seatNo, status:'Vacant'});
      }
    }

    for(let row of this.rightRows){
      for(let j = 0; j < this.columns; j++){
        const seatNo = (j+1) + row.name;
        this.totalSeats.push({seatNo, status:'Vacant'});
      }
    }
  }

  continue(){
    this.setSelectedSeats();
    this.router.navigate(['customer/book-flight/'+this.flightTripId]);

  }

  getTicketPrice(){
    this.ticketPrice = this.customerService.getTicketPrice();
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
}
