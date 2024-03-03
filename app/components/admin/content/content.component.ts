import { AfterContentChecked, Component} from '@angular/core';
import { OnSameUrlNavigation } from '@angular/router';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterContentChecked {
  constructor(private adminService : AdminDashboardService){}

  selected : string = '';

  ngAfterContentChecked(): void {
      this.selected = this.adminService.getSelected();
  }

}
