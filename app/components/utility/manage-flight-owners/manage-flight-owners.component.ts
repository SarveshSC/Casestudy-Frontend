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

  getCurrentPageItems(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.flightOwnersList.length;
    return this.flightOwnersList.slice(startIndex, startIndex + this.pageSize);
  }

  approveUser(username: any) {
    this.dashboardService.approveUser(username)
      .subscribe({
        next: ((res) => {
          console.log(res);
          this.ngOnInit();
        }),
        error: ((error) => {
          console.log(error.error);
          this.ngOnInit();
        })

      })
  }
}
