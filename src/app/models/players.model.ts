import {EventEmitter} from "@angular/core";

export class PlayersModel {

  public activePlayerView = new EventEmitter();
  public objectPlayer = new EventEmitter();

  private nameView : string;

  setObjectPlayer(team){
    this.objectPlayer.next(team);
  }

  getObjectPlayer(){
    return this.objectPlayer.asObservable();
  }

  setnameViewActive(value){
    this.activePlayerView.next(value);
  }

  getNameViewActive (){
    return this.activePlayerView.asObservable();
  }

  setViewActive(view: string){
    this.nameView = view;
  }


  getViewActive(){
    return this.nameView;
  }

}
