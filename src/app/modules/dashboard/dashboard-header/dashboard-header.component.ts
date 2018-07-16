import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  // Usamos el decorador Output
  @Output() clickOpenCloseSideBar = new EventEmitter();


  private openClose: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openCloseSideBar(){
    this.openClose = !this.openClose

    this.clickOpenCloseSideBar.emit({stateSidebar:  this.openClose});
  }


}
