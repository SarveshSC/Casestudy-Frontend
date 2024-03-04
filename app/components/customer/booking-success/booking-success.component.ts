import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { booking } from 'src/app/model/booking.model';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit{

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
  flight : any;
  bookingId : any;
  paymentId : any;
  
  constructor(private bookingService : BookingService, private route : Router, private customerService : CustomerDashboardService) {}

  ngOnInit(): void {
      // this.bookingInfo = this.bookingService.getBookingInfo();
      // console.log(this.bookingInfo);
      this.flight = this.customerService.flight;
      this.bookingId = this.bookingService.bookingId;
      this.paymentId = this.bookingService.paymentId;
      this.bookingInfo = this.bookingService.bookingInfo;
      this.getBookingInfo();

      if(this.paymentId === ''){
        this.route.navigateByUrl('/customer');
      }
  }

  redirectToDashboard(){
    console.log(localStorage.getItem('role'));

    if(localStorage.getItem('role') === 'Admin'){
      this.route.navigate(['admin']);
    }
    if(localStorage.getItem('role') === 'FlightOwner'){
      this.route.navigate(['flight-owner']);
    }
    if(localStorage.getItem('role') === 'Customer'){
      this.route.navigate(['customer']);
    }
  }

  getBookingInfo(){
    this.bookingInfo = this.bookingService.getBookingInfo();
    console.log(this.bookingInfo);
  }

  print(){
    console.log('booking id' + this.bookingInfo.bookingId);
    this.customerService.printTicket(this.bookingInfo.bookingId).subscribe((res)=>{
      let blob:Blob=res.body as Blob;
      let url=window.URL.createObjectURL(blob);
      window.open(url);
    })
    }

    sendMail(){
      console.log('send mail called');
      this.customerService.sendEmail(this.bookingInfo.bookingId);
    }
}
