import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { airports } from '../model/airport.model';
import { AdminDashboardService } from './admin-dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  constructor(private dashboardService : AdminDashboardService) {}

  baseURL: string = 'http://localhost:8080/simply-fly/admin/list-all-airports';

  getAirports(): Observable<airports[]> {
    return this.dashboardService.getAirports();
  }
}
