import {EventEmitter} from "@angular/core";

export class DashboardModel {

  public openCloseSidebar = new EventEmitter()


  setOpenCloseSidebar(value){
    this.openCloseSidebar.next(value);
  }

  getOpenCloseSidebar (){
    return this.openCloseSidebar.asObservable();
  }
}
