import { Component, OnInit } from '@angular/core';
import {TeamsModel} from "../../../models/teams-model";

@Component({
  selector: 'app-teams-main',
  templateUrl: './teams-main.component.html',
  styleUrls: ['./teams-main.component.scss']
})
export class TeamsMainComponent implements OnInit {

  public stateSidebar;
  public viewActive: any = 'ListTeams';
  public teamObject: any = null;

  constructor(public teamsModel: TeamsModel) {
    this.teamsModel.getNameViewActive().subscribe(result=>{
      let view = result;
      this.viewActive = view;
    });

    this.teamsModel.getObjectTeam().subscribe(result=>{
      console.log('Tenemos los datos del equipo:', result)
      this.teamObject = result;
    });


  }

  ngOnInit() {

  }

  openCloseSidebar(event){
    this.stateSidebar = event.stateSidebar;
  }
}
