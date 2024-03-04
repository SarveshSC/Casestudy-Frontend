import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { flight } from 'src/app/model/flight.model';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';
import { FlightService } from 'src/app/service/flight.service';
import { EditFlightDialogComponent } from './edit-flight-dialog/edit-flight-dialog.component';
import { FlightFormsComponent } from './flight-forms/flight-forms/flight-forms.component';
import { UpdateFlightFormComponent } from './update-flight-forms/update-flight-form/update-flight-form.component';
import { DeleteFlightsComponent } from './delete-flights/delete-flights.component';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent {
  flightsList: flight[] = [];
  pageSize = 5;
  currentPage = 0;
  totalItems = this.flightsList.length;
  showFormBox: boolean=false;
  flightForm!: FormGroup;
  searchText=''
selectedflight: flight = {} as flight;
showAddForm=false;
addFlightForm!:FormGroup;
status!:string


  @ViewChild(MatPaginator) paginator !: MatPaginator;


  constructor(private dialog:MatDialog,private flightservice: FlightService,private fb:FormBuilder,private dashboardservice:FlightOwnerDashboardService) {
   
    this.flightForm = this.fb.group({
      cabinWeight: [0],
      checkInWeight: [0],
    });
    this.addFlightForm = this.fb.group({
      flightCode: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{2,3}-\\d{3,5}$')]],
      totalSeats: ['', [Validators.required, Validators.min(100), Validators.max(180)]],
      checkInWeight: ['', [Validators.required, Validators.max(20),Validators.min(10)]],
      cabinWeight: ['', [Validators.max(7), Validators.required,Validators.min(3)]],
       airlineId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllFlights();
  }
  

  getAllFlights() {
    this.flightservice
      .getAllFlights()
      .subscribe((list) => (this.flightsList = list));
      
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

 

  
  
  
//this is for flight details
  openPopup(flightCode:flight){
  var popup=  this.dialog.open(EditFlightDialogComponent,{
      width:'40%',
      height:'80%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        flightCode:flightCode
      }
    });
    // popup.afterClosed().subscribe(item=>{
    //   //console.log(item)
    //   this.getAllFlights();
    // })
    popup.afterClosed().subscribe(item => {
      if(item === 'closed using function') {
        // Only call getAllFlights if the dialog was closed using function
        this.getAllFlights();
      }
    });
  }

  openAddForm() {
    
    
    var popup=this.dialog.open(FlightFormsComponent,{
      width:'40%',
      height:'100%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        
        title:"add a flight",
       
      }
    });
    popup.afterClosed().subscribe(item=>{this.getAllFlights();})
    }

    openUpdateForm(code:any){
        var popup=this.dialog.open(UpdateFlightFormComponent,{
          width:'40%',
      height:'80%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code:code,
        title:'update the form'
      }
        });
        popup.afterClosed().subscribe(item=>{this.getAllFlights();})
    }

    
      simulateClick(flightCode:any){
        console.log(this.dashboardservice.getFlightTripCode())
        this.dashboardservice.setFlightTripCode(flightCode)
        console.log(this.dashboardservice.getFlightTripCode())
        this.dashboardservice.setSelected('flight-trips')
       }

       deleteFlight(code:any){
        // this.dashboardservice.deleteFlight(code).subscribe(res=>{
        //   this.getAllFlights();
        // })
        var popup=this.dialog.open(DeleteFlightsComponent,{
          width:'400px',
      height:'300px',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code:code,
        title:'delete the flight'
      }
        });
        popup.afterClosed().subscribe(item=>{this.getAllFlights();})
       }


       getCurrentPageItems(): flight[] {
        // Filter airlines based on search text
        const filteredAirlines = this.flightsList.filter(flight => {
          return flight.flightCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
          flight.airlineId.toLowerCase().includes(this.searchText.toLowerCase()) ;
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
