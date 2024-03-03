import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { ManageAirportsComponent } from './components/utility/manage-airports/manage-airports.component';
import { ManageAirlinesComponent } from './components/utility/manage-airlines/manage-airlines.component';
import { FlightOwnerDashboardComponent } from './components/flight-owner-dashboard/flight-owner-dashboard.component';
import { AuthguardService } from './service/authguard.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ManageFlightTripsComponent } from './components/utility/manage-flight-trips/manage-flight-trips.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { FlightOwnerSignupComponent } from './components/flight-owner-signup/flight-owner-signup.component';
import { BookFlightComponent } from './components/customer/book-flight/book-flight.component';
import { SelectSeatsComponent } from './components/customer/select-seats/select-seats.component';

const routes: Routes = [
  {
    path:'admin',
    component : AdminDashboardComponent,
    canActivate:[AuthguardService],
    data:{requiredRole : 'Admin'}
  },
  {
    path:'flight-owner', 
    component : FlightOwnerDashboardComponent,
    canActivate:[AuthguardService],
    data:{requiredRole : 'FlightOwner'}
  },
  {
    path:'customer',
    component : CustomerDashboardComponent,
    canActivate:[AuthguardService],
    data:{requiredRole : 'Customer'}
  },
  {path:'',component:HomepageComponent},
  {path:'search-flights', component:SearchFlightComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:CustomerSignupComponent},
  {path:'flight-trip/:flightcode',component:ManageFlightTripsComponent},
  {path: 'flight-owner/signup',component:FlightOwnerSignupComponent},
  {path: 'customer/book-flight/:flightTripId',component:BookFlightComponent},
  {path: 'customer/select-seats/:flightTripId', component:SelectSeatsComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
