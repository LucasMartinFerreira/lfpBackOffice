import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {NgxSpinnerService} from "ngx-spinner";

import {ToastrService} from "ngx-toastr";

import {HttpErrorResponse} from "@angular/common/http";
import {PlayersService} from "../../../../services/players/players.service";
import {TeamsModel} from "../../../../models/teams-model";
import {Router} from "@angular/router";
import {PlayersModel} from "../../../../models/players.model";
import {PlayersListComponent} from "../../players-list/players-list.component";


export interface ConfirmModel {
  title: string;
  message: string;
  idPlayer : number
}


@Component({
  selector: 'app-modal-confirm-action-players',
  templateUrl: './modal-confirm-action-players.component.html'
})


export class ModalConfirmActionPlayersComponent  extends DialogComponent<ConfirmModel, boolean>implements ConfirmModel, OnInit {

  public title;
  public message;
  public idPlayer;

  constructor(public dialogService : DialogService, public playersModel: PlayersModel, public router: Router, private spinner: NgxSpinnerService, public playerService: PlayersService,public toastr: ToastrService) {
    super(dialogService);
  }

  ngOnInit() {

  }

  /**
   * @description Eliminación de un equipo
   */
  confirm(){
    this.spinner.show();
    this.playerService.deletePlayer(this.idPlayer).subscribe(result=>{
      this.toastr.success('Jugador Eliminado correctamente!');
      this.spinner.hide();
      this.playersModel.setReloadTable(true);
      this.close();
    },(err: HttpErrorResponse) => {
      this.spinner.hide();
      this.close();
      this.toastr.error('Ha ocurrido un error al eliminar un jugador!');
    })

  }
}
