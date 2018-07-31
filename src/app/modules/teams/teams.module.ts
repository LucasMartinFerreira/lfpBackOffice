import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsMainComponent } from './teams-main/teams-main.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule} from '@angular/material';
import { TeamsCRUDComponent } from './teams-crud/teams-crud.component';

import { TeamsModel } from "../../models/teams-model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamsService} from "../../services/teams/teams.service";
import { MatPaginatorModule } from '@angular/material';
import {ModalConfirm} from "./../../components/modalConfirm/modalConfirm";
import {ModalConfirmAction} from "./teams-crud/modal-confirm-action/modal-confirm-action";
import {FooterComponent} from "../../components/footer/footer.component";
import {UtilsService} from "../../services/utils.service";



@NgModule({
  declarations: [TeamsMainComponent, TeamsListComponent, TeamsCRUDComponent, ModalConfirm, ModalConfirmAction],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DashboardModule,
    MatPaginatorModule,
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule
  ],
  exports:[
    ModalConfirm,
    ModalConfirmAction
  ],
  entryComponents:[ModalConfirm,ModalConfirmAction],
  providers:[TeamsModel, TeamsService, ModalConfirm,ModalConfirmAction, UtilsService]

})
export class TeamsModule { }
