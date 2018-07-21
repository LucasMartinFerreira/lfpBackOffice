import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { Constants } from "../constants";
import { Header} from './../../services/header';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {



  constructor(public httpClient :HttpClient) { }


  public getPlayers() :Observable <any>{

    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/players');

  }

  public getPlayer(idPlayer) :Observable <any>{

    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/players/'+idPlayer);

  }

  public createPlayer(body){
    return this.httpClient.post(Constants.HOME_DEV +'/api/v1/players',body,{headers: Header.getGeneralHeaderMultipart()});
  }



  public deletePlayer(idPlayer){
    return this.httpClient.delete(Constants.HOME_DEV +'/api/v1/players/'+idPlayer,{headers: Header.getGeneralHeader()});
  }

  public updatePlayer(idPlayer,body){
    return this.httpClient.patch(Constants.HOME_DEV +'/api/v1/players/'+idPlayer, body,{headers: Header.getGeneralHeaderMultipart()});
  }

  public getPlayersWitOutTeam(){

    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/players/team/none');
  }
}
