import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerSignupService {
  helper = new JwtHelperService();

  baseURL : string = 'http://localhost:8080/simply-fly/customers/create-account'

  constructor(private http : HttpClient) { }

  createAccount(customer : customer){
    return this.http.post(this.baseURL,customer,{responseType:'text' as 'json'})
  }
}
