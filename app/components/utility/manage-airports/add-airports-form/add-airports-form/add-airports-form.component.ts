import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { airports } from 'src/app/model/airport.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-add-airports-form',
  templateUrl: './add-airports-form.component.html',
  styleUrls: ['./add-airports-form.component.css']
})
export class AddAirportsFormComponent implements OnInit {
  myForm!:FormGroup
  message!:string
  isErrorExists=false
  

constructor(private formBuilder:FormBuilder,private ref:MatDialogRef<AddAirportsFormComponent>,
  private adminDashBoardService:AdminDashboardService){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      iataCode: ['', [Validators.required, Validators.pattern('^[A-Z]{3}')]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  closePopup() {
    this.ref.close('closed using function')
    }

    addAirport(){
      this.adminDashBoardService.addAirport(this.myForm.value).subscribe({
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
