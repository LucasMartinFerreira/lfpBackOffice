import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getStringPhoto(photo:string){

    console.log('Que hacemos')
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
      console.log('Que hace esto', photo.replace('data:image/jpeg;base64,',''))
      return photo.replace('data:image/jpeg;base64,','');
    }else if (JPEG !== -1){
      return photo.replace('data:image/JPEG;base64,','');
    }else if(gif !== -1){
      return photo.replace('data:image/gif;base64,','');
    }else{
      return photo;
    }
  }
}
