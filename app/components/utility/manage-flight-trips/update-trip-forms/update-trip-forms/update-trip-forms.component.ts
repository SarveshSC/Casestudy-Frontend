import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { flightTrip } from 'src/app/model/flightTrip.model';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

@Component({
  selector: 'app-update-trip-forms',
  templateUrl: './update-trip-forms.component.html',
  styleUrls: ['./update-trip-forms.component.css']
})
export class UpdateTripFormsComponent {
  myForm!:FormGroup
  editData:any
  inputData:any;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<UpdateTripFormsComponent>,
  private formbuilder:FormBuilder,private dashboardService : FlightOwnerDashboardService) { }
  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      flightTripId:['', Validators.required],
      source: ['', Validators.required],
      destination: [ Validators.required],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      status: ['', Validators.required],
	filledSeats: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(1000)]],
      flightId:['',Validators.required]

    });
    this.inputData=this.data
    this.setPopUpData(this.data.code)
    console.log("the code is "+this.data.code)
  }

  closePopup() {
    this.dashboardService.setFlightTripCode(this.editData.flightId)
    this.ref.close('closed using function')
    }

  setPopUpData(code:any){
    this.dashboardService.getAllFlightTrips().subscribe((flightTrips: flightTrip[])=>{
      const flightTrip = flightTrips.find(flightTrip => flightTrip.flightTripId === code);
  if (flightTrip) {
    // Do something with the found flight object
    console.log("this is a flight obejct")
    console.log(flightTrip)
    this.editData=flightTrip;
    this.myForm.setValue({source:this.editData.source,
      destination:this.editData.destination,
      departure:this.editData.departure,
    arrival:this.editData.arrival,
    ticketPrice:this.editData.ticketPrice,
    status:this.editData.status,
    filledSeats:this.editData.filledSeats,
    flightId:this.editData.flightId,
    flightTripId:this.editData.flightTripId
  });
  } else {
    console.log(`Flight with code ${code} not found`);
  }
    });
  }

  updateFlightTrip(){
    console.log("the data is going to be updated is"+this.myForm)
    this.dashboardService.updateFlightTrip(this.myForm.value).subscribe(res=>{
      this.closePopup();
    })
  }
}
