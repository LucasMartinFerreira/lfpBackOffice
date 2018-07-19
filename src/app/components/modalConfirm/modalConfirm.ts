import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";


export interface ConfirmModel {
  title: any;
  message: any;
}


@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modalConfirm.html',
  styleUrls: ['./modalConfirm.scss']
})


export class ModalConfirm  extends DialogComponent<ConfirmModel, boolean>implements ConfirmModel, OnInit {

  public title;
  public message;

  constructor(public dialogService : DialogService) {
    super(dialogService);
  }

  ngOnInit() {

  }



  confirm(){
    alert('Eliminamos el Equipo!')
  }
}
