import {Component, Input, OnInit} from '@angular/core';
import {DashboardModel} from "../../../models/dashboard-model";
import {Router} from "@angular/router";
import {TeamsModel} from "../../../models/teams-model";
import {PlayersModel} from "../../../models/players.model";
import {NewsModel} from "../../../models/news.model";
import {LoginModel} from "../../../models/login.model";
import {LoginService} from "../../../services/login/login.service";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  constructor(public dashboardModel: DashboardModel,
              public newsModel : NewsModel,
              private loginModel: LoginModel,
              private loginService : LoginService,
              public router : Router, public teamsModel: TeamsModel, public playersModel: PlayersModel) {

  }

  ngOnInit() {

  }

  createTeam(){
    this.teamsModel.setObjectTeam(null);
    this.teamsModel.setnameViewActive('createTeam');
    this.teamsModel.setViewActive('createTeam');
    this.router.navigate(['teamsMain'])
  }

  goToLisTeams(){

    this.teamsModel.setViewActive('ListTeams');
    this.teamsModel.setnameViewActive('ListTeams');
    this.router.navigate(['teamsMain']);

  }

  createPlayer(){
    this.playersModel.setObjectPlayer(null);
    this.playersModel.setViewActive('CRUDPlayers');
    this.playersModel.setnameViewActive('CRUDPlayers');
    this.router.navigate(['playersMain'])
  }

  listPlayers(){
    this.playersModel.setnameViewActive('ListPlayers');
    this.playersModel.setViewActive('ListPlayers');
    this.router.navigate(['playersMain'])
  }

  createNews(){
    this.newsModel.setObjectNew(null);
    this.newsModel.setActiveNewsView('CreateNews');
    this.newsModel.setNameView('CreateNews');
    this.router.navigate(['newsMain']);
  }

  goToLisNews(){
    this.newsModel.setActiveNewsView('ListNews');
    this.newsModel.setNameView('ListNews');
    this.router.navigate(['newsMain']);
  }

  logOut(){
    let body={};

    this.loginService.logOut(body).subscribe(result=>{
      this.loginModel.setToken('');
      this.router.navigate(['login']);
    })

  }
}
