import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { airports } from 'src/app/model/airport.model';
import { AirportsService } from 'src/app/service/airports.service';
import { AddAirportsFormComponent } from './add-airports-form/add-airports-form/add-airports-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAirportsFormComponent } from './update-airports-form/update-airports-form/update-airports-form.component';

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
  searchText='';

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private airportService : AirportsService,private dialog:MatDialog){}

  ngOnInit() {
      this.getAirports();
  }

  getAirports(){
    this.airportService.getAirports().subscribe((list) => this.airportList = list);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  openAddForm(){
    var popup=this.dialog.open(AddAirportsFormComponent,{
      width:'40%',
      height:'100%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        
        title:"add a flight",
       
      }
    });
    popup.afterClosed().subscribe(item=>{this.getAirports();})
  }

  openUpdateForm(code:any){
    var popup=this.dialog.open(UpdateAirportsFormComponent,{
      width:'40%',
  height:'80%',
  enterAnimationDuration:'1000ms',
  exitAnimationDuration:'1000ms',
  data:{
    code:code,
    title:'update the form'
  }
    });
    popup.afterClosed().subscribe(item=>{this.getAirports();})
}

getCurrentPageItems(): airports[] {
  // Filter airlines based on search text
  const filteredAirlines = this.airportList.filter(airport => {
    return airport.iataCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
    airport.location.toLowerCase().includes(this.searchText.toLowerCase())||
    airport.name.toLowerCase().includes(this.searchText.toLowerCase());
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
