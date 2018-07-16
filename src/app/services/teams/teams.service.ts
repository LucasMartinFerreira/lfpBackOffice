import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { Constants } from "../constants";
import { Header} from './../../services/header';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {



  constructor(public httpClient :HttpClient) { }


  public getTeams() :Observable <any>{

    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/teams');

  }

  public getTeam(idTeam) :Observable <any>{

    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/teams/'+idTeam);

  }

  public createTeam(body){
    return this.httpClient.post(Constants.HOME_DEV +'/api/v1/teams',body,{headers: Header.getGeneralHeader()});
  }



  public deleteTeam(idTeam){
    return this.httpClient.delete(Constants.HOME_DEV +'/api/v1/teams/'+idTeam,{headers: Header.getGeneralHeader()});
  }

  public updateTeam(idTeam,body){
    return this.httpClient.patch(Constants.HOME_DEV +'/api/v1/teams/'+idTeam, body,{headers: Header.getGeneralHeader()});
  }
}
