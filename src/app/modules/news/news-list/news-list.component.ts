import {Component, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {  DialogService } from "ng2-bootstrap-modal";
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {NewsService} from "../../../services/news/news.service";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NewsModel} from "../../../models/news.model";
import {ModalConfirmAction} from "../../teams/teams-crud/modal-confirm-action/modal-confirm-action";
import {ModalConfirmActionForNews} from "../news-crud/modal-confirmation/modal-confirm-action-for-news";
import {Constants} from "../../../services/constants";


export interface PeriodicElement {
  name: string;
  date: string;
  text: string;
}



@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent implements OnInit {

  displayedColumns: string[] = ['Titulo', 'FechaPublicación','Text','actions'];
  public dataSource : any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public newService: NewsService,
              public newsModel: NewsModel,
              public spinner: NgxSpinnerService,
              public toastr : ToastrService,
              public router: Router,
              public dialogService: DialogService,
              public modelNews: NewsModel) {

    this.newsModel.getReloadTable().subscribe(result=>{
      this.getAllNews()
    })

  }

  ngOnInit() {

    this.getAllNews()
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllNews(){
    this.spinner.show();
    this.newService.getNews().subscribe(dataNews=>{

      let newObject={};
      let newArray =[];

      for (let i=0; i<dataNews.data.length; i++){

        let newDate;

        if(dataNews.data[i].date){
          newDate = moment(dataNews.data[i].date).format(Constants.formatData);
        }
        console.log('Pintamos las fechas', newDate)
        newObject = {
          'title' : dataNews.data[i].title,
          'date': newDate,
          'text': dataNews.data[i].text,
          'idNew':  dataNews.data[i]._id
        };

        newArray.push(newObject);

      };

      this.dataSource = new MatTableDataSource<PeriodicElement>(newArray);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.nextPageLabel = "Siguiente"
      this.paginator._intl.previousPageLabel = "Anterior";
      this.paginator._intl.lastPageLabel = "Última Página";
      this.paginator._intl.firstPageLabel = "Primera Página";
      this.spinner.hide();
    })


  }

  updateNew(id){

    this.spinner.show();
    this.newService.getNew(id).subscribe(result=>{
      this.newsModel.setObjectNew(result.data);
      this.newsModel.setActiveNewsView('CreateNews');
      // this.toastr.success('Noticia actualizada Correctamente');
      this.spinner.hide();
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Error al obtener los datos de una noticia! (' +error.message +')');
    })

  }

  /**
   * @description
   * @param id
   */
  deleteNew(id) {
    let dataObject ={
        title:"Noticias",
        message : "¿Realmente quieres borrar la noticia?",
        id: id
      };
      this.dialogService.addDialog(ModalConfirmActionForNews,dataObject)
  }

}
