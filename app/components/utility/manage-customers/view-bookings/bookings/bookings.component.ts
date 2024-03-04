import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { booking } from 'src/app/model/booking.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';



@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  
  bookingList!:booking[]
constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<BookingsComponent>,private dashboardService: AdminDashboardService){}

  ngOnInit(): void {
    this.getBookingsByCustomer(this.data.username)
  }


  getBookingsByCustomer(username:any){
    this.dashboardService.getCustomerBookingsByUsername(username).subscribe(list=>{
      this.bookingList=list
      console.log(this.bookingList)
    })
  }

  togglePassengers(booking:booking){
    booking.showPassengers=!booking.showPassengers; 
  }

  closePopup() {
    this.ref.close('closed using function')
    }
  
  }
  

