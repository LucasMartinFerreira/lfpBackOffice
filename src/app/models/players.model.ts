import {EventEmitter} from "@angular/core";

export class PlayersModel {

  public activePlayerView = new EventEmitter();
  public objectPlayer = new EventEmitter();
  public reloadTable = new EventEmitter();

  private nameView : string;


  setReloadTable(a : boolean){
    this.reloadTable.next(a);
  }

  getReloadTable(){
    return this.reloadTable.asObservable()
  }

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
