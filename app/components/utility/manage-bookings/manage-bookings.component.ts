import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { booking } from 'src/app/model/booking.model';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit{
  bookingCode!:any
  bookingList : booking[] = [];
  currentPage = 0;
  pageSize = 5;
  totalItems = this.bookingList.length;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private service : BookingService) {}

  ngOnInit(){
    this.bookingCode=this.service.getBookingId();
    console.log("this is from the starting"+this.bookingCode)
    if(this.bookingCode!=null && this.bookingCode!=undefined && this.bookingCode!=''){
      this.getBookingsByFlightTrip();
    }
    else{
      this.getBookings();
    }
  }

  getBookings(){
    this.service.getBookings().subscribe((list) => this.bookingList = list);
  }

  getBookingsByFlightTrip(){
    this.service.getBookingsByFlightTrip(this.bookingCode).subscribe((list)=>{
      this.bookingList=list;
      console.log(this.bookingList)
      this.service.setBookingId('');
    })
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): booking[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.bookingList.length;
    return this.bookingList.slice(startIndex, startIndex + this.pageSize);
  }
}
