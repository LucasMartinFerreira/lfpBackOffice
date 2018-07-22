import {EventEmitter} from "@angular/core";

export class NewsModel {

  public nameView;
  public activeNewsView = new EventEmitter();


  private  reloadTable= new EventEmitter();


  public objectNew = new EventEmitter();


  setReloadTable(a : boolean){
    this.reloadTable.next(a);
  }

  getReloadTable(){
    return this.reloadTable.asObservable()
  }

  setObjectNew(object){
    this.objectNew.next(object);
  }

  getObjectNew(){
    return this.objectNew.asObservable();
  }

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
