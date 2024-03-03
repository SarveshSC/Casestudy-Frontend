import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { customer } from 'src/app/model/customer.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { BookingsComponent } from './view-bookings/bookings/bookings.component';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
})
export class ManageCustomersComponent implements OnInit{
  customerList: customer[] = [];
  totalItems = 0;
  currentPage = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private dashboardService: AdminDashboardService,private dialog:MatDialog) {}

  ngOnInit() {
    this.getCustomers();
  }
  
  getCustomers(){
    this.dashboardService.getCustomers().subscribe( (list) => this.customerList = list);
  }

  viewAllBookings(username:any){
    var popup=this.dialog.open(BookingsComponent,{
      width:'80%',
      height:'80%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        username:username
      }
    });
  }

  onPageChange(event : PageEvent){
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): customer[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.customerList.length;
    return this.customerList.slice(startIndex, startIndex + this.pageSize);
  }
}
