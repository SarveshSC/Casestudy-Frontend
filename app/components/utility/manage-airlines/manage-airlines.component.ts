import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { airline } from 'src/app/model/airline.model';
import { AirlinesService } from 'src/app/service/airlines.service';
import { LoginComponent } from '../../login/login.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddAirlinesComponent } from './add-airlines/add-airlines/add-airlines.component';

@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.css']
})
export class ManageAirlinesComponent implements OnInit{
  airlinesList : airline[] = [];
  addForm : boolean = false;
  totalItems = 0;
  currentPage = 0;
  pageSize = 5;
  searchText='';

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private airlineService : AirlinesService, private dialog : MatDialog){}

  ngOnInit() {
      this.getAirlines();
  }

  getAirlines(){
    this.airlineService.getAirlines().subscribe((list) => this.airlinesList = list);
  }

  onPageChange(event : PageEvent){
    this.currentPage = event.pageIndex;
  }

  // getCurrentPageItems(): airline[] {
  //   const startIndex = this.currentPage * this.pageSize;
  //   this.totalItems = this.airlinesList.length;
  //   return this.airlinesList.slice(startIndex, startIndex + this.pageSize);
  // }

  openDialog(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openAddForm(){
    var popup=this.dialog.open(AddAirlinesComponent,{
      width:'40%',
      height:'100%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        
        title:"add a flight",
       
      }
    });
    popup.afterClosed().subscribe(item=>{this.getAirlines();})
  }
  
  getCurrentPageItems(): airline[] {
    // Filter airlines based on search text
    const filteredAirlines = this.airlinesList.filter(airline => {
      return airline.airlineName.toLowerCase().includes(this.searchText.toLowerCase()) || 
      airline.airlineId.toLowerCase().includes(this.searchText.toLowerCase());
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
