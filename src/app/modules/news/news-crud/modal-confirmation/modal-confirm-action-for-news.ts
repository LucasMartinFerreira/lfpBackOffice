import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TeamsService} from "../../../../services/teams/teams.service";
import {ToastrService} from "ngx-toastr";
import {NewsService} from "../../../../services/news/news.service";
import {NewsModel} from "../../../../models/news.model";
import {Router} from "@angular/router";



export interface ConfirmModel {
  title: string;
  message: string;
  id : number
}


@Component({
  selector: 'app-modal-confirm-action-for-news',
  templateUrl: './modal-confirm-action.html'
})


export class ModalConfirmActionForNews  extends DialogComponent<ConfirmModel, boolean>implements ConfirmModel, OnInit {

  public title;
  public message;
  public id;

  constructor(public dialogService : DialogService,
              public newService : NewsService,
              public modelNews: NewsModel,
              public router: Router,
              private spinner: NgxSpinnerService, public teamsService: TeamsService,public toastr: ToastrService) {
    super(dialogService);
  }

  ngOnInit() {

  }

  /**
   * @description Eliminación de una noticia
   */
  confirm(){
    this.spinner.show();
    this.newService.deleteNew(this.id).subscribe(deleteData => {
      this.toastr.success('Noticia eliminada correctamente!');
      this.spinner.hide();
      this.modelNews.setActiveNewsView('ListNews');
      this.router.navigate(['newsMain'])
    },error => {
      this.spinner.hide();
      this.toastr.error('Error al eliminar una noticia! ('+error.message+')');
    })

  }
}
