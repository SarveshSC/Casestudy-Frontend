import { Component } from '@angular/core';
import { FlightOwnerDashboardService } from 'src/app/service/flight-owner-dashboard.service';

@Component({
  selector: 'app-fl-content',
  templateUrl: './fl-content.component.html',
  styleUrls: ['./fl-content.component.css'],
})
export class FlContentComponent {

  constructor(private dashboardService : FlightOwnerDashboardService){}

  getSelected() {
    return this.dashboardService.getSelected();
  }
}
