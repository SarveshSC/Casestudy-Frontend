import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { airline } from '../model/airline.model';
import { AdminDashboardService } from './admin-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {

  constructor( private dashboardService : AdminDashboardService) { }

  getAirlines() : Observable<airline[]>{
    return this.dashboardService.getAirlines();
  }
}
