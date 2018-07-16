import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashaboardMainComponent } from './dashaboard-main/dashaboard-main.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component'
import { DashboardModel } from './../../models/dashboard-model';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import {RouterModule} from "@angular/router";
import {TeamsService} from "../../services/teams/teams.service";
import {NewsModel} from "../../models/news.model";
import {FooterComponent} from "../../components/footer/footer.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    DashboardContentComponent,
    FooterComponent
  ],
  providers:[DashboardModel, TeamsService, NewsModel],
  declarations: [FooterComponent,DashaboardMainComponent, DashboardSidebarComponent, DashboardHeaderComponent, DashboardContentComponent]
})
export class DashboardModule { }
