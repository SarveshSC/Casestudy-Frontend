import { Component, Input, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { flightTrip } from 'src/app/model/flightTrip.model';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

import { MatDialog } from '@angular/material/dialog';
import { UpdateTripFormsComponent } from './update-trip-forms/update-trip-forms/update-trip-forms.component';
import { BookingService } from 'src/app/service/booking.service';
import { DeleteTripComponent } from './delete-trip-forms/delete-trip/delete-trip.component';

@Component({
  selector: 'app-manage-flight-trips',
  templateUrl: './manage-flight-trips.component.html',
  styleUrls: ['./manage-flight-trips.component.css']
})
export class ManageFlightTripsComponent implements OnInit{
  selectedflightTrip:flightTrip={} as flightTrip;
  showFormBox: boolean=false;
  @Input() flightcode!:string
  selectedFlightTrip: flightTrip | null = null;
  updateFlightTripForm!: FormGroup;
searchText=''
  flightTripsList : flightTrip[] = [];
  pageSize = 5;
  currentPage = 0;
  totalItems = this.flightTripsList.length;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private bookingService:BookingService,private dialog:MatDialog,private dashboardService : FlightOwnerDashboardService, private route : ActivatedRoute,private fb:FormBuilder,private cdr:ChangeDetectorRef) {
    this.updateFlightTripForm=this.fb.group({
      price: ['', [ Validators.required,Validators.min(1500)]]
    })
  } 

  ngOnInit(): void {
    this.flightcode=this.dashboardService.getFlightTripCode();
      if(this.flightcode!=null && this.flightcode!=undefined &&this.flightcode!=''){
        this.getFlightTrips();
      
      }
      else{
        this.getAllFlightTrips();
      }
  }

  getFlightTrips() {
    this.dashboardService.findByFlightId(this.flightcode).subscribe((list) => {
      this.flightTripsList = list.map(trip => ({ ...trip, isEditing: false }));
      this.dashboardService.setFlightTripCode('');
    });
    // this.dashboardService.getAllTrips().subscribe((list) => this.flightTripsList = list);
  }

  getAllFlightTrips() {
    console.log("this is get all")
   this.dashboardService.getAllFlightTrips().subscribe((list)=>{this.flightTripsList=list})
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }



  openEditForm(flightTripId:any) {
    var popup=this.dialog.open(UpdateTripFormsComponent,{
      width:'40%',
  height:'80%',
  enterAnimationDuration:'1000ms',
  exitAnimationDuration:'1000ms',
  data:{
    code:flightTripId,
    title:'update the form'
  }
    });
    popup.afterClosed().subscribe(item=>{
     this.getFlightTrips();
    })
    
  }



  simulateClick(flightCode:any){
    console.log(this.bookingService.getBookingId())
    this.bookingService.setBookingId(flightCode)
    console.log(this.bookingService.getBookingId())
    this.dashboardService.setSelected('bookings')
   }

   cancelFlightTrip(flightTripId:any){
  var popup=this.dialog.open(DeleteTripComponent,{
    width:'40%',
    height:'80%',
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
    data:{
      code:flightTripId,
      title:'delete the form'
    }
  });
  popup.afterClosed().subscribe(item=>{this.getFlightTrips();})
   }

   getCurrentPageItems(): flightTrip[] {
    // Filter airlines based on search text
    const filteredAirlines = this.flightTripsList.filter(flightTrip => {
      return flightTrip.source.toLowerCase().includes(this.searchText.toLowerCase()) || 
      flightTrip.destination.toLowerCase().includes(this.searchText.toLowerCase())||
      flightTrip.flightId.toLowerCase().includes(this.searchText.toLowerCase());
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
