import { Component, Inject, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { airports } from 'src/app/model/airport.model';
import { flight } from 'src/app/model/flight.model';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';
import { FormControl } from '@angular/forms';
import { Subject, Timestamp } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-edit-flight-dialog',
  templateUrl: './edit-flight-dialog.component.html',
  styleUrls: ['./edit-flight-dialog.component.css']
})
export class EditFlightDialogComponent implements OnInit {
  currentFlightCode: any;      //here flight code means the current flight object
  closedMessage = "closed using directive"
  myForm!: FormGroup
  isReadable: boolean = false;
  airportList: airports[] = [];
  myControl = new FormControl();
  isErrorExists=false;
  errorMessage:any
  minDate=new Date()



  constructor(@Inject(MAT_DIALOG_DATA) public flightCode: any, private ref: MatDialogRef<EditFlightDialogComponent>,
    private formbuilder: FormBuilder, private dashboardService: FlightOwnerDashboardService) {
    this.currentFlightCode = this.flightCode;
    this.getAllAirports();
    console.log('THIS IS FROM THE CONSTRUCTOR' + this.currentFlightCode.flightCode.flightCode)
    console.log('THIS IS FROM THE CONSTRUCTOR' + this.currentFlightCode.flightCode.lastArrivedAirportId)

  }
  ngOnInit(): void {

    console.log(this.airportList)
    console.log(this.currentFlightCode)
    this.myForm = this.formbuilder.group({

      source: ['', Validators.required],
      destination: ['',Validators.required],
      departure: ['',Validators.required],
      arrival: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(1000)]]

    }); this.checkForSource();
    console.log(this.airportList)

    

  }
  


  // private filter(value:string):string[]{
  //   const filterValue=value.toLowerCase();
  //   return this.airportList.map(airport=>airport.iataCode+''+airport.location+''+airport.name).filter(option=>{
  //     option.toLowerCase().includes(filterValue)
  //   })
  // }


  checkForSource() {

    if (this.currentFlightCode.flightCode.lastArrivedAirportId != null) {
      console.log('this is the last arrived time '+this.currentFlightCode.flightCode.lastArrivedTime)
      console.log('this is the last arrived airport'+this.currentFlightCode.flightCode.lastArrivedAirportId)
      this.minDate=this.currentFlightCode.flightCode.lastArrivedTime;
      this.isReadable = true;
      this.myForm.setValue({ source: this.currentFlightCode.flightCode.lastArrivedAirportId, destination: '', departure: '', arrival: '', ticketPrice: '' })
    }
  }
  getAirportByIataCode(iataCode: string): airports {
    return this.airportList.find(airport => airport.iataCode === iataCode) || {} as airports;
  }


  closePopup() {
    this.ref.close('closed using function')
  }
  saveFlightTrip() {
    console.log("this is from the method")
    console.log(this.myForm.get('source'))
    console.log(this.myForm.get('destination'))
    console.log(this.myForm.get('arrival'))
    console.log(this.currentFlightCode.flightCode)
    this.dashboardService.addFlightTrip(this.myForm.value, this.currentFlightCode.flightCode.flightCode).subscribe({
      next:res => {
        this.isErrorExists=false;
        this.closePopup();
      },
      error:error=>{
        this.isErrorExists=true;
        this.errorMessage=error.error
      }
    })
  }



  // validateArrivalTime(control: any) {
  //   const departureTime = new Date(control.root.get('departure').value);
  //   const arrivalTime = new Date(control.value);
  //   const twoHoursAfterDeparture = new Date(departureTime.getTime() + 2 * 60 * 60 * 1000);

  //   if (arrivalTime < twoHoursAfterDeparture) {
  //     return { tooEarly: true };
  //   }

  //   return null;
  // }

  getAllAirports() {
    this.dashboardService.getAllAirports().subscribe((list) => {
      this.airportList = list
      console.log(this.airportList)
    })

  }

  



}
