import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../modules/login/login.component";
import {DashaboardMainComponent} from "../modules/dashboard/dashaboard-main/dashaboard-main.component";
import {PlayersMainComponent} from "../modules/players/players-main/players-main.component";
import {TeamsMainComponent} from "../modules/teams/teams-main/teams-main.component";
import {NewsMainComponent} from "../modules/news/news-main/news-main.component";



const router : Routes = <Routes>[
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashaboardMainComponent},
  {path: 'teamsMain', component: TeamsMainComponent},
  {path: 'playersMain', component: PlayersMainComponent},
  {path: 'newsMain', component: NewsMainComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

export const app_routing = RouterModule.forRoot(router, {useHash:true})
