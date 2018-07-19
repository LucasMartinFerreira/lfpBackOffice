import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {Constants} from "../constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient :HttpClient) { }


  public doLogin(body) :Observable <any>{

    return this.httpClient.post(Constants.HOME_DEV +'/api/v1/login', body);

  }
}
