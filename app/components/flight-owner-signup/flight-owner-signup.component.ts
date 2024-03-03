import { Component } from '@angular/core';
import { flightOwner } from 'src/app/model/flight-owner.model';

@Component({
  selector: 'app-flight-owner-signup',
  templateUrl: './flight-owner-signup.component.html',
  styleUrls: ['./flight-owner-signup.component.css']
})
export class FlightOwnerSignupComponent {

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
  }
}
