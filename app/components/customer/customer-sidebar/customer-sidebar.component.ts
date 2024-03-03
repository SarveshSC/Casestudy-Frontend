import { Component } from '@angular/core';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.css']
})
export class CustomerSidebarComponent {

  constructor(private dashboardService : CustomerDashboardService) {}

  setSelected(input : string){
    this.dashboardService.setSelected(input);
  }
}
