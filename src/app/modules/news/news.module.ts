import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsMainComponent } from './news-main/news-main.component';
import { NewsListComponent } from './news-list/news-list.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import { NewsCrudComponent } from './news-crud/news-crud.component';
import {MatInputModule, MatPaginatorModule, MatTableModule, MatToolbarModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {PlayersService} from "../../services/players/players.service";
import {FooterComponent} from "../../components/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    DashboardModule, MatPaginatorModule,
    FormsModule,
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule
  ],
  declarations: [NewsMainComponent, NewsListComponent, NewsCrudComponent],
  providers:[PlayersService]
})

export class NewsModule { }
