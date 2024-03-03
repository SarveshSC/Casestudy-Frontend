import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { booking } from 'src/app/model/booking.model';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

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

  constructor(private service : CustomerDashboardService) {}

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
    console.log(this.bookingList.slice(startIndex, startIndex + this.pageSize));
    return this.bookingList.slice(startIndex, startIndex + this.pageSize);
  }
}
