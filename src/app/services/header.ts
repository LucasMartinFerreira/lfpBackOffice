import {HttpHeaders} from "@angular/common/http";

import { LoginModel } from './../models/login.model';

export class Header {

  public loginToken = new LoginModel();
  constructor(public loginModel: LoginModel) {

  }


  public static getGeneralHeader(): HttpHeaders {


    let token =  new LoginModel();

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=UTF-8')
      .set('authorization', token.getToken())
    return headers;

  }


  public static getGeneralHeaderMultipart(): HttpHeaders {

    let token =  new LoginModel();

    let headers = new HttpHeaders()
      .set('authorization', token.getToken())
    return headers;

  }
}
