import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { airports } from 'src/app/model/airport.model';
import { AirportsService } from 'src/app/service/airports.service';

@Component({
  selector: 'app-manage-airports',
  templateUrl: './manage-airports.component.html',
  styleUrls: ['./manage-airports.component.css']
})
export class ManageAirportsComponent implements OnInit{
  airportList : airports[] = [];
  pageSize = 5;
  currentPage = 0;
  totalItems = this.airportList.length;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private airportService : AirportsService){}

  ngOnInit() {
      this.getAirports();
  }

  getAirports(){
    this.airportService.getAirports().subscribe((list) => this.airportList = list);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getCurrentPageItems(): airports[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.airportList.length;
    return this.airportList.slice(startIndex, startIndex + this.pageSize);
  }
}
