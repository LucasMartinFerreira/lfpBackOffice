import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DashboardModel} from "../../../models/dashboard-model";
import {TeamsModel} from "../../../models/teams-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashaboard-main',
  templateUrl: './dashaboard-main.component.html',
  styleUrls: ['./dashaboard-main.component.scss']
})
export class DashaboardMainComponent implements OnInit {

  public stateSidebar;
// Usamos el decorador Output2


  constructor(public dashboardModel: DashboardModel, public router : Router, public teamsModel: TeamsModel) {


  }

  ngOnInit() {

    this.teamsModel.setnameViewActive('ListTeams');

    this.router.navigate(['teamsMain'])

  }


  openCloseSidebar(event){
    this.stateSidebar = event.stateSidebar;

    //this.dashboardModel.setOpenCloseSidebar(event)
  }
}
