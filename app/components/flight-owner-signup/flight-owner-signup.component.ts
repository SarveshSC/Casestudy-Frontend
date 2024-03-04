import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flightOwner } from 'src/app/model/flight-owner.model';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-flight-owner-signup',
  templateUrl: './flight-owner-signup.component.html',
  styleUrls: ['./flight-owner-signup.component.css']
})
export class FlightOwnerSignupComponent {

  constructor(private admindashboardservice:AdminDashboardService,private router:Router){}
  flightOwner : flightOwner = {
    airlineId : '',
    username : '',
    email : '',
    airlineFromUser : '',
    userStatus : '',
    password : ''
  }
  createAccount(data : any){
    console.log('form called');
    console.log('data');
    this.admindashboardservice.addUser(data).subscribe((res)=>{
      alert("Thank you for registering with us. Your registration approval is currently pending. We are reviewing your information and will notify you once your account has been approved. We appreciate your patience.")
      this.router.navigate(["/login"]);
    },
  (error)=>{
  alert(error.error)
})
  }
}
