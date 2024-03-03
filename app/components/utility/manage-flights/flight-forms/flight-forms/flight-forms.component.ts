import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditFlightDialogComponent } from '../../edit-flight-dialog/edit-flight-dialog.component';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';
import { flight } from 'src/app/model/flight.model';

@Component({
  selector: 'app-flight-forms',
  templateUrl: './flight-forms.component.html',
  styleUrls: ['./flight-forms.component.css']
})
export class FlightFormsComponent implements OnInit {
myForm!:FormGroup
editData:any
inputData:any;
  message: any;
  isErrorExists=false;

constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<EditFlightDialogComponent>,
  private formbuilder:FormBuilder,private dashboardService : FlightOwnerDashboardService){}


  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      flightCode: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{2,3}-\\d{3,5}$')]],
      totalSeats: ['', [Validators.required, Validators.min(100), Validators.max(180)]],
      checkInWeight: ['', [Validators.required, Validators.max(20),Validators.min(10)]],
      cabinWeight: ['', [Validators.max(7), Validators.required,Validators.min(3)]],
       airlineId: ['', Validators.required]
    });
    this.inputData=this.data
    
  }


  closePopup() {
    this.ref.close('closed using function')
    }


    setPopUpData(code:any){
      this.dashboardService.getAllFlights().subscribe((flights: flight[])=>{
        const flight = flights.find(flight => flight.flightCode === code);
    if (flight) {
      // Do something with the found flight object
      console.log("this is a flight obejct")
      console.log(flight)
      this.editData=flight;
      this.myForm.setValue({flightCode:this.editData.flightCode,totalSeats:this.editData.totalSeats,checkInWeight:this.editData.checkInWeight,cabinWeight:this.editData.cabinWeight,airlineId:this.editData.airlineId});
    } else {
      console.log(`Flight with code ${code} not found`);
    }
      });
    }

    addFlight(){
      this.dashboardService.addFlight(this.myForm.value).subscribe({
        next:(res)=>{
          this.message="flight added succesfully"
          this.isErrorExists=false;
          setTimeout(()=>{this.closePopup()},1500)
          
        },
        error:(error)=>{
          this.message=error.error;
          this.isErrorExists=true;
        }
      }
        
      )
    }
}
