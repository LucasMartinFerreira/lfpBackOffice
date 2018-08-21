import { Component, OnInit } from '@angular/core';
import {NewsModel} from "../../../models/news.model";

@Component({
  selector: 'app-news-main',
  templateUrl: './news-main.component.html',
  styleUrls: ['./news-main.component.scss']
})
export class NewsMainComponent implements OnInit {

  public stateSidebar;
  public viewActive: any = 'ListNews';
  public newObject: any;

  constructor(public newsModel: NewsModel) {

    this.newsModel.getActiveNewsView().subscribe(resultView => {
      let view = resultView;
      console.log('Vista Activa', view)
      this.viewActive = view;
    })

    this.newsModel.getObjectNew().subscribe(result => {
      console.log('Datos de la noticia', result)
      this.newObject = result;
    });
  }

  ngOnInit() {
    if( this.newsModel.getNameView() !== undefined){
      this.viewActive = this.newsModel.getNameView();
    }
  }


  openCloseSidebar(event){
    this.stateSidebar = event.stateSidebar;
  }
}
