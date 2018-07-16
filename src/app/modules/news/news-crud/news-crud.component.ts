import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {NewsService} from "../../../services/news/news.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NewsModel} from "../../../models/news.model";

@Component({
  selector: 'app-news-crud',
  templateUrl: './news-crud.component.html',
  styleUrls: ['./news-crud.component.scss']
})
export class NewsCrudComponent implements OnInit {


  public title: string;
  public date: string;
  public photo : string = '';
  public subtitle: string;
  public reporter: string;
  public text: string;
  public link: string;
  public new: string = '';

  private file:any;
  private flagEditPhoto: boolean = false;

  private base64textString: string= "";

  constructor(public spinner: NgxSpinnerService, public newsService: NewsService, public toastr: ToastrService, public router : Router, public modelNews: NewsModel) { }

  ngOnInit() {}



  createNew(){

    this.spinner.show();

    console.log('Foto....', this.photo)

    let urlPhoto = this.photo;
    this.photo = urlPhoto.replace('data:image/png;base64,','');

    let body = {
      'title': this.title,
      'date': this.date,
      'subtitle': this.subtitle,
      'reporter': this.reporter,
      'text': this.text,
      'link': this.link,
      "photo": this.photo
    }

    this.newsService.createNew(body).subscribe(resultData=>{
      this.toastr.success('Noticia Creada correctamente!');
      this.modelNews.setActiveNewsView('ListNews');
      this.router.navigate(['newsMain'])
    },error=>{
      this.spinner.hide()
      console.log('Error al crear la noticia')
    })
  }


  updateNew(){

  }



  onFileChanged(event){


    this.flagEditPhoto = true;

    this.file = event.target.files[0];

    console.log('File', this.file)

    if (this.file) {
      let reader = new FileReader();

      reader.onload = (event:any) => {
        console.log('Tenemos la foto....')
        this.photo = event.target.result;

      };

      console.log('Valor de la Photo?', this.photo);

      reader.readAsDataURL(event.target.files[0]);

    }
  }


  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    this.photo = this.base64textString;
  }


}
