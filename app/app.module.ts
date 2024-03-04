import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { ContentComponent } from './components/admin/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { ManageAirportsComponent } from './components/utility/manage-airports/manage-airports.component';
import { ManageAirlinesComponent } from './components/utility/manage-airlines/manage-airlines.component';
import { ManageFlightOwnersComponent } from './components/utility/manage-flight-owners/manage-flight-owners.component';
import { FlightOwnerDashboardComponent } from './components/flight-owner-dashboard/flight-owner-dashboard.component';
import { FlSidebarComponent } from './components/flight-owner/fl-sidebar/fl-sidebar.component';
import { FlContentComponent } from './components/flight-owner/fl-content/fl-content.component';
import { ManageFlightsComponent } from './components/utility/manage-flights/manage-flights.component';
import { ManageFlightTripsComponent } from './components/utility/manage-flight-trips/manage-flight-trips.component';
import { ManageBookingsComponent } from './components/utility/manage-bookings/manage-bookings.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ManageCustomersComponent } from './components/utility/manage-customers/manage-customers.component';
import { CustomerSidebarComponent } from './components/customer/customer-sidebar/customer-sidebar.component';
import { CustomerContentComponent } from './components/customer/customer-content/customer-content.component';
import { FlightOwnerSignupComponent } from './components/flight-owner-signup/flight-owner-signup.component';
import { BookFlightComponent } from './components/customer/book-flight/book-flight.component';
import { SelectSeatsComponent } from './components/customer/select-seats/select-seats.component';
import { EditFlightDialogComponent } from './components/utility/manage-flights/edit-flight-dialog/edit-flight-dialog.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FlightFormsComponent } from './components/utility/manage-flights/flight-forms/flight-forms/flight-forms.component';
import { UpdateFlightFormComponent } from './components/utility/manage-flights/update-flight-forms/update-flight-form/update-flight-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UpdateTripFormsComponent } from './components/utility/manage-flight-trips/update-trip-forms/update-trip-forms/update-trip-forms.component';
import { DeleteTripComponent } from './components/utility/manage-flight-trips/delete-trip-forms/delete-trip/delete-trip.component';
import { DeleteFlightsComponent } from './components/utility/manage-flights/delete-flights/delete-flights.component';
import { BookingsComponent } from './components/utility/manage-customers/view-bookings/bookings/bookings.component';
import { ManageCustomerBookingsComponent } from './components/utility/manage-customer-bookings/manage-customer-bookings/manage-customer-bookings.component';
import { AddAirportsFormComponent } from './components/utility/manage-airports/add-airports-form/add-airports-form/add-airports-form.component';
import { UpdateAirportsFormComponent } from './components/utility/manage-airports/update-airports-form/update-airports-form/update-airports-form.component';
import { CustomernamePipe } from './components/utility/manage-customers/pipes/customername.pipe';
import { AddAirlinesComponent } from './components/utility/manage-airlines/add-airlines/add-airlines/add-airlines.component';
import { BookingSuccessComponent } from './components/customer/booking-success/booking-success.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerDashboardComponent,
    CustomerSignupComponent,
    SearchFlightComponent,
    AdminDashboardComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
    ManageAirportsComponent,
    ManageAirlinesComponent,
    ManageFlightOwnersComponent,
    FlightOwnerDashboardComponent,
    FlSidebarComponent,
    FlContentComponent,
    ManageFlightsComponent,
    ManageFlightTripsComponent,
    ManageBookingsComponent,
    HomepageComponent,
    ManageCustomersComponent,
    CustomerSidebarComponent,
    CustomerContentComponent,
    FlightOwnerSignupComponent,
    BookFlightComponent,
    SelectSeatsComponent,
    EditFlightDialogComponent,
    FlightFormsComponent,
    UpdateFlightFormComponent,
    UpdateTripFormsComponent,
    DeleteTripComponent,
    DeleteFlightsComponent,
    BookingsComponent,
    ManageCustomerBookingsComponent,
    AddAirportsFormComponent,
    UpdateAirportsFormComponent,
    CustomernamePipe,
    AddAirlinesComponent,
    BookingSuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    CommonModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
