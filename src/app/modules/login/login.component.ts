import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {LoginModel} from "../../models/login.model";
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private router : Router, public loginService: LoginService,
              public loginModel : LoginModel,
              public toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {

  }

  goToDashboard(){
    this.spinner.show();

    let body ={
      "username": this.username,
      "password": this.password
    };

    this.loginService.doLogin(body).subscribe(result=>{
      console.log('Hemos realizdo login:', result.token)
      this.loginModel.setToken(result.token);
      this.router.navigate(['dashboard'])
      this.spinner.hide();
    },error => {
      this.spinner.hide();
      this.toastr.error('Datos Incorrectos');
      console.log('Error al realizar login')
    }
   )
  }
}
