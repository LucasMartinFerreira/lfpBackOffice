export class LoginModel {

  public token: string;

  public setToken(token:string){
    localStorage.setItem('token', token)
    this.token = token;
  }

  public getToken(){
    if(this.token === undefined){
      return localStorage.getItem('token');
    }else{
      return this.token;
    }
  }
}
