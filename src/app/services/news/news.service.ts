import { Injectable } from '@angular/core';
import { Constants } from "../constants";
import { Observable } from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {Header} from "../header";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public httpClient :HttpClient) { }

  getNews() :Observable <any>{
    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/news');
  }

  public getNew(idNew) :Observable <any>{
    return this.httpClient.get(Constants.HOME_DEV +'/api/v1/news/'+idNew);
  }

  createNew(body){
    return this.httpClient.post(Constants.HOME_DEV +'/api/v1/news',body,{headers: Header.getGeneralHeader()});
  }

  deleteNew(idNew){
    return this.httpClient.delete(Constants.HOME_DEV +'/api/v1/news/'+idNew,{headers: Header.getGeneralHeader()});
  }

  public updateNew(idNew,body){
    return this.httpClient.patch(Constants.HOME_DEV +'/api/v1/news/'+idNew, body,{headers: Header.getGeneralHeader()});
  }
}
