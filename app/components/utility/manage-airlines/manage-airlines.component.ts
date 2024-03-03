import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { airline } from 'src/app/model/airline.model';
import { AirlinesService } from 'src/app/service/airlines.service';
import { LoginComponent } from '../../login/login.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  getCurrentPageItems(): airline[] {
    const startIndex = this.currentPage * this.pageSize;
    this.totalItems = this.airlinesList.length;
    return this.airlinesList.slice(startIndex, startIndex + this.pageSize);
  }

  openDialog(){
    const dialogRef = this.dialog.open(LoginComponent);
  }
}
