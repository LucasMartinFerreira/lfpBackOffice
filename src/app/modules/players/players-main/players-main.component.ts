import { Component, OnInit } from '@angular/core';
import {TeamsModel} from "../../../models/teams-model";
import {PlayersModel} from "../../../models/players.model";

@Component({
  selector: 'app-players-main',
  templateUrl: './players-main.component.html',
  styleUrls: ['./players-main.component.scss']
})
export class PlayersMainComponent implements OnInit {

  public stateSidebar;
  public viewActive: any = 'ListPlayers';
  public playerObject: any = null;

  constructor(public playersModel: PlayersModel) {

    this.playersModel.getNameViewActive().subscribe(result=>{
      let view = result;
      this.viewActive = view;

    });

    this.playersModel.getObjectPlayer().subscribe(result=>{

      this.playerObject = result;
    });
  }

  ngOnInit() {

    if( this.playersModel.getViewActive() !== undefined){
      this.viewActive= this.playersModel.getViewActive();
    }
  }

  openCloseSidebar(event){
    this.stateSidebar = event.stateSidebar;
  }
}
