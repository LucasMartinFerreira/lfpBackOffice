import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';

import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { app_routing } from "./services/router";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

import { CommonModule } from '@angular/common';

import { TeamsModule } from "./modules/teams/teams.module";
import { RouterModule } from '@angular/router';
import { MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginService } from './services/login/login.service';
import {LoginModel} from "./models/login.model";

import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {PlayersModule} from "./modules/players/players-module";


import { DragulaModule } from 'ng2-dragula';
import {NewsModule} from "./modules/news/news.module";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],

  imports: [

    DashboardModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    app_routing,
    TeamsModule,
    PlayersModule,
    RouterModule,
    NgxSpinnerModule,
    NewsModule,
    BrowserAnimationsModule,
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
    }),
    BootstrapModalModule.forRoot({container:document.body}),
    DragulaModule
  ],
  exports: [
    DashboardModule,
    NgxSpinnerModule,
    DragulaModule,
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule
  ],
  providers: [TeamsModule, NewsModule, PlayersModule, LoginService, LoginModel],
  bootstrap: [AppComponent]
})

export class AppModule { }
