import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { customer } from 'src/app/model/customer.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { BookingsComponent } from './view-bookings/bookings/bookings.component';
import { CustomernamePipe } from './pipes/customername.pipe';


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
  searchText='';

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
    // Filter airlines based on search text
    const filteredAirlines = this.customerList.filter(customer => {
      return customer.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
      customer.name.toLowerCase().includes(this.searchText.toLowerCase())||
      customer.email.toLowerCase().includes(this.searchText.toLowerCase())||
      customer.contact.toLowerCase().includes(this.searchText.toLowerCase()) ;
    });
  
    // Update total items count
    this.totalItems = filteredAirlines.length;
  
    // Calculate start index based on current page and page size
    const startIndex = this.currentPage * this.pageSize;
  
    // Update current page if necessary
    const filteredPage = Math.floor(startIndex / this.pageSize);
    if (this.currentPage !== filteredPage) {
      this.currentPage = filteredPage;
      this.paginator.pageIndex = filteredPage;
    }
  
    // Return airlines for the current page
    return filteredAirlines.slice(startIndex, startIndex + this.pageSize);
  }
  onSearch() {
    // Reset paginator to first page when searching
    this.paginator.firstPage();
  }
}
