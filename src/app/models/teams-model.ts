import {EventEmitter} from "@angular/core";

export class TeamsModel {

  private activeTeamsView = new EventEmitter()
  private objectTeam = new EventEmitter();
  private assignPlayerToTeam :string;
  private nameTeam: string;
  private nameActive: string;

  private  reloadTable= new EventEmitter();


  setReloadTable(a : boolean){
    this.reloadTable.next(a);
  }

  getReloadTable(){
    return this.reloadTable.asObservable()
  }


  setObjectTeam(team){
    this.objectTeam.next(team);
  }

  getObjectTeam(){
    return this.objectTeam.asObservable();
  }

  setnameViewActive(value){
    this.activeTeamsView.next(value);
  }

  getNameViewActive (){
    return this.activeTeamsView.asObservable();
  }

  setNameTeam(name:string){
    this.nameTeam = name;
  }

  getNameTeam(){
    return this.nameTeam;
  }

  setTeam(idTeam: string){
    this.assignPlayerToTeam = idTeam;
  }

  getTeam(){
    return this.assignPlayerToTeam;
  }

  setViewActive(name:string){
    this.nameActive = name;
  }


  getViewActive(){
    return this.nameActive;
  }

}
