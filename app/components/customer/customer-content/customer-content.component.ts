import { AfterContentChecked, AfterViewChecked, Component } from '@angular/core';
import { CustomerDashboardService } from 'src/app/service/customer-dashboard.service';

@Component({
  selector: 'app-customer-content',
  templateUrl: './customer-content.component.html',
  styleUrls: ['./customer-content.component.css']
})
export class CustomerContentComponent implements AfterContentChecked{
  selected : string = 'bookings';

  constructor(private dashboardService : CustomerDashboardService) {}

  ngAfterContentChecked(){
    this.selected = this.dashboardService.getSelected();
  }
}
