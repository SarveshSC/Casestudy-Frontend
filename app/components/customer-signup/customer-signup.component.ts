import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { customer } from 'src/app/model/customer.model';
import { CustomerSignupService } from 'src/app/service/customer-signup.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent {
  constructor(private customerSignUpService: CustomerSignupService) {}

  customer: customer = {
    name: '',
    username: '',
    email: '',
    contact: '',
    password: '',
    age: 0,
  };

  createAccount(formData: customer) {
    this.customer.name = formData.name;
    this.customer.username = formData.username;
    this.customer.email = formData.email;
    this.customer.contact = formData.contact;
    this.customer.password = formData.password;
    this.customer.age = formData.age;

    console.log(formData);

    // this.customerSignUpService.createAccount(this.customer).subscribe(()=>{console.log("account created succesfully")});
    this.customerSignUpService.createAccount(this.customer).subscribe((response) => {
      console.log()
      console.log('HTTP Response: ' + JSON.stringify(response));
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         console.log("Status: "+ error.status +", Message: " + error.message);
        }

  })
  }
}
