import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { booking } from 'src/app/model/booking.model';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-manage-customer-bookings',
  templateUrl: './manage-customer-bookings.component.html',
  styleUrls: ['./manage-customer-bookings.component.css']
})
export class ManageCustomerBookingsComponent {
  bookingList : booking[] = [];
  currentPage = 0;
  pageSize = 5;
  totalItems = this.bookingList.length;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private service : BookingService) {}

  ngOnInit(){
    this.getCustomerBookings();
  }

  getCustomerBookings(){
    this.service.getCustomerBookings().subscribe((list) => this.bookingList = list);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): booking[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.bookingList.length;
    return this.bookingList.slice(startIndex, startIndex + this.pageSize);
  }

  cancel(bookingId : any){
    console.log(bookingId);
    this.service.cancelBooking(bookingId)
  }
}
