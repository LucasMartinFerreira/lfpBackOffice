import {Component, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {  DialogService } from "ng2-bootstrap-modal";
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {NewsService} from "../../../services/news/news.service";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NewsModel} from "../../../models/news.model";


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
              public spinner: NgxSpinnerService,
              public toastr : ToastrService,
              public router: Router,
              public modelNews: NewsModel) { }

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
          newDate = moment(dataNews.data[i].date).format('DD-MM-YYYY');
        }
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
    alert('Actualizamos la noticia'+ id)
  }

  /**
   * @description
   * @param id
   */
  deleteNew(id) {
    this.newService.deleteNew(id).subscribe(deleteData => {
      this.toastr.success('Noticia eliminada correctamente!');
      this.modelNews.setActiveNewsView('ListNews');
      this.router.navigate(['newsMain'])
    },error => {

      this.toastr.error('Error al eliminar una noticia!');
    })

  }

}
