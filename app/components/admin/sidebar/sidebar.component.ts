import { Component } from '@angular/core';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private adminService : AdminDashboardService){}

  setSelected(input : string){
    this.adminService.setSelected(input);
  }
}
