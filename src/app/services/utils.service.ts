import { Injectable } from '@angular/core';
import {Constants} from "./constants";
declare var JSEncrypt: any;


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getStringPhoto(photo:string){


    let png = photo.indexOf('/png');
    let jpeg = photo.indexOf('/jpeg');
    let JPEG = photo.indexOf('/JPEG');
    let jpg = photo.indexOf('/jpg');
    let gif = photo.indexOf('/gif');

    if(png !== -1){
      return photo.replace('data:image/png;base64,','');
    }else if (jpg !== -1){
      return photo.replace('data:image/jpg;base64,','');
    }else if( jpeg !== -1){
      return photo.replace('data:image/jpeg;base64,','');
    }else if (JPEG !== -1){
      return photo.replace('data:image/JPEG;base64,','');
    }else if(gif !== -1){
      return photo.replace('data:image/gif;base64,','');
    }else{
      return photo;
    }
  }


  /**
   * Encrypt Password
   * @param password
   * @returns {string}
   */

   public getRSAPassword (password) {

    // Encrypt with the public key...
    var encrypt = new JSEncrypt();

    encrypt.setPublicKey(Constants.publicKey);

    var passwordEncrypted = encrypt.encrypt(password);

    return passwordEncrypted;
  }
}
