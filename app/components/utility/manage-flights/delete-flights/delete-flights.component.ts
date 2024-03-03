import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

@Component({
  selector: 'app-delete-flights',
  templateUrl: './delete-flights.component.html',
  styleUrls: ['./delete-flights.component.css']
})
export class DeleteFlightsComponent {
  fligthCode:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DeleteFlightsComponent>, private dashboardService: FlightOwnerDashboardService) { }

  ngOnInit(): void {
    this.fligthCode=this.data.code
  }

  closePopup() {
    this.ref.close('closed using function')
  }


  deleteFlight() {

    this.dashboardService.deleteFlight(this.fligthCode).subscribe({
      next:(res:string)=>{this.closePopup()},
      error:(error)=>{alert(error.error);
      console.log(error)
      this.closePopup()}
    });
  }
}
