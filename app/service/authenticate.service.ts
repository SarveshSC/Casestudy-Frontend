import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  helper = new JwtHelperService();
  
  username : string = 'Guest';
  token : any;
  role : any;
  timer : any;

  isLoggedIn : boolean = false;

  constructor(private http: HttpClient, private route : Router) {}

  authorize(token : any){
    const tokenString = typeof token === 'string' ? token : JSON.stringify(token);

    // let decodeToken=jwtDecode(tokenString);
    // console.log(decodeToken)

    const decodedToken = this.helper.decodeToken(token);

    if(!decodedToken){
      console.error('Error decoding JWT token');
    }

    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem('username', decodedToken.sub);
    localStorage.setItem('exp', decodedToken.exp);
    localStorage.setItem('token', token);
  }
  getRole(token: any) {
    // // Convert token to a string if it's not already
    // const tokenString = typeof token === 'string' ? token : JSON.stringify(token);

    // // let decodeToken=jwtDecode(tokenString);
    // // console.log(decodeToken)

    // const decodedToken = this.helper.decodeToken(token);

    // localStorage.setItem('role', decodedToken.role);
    // localStorage.setItem('username', decodedToken.sub);
    // localStorage.setItem('exp', decodedToken.exp);

    // localStorage.setItem('token', token);
    // console.log(localStorage.getItem('exp'));
    // console.log(localStorage.getItem('token'))

    return localStorage.getItem('role');
  }

  baseUrl: string = 'http://localhost:8080/simply-fly/customers/';

  generateToken(AuthRequest: any) {
    // console.log(AuthRequest.username);
    // console.log(AuthRequest.password);
    // console.log(this.baseUrl + 'login');
    let response = this.http.post(this.baseUrl + 'login', AuthRequest, {
      responseType: 'text' as 'json',
    }).subscribe((genToken)=>{
      this.token = genToken;
      this.role = this.getRole(genToken);
      this.authorize(genToken);

      this.navigate(this.token);
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn','true');
    },(error)=>{
     alert("Invalid Credentials")
    });

    // let response = this.authenticateService.generateToken(this.AuthRequest);

    // console.log(this.AuthRequest);
    
    // response.subscribe((genToken: any) => {
      
    //   this.token = genToken;
    //   this.role = this.getRole(genToken);
    //   this.authorize(genToken);

    //   this.navigate(this.token);

    //   this.isLoggedIn = true;
    //   localStorage.setItem('isLoggedIn','true');
    // });

    this.timer = setTimeout(() => {
      alert('Your session will expire soon. Please refresh your session or log in again.');
    }, 30 * 60 * 1000,
    this.logout()); // 30 minutes in milliseconds
    // Redirect to dashboard or desired page
    // this.logout();
    this.route.navigate(['/login']);
  }

  private navigate(token: any) {
    this.authorize(token);

    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    console.log(username + " " + role);

    if(role === 'Admin'){
      console.log('Admin login, Navigating to Admin Dashboard');
      this.route.navigate(['/admin']);
    }
    if(role === 'FlightOwner'){
      console.log('Flight Owner login, Navigating to Flight Owner Dashboard');
      this.route.navigate(['/flight-owner']);
    }
    if(role === 'Customer'){
      console.log('Customer login, Navigating to Customer Dashboard');
      this.route.navigate(['/customer']);
    }
  }

  logout() {
    console.log(localStorage.getItem('username'));
    // this.token = '';
    localStorage.clear();
    localStorage.setItem('username', 'Guest');
    console.log(localStorage.getItem('username'));

    clearTimeout(this.timer);
    this.route.navigate(['/login']);
    this.username = 'Guest';
  }

  // setLoginStatus(input : boolean){
  //   this.isLoggedIn = input;
  // }
}
