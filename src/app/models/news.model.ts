import {EventEmitter} from "@angular/core";

export class NewsModel {

  public nameView;
  public activeNewsView = new EventEmitter();


  setActiveNewsView(name: string){
    this.activeNewsView.next(name);
  }


  getActiveNewsView(){
    return this.activeNewsView.asObservable();
  }

  setNameView(name: string){
    this.nameView = name;
  }
  getNameView(){
    return this.nameView
  }
}
