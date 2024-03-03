import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { airports } from 'src/app/model/airport.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';


@Component({
  selector: 'app-update-airports-form',
  templateUrl: './update-airports-form.component.html',
  styleUrls: ['./update-airports-form.component.css']
})
export class UpdateAirportsFormComponent  implements OnInit{
  currentAirport:any;
  closedMessage = "closed using directive"
  myForm!: FormGroup
  isReadable: boolean = false;
  inputData:any
  editData:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private ref: MatDialogRef<UpdateAirportsFormComponent>,
  private formbuilder: FormBuilder,private adminDashBoardService:AdminDashboardService){}


  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      iataCode: ['', [Validators.required, Validators.pattern('^[A-Z]{3}')]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
    this.inputData=this.data
    this.setPopUpData();
  }

  closePopup() {
    this.ref.close('closed using function')
    }

  setPopUpData(){
    this.adminDashBoardService.getAirports().subscribe((airports:airports[])=>{
      const airport=airports.find(airport=>airport.iataCode===this.data.code);
      if(airport){
        console.log(airport.iataCode);
        this.editData=airport;
        this.myForm.setValue({iataCode:this.editData.iataCode,name:this.editData.name,location:this.editData.location});
      }
      else{
        console.log(`airport with ${this.data.code} is not found`)
      }
    });
  }

updateAirport(){
  this.adminDashBoardService.updateAirport(this.myForm.value).subscribe(res=>{
    this.closePopup();
  })
}

}
