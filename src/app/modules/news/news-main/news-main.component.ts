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

  constructor(public newsModel: NewsModel) {

    this.newsModel.getActiveNewsView().subscribe(resultView=>{
      let view = resultView;
      this.viewActive = view;
    })
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
