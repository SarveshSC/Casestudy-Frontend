import { Injectable } from '@angular/core';
import { flight } from '../model/flight.model';
import { HttpClient } from '@angular/common/http';
import { FlightOwnerDashboardService } from './flight-owner-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private dashboardService : FlightOwnerDashboardService) {}

  getAllFlights() {
     return this.dashboardService.getAllFlights();
  }

  updateFlight(selectedflight: flight) {
    return this.dashboardService.updateFlight(selectedflight);
  }
  
  addFlight(selectedflight: flight) {
    return this.dashboardService.addFlight(selectedflight);
  }

}
