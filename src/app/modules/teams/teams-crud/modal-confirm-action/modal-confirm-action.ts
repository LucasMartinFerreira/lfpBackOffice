import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TeamsService} from "../../../../services/teams/teams.service";
import {ToastrService} from "ngx-toastr";

import {HttpErrorResponse} from "@angular/common/http";


export interface ConfirmModel {
  title: string;
  message: string;
  idTeam : number
}


@Component({
  selector: 'app-modal-confirm-action',
  templateUrl: './modal-confirm-action.html'
})


export class ModalConfirmAction  extends DialogComponent<ConfirmModel, boolean>implements ConfirmModel, OnInit {

  public title;
  public message;
  public idTeam;

  constructor(public dialogService : DialogService,private spinner: NgxSpinnerService, public teamsService: TeamsService,public toastr: ToastrService) {
    super(dialogService);
  }

  ngOnInit() {

  }

  /**
   * @description Eliminación de un equipo
   */
  confirm(){
    this.spinner.show();
    this.teamsService.deleteTeam(this.idTeam).subscribe(result=>{
      this.toastr.success('Equipo Eliminado correctamente!');
      this.spinner.hide();
      this.close();
    },(err: HttpErrorResponse) => {
      this.toastr.error('Ha ocurrido un error al eliminar un equipo!');
    })

  }
}
