import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { AddAirportsFormComponent } from '../../../manage-airports/add-airports-form/add-airports-form/add-airports-form.component';

@Component({
  selector: 'app-add-airlines',
  templateUrl: './add-airlines.component.html',
  styleUrls: ['./add-airlines.component.css']
})
export class AddAirlinesComponent implements OnInit{

  myForm!:FormGroup
  message!:string
  isErrorExists=false
  constructor(private formBuilder:FormBuilder,private ref:MatDialogRef<AddAirportsFormComponent>,
    private adminDashBoardService:AdminDashboardService){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      airlineId: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9]{1,2}$')]],
      airlineName: ['', [Validators.required]]
    });
  }

  closePopup() {
    this.ref.close('closed using function')
    }

  addAirline(){
    this.adminDashBoardService.addAirline(this.myForm.value).subscribe({
      next:(res)=>{
        this.message="Airline added succesfully"
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
