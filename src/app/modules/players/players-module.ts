import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { MatPaginatorModule } from '@angular/material';

/**Components***/
import { PlayersListComponent } from "./players-list/players-list.component";
import { PlayersMainComponent } from "./players-main/players-main.component";
import {DashboardModule} from "../dashboard/dashboard.module";
import {PlayersService} from "../../services/players/players.service";
import {PlayersCrudComponent} from "./players-crud/players-crud.component";
import {PlayersModel} from "../../models/players.model";
import { ModalConfirmActionPlayersComponent } from './players-crud/modal-confirm-action/modal-confirm-action-players.component'
import {PlayersAssignToTeamComponent} from "./players-assign-to-team/players-assign-to-team.component";
import {DragulaModule} from "ng2-dragula";




@NgModule({
  declarations: [PlayersListComponent,  PlayersAssignToTeamComponent,PlayersMainComponent, PlayersCrudComponent, ModalConfirmActionPlayersComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DragulaModule,
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule
  ],
  exports:[
  ],
  entryComponents:[ModalConfirmActionPlayersComponent],
  providers:[PlayersModel, PlayersService]

})
export class PlayersModule { }
