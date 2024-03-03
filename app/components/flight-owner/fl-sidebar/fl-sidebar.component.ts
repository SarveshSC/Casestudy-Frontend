import { Component } from '@angular/core';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

@Component({
  selector: 'app-fl-sidebar',
  templateUrl: './fl-sidebar.component.html',
  styleUrls: ['./fl-sidebar.component.css']
})
export class FlSidebarComponent {

  constructor(private dashboardService : FlightOwnerDashboardService){}

  setSelected(input : string){
    this.dashboardService.setSelected(input);
  }
}
