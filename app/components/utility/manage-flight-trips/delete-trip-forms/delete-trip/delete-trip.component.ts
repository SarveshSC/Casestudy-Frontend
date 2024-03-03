import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  flightTripId: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DeleteTripComponent>, private dashboardService: FlightOwnerDashboardService) { }
 
 
  ngOnInit(): void {
    this.flightTripId=this.data.code
  }




  closePopup() {
    this.ref.close('closed using function')
  }

  cancelFlightTrip() {

    this.dashboardService.cancelFlight(this.flightTripId).subscribe(res => {
      this.closePopup();

    });
  }
}
