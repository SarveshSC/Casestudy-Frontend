import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { flightOwner } from 'src/app/model/flight-owner.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-manage-flight-owners',
  templateUrl: './manage-flight-owners.component.html',
  styleUrls: ['./manage-flight-owners.component.css']
})
export class ManageFlightOwnersComponent implements OnInit {

  flightOwnersList: flightOwner[] = [];
  pageSize: number = 5;
  totalItems: number = 0;
  currentPage = 0;
  searchText='';

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private dashboardService: AdminDashboardService) { }

  ngOnInit() {
    this.getFlightOwners();
    // this.dashboardService.Refreshrequired.subscribe(response => {
    //   this.getFlightOwners();
    // });
  }

  getFlightOwners() {
    this.dashboardService.getFlightOwners().subscribe((list) => this.flightOwnersList = list);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }


  approveUser(username: any) {
    this.dashboardService.approveUser(username)
      .subscribe({
        next: ((res) => {
          alert(res)
          console.log(res);
          this.ngOnInit();
        }),
        error: ((error) => {
          console.log(error.error);
          this.ngOnInit();
        })

      })
  }

  removeUser(username:any){
    this.dashboardService.removeUser(username)
    .subscribe({
      next: ((res) => {
        alert(res);
        console.log(res);
        this.ngOnInit();
      }),
      error: ((error) => {
        console.log(error.error);
        this.ngOnInit();
      })

    })
  }

  inactiveUser(username:any){
    this.dashboardService.inactiveUser(username)
    .subscribe({
      next: ((res) => {
        alert(res);
        console.log(res);
        this.ngOnInit();
      }),
      error: ((error) => {
        console.log(error.error);
        this.ngOnInit();
      })

    })
  }
  getCurrentPageItems(): flightOwner[] {
    // Filter airlines based on search text
    const filteredAirlines = this.flightOwnersList.filter(flightowner => {
      return flightowner.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
      flightowner.email.toLowerCase().includes(this.searchText.toLowerCase());
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
