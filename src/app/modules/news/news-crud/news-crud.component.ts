import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {NewsService} from "../../../services/news/news.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NewsModel} from "../../../models/news.model";
import * as moment from 'moment';
import {Constants} from "../../../services/constants";
import {UtilsService} from "../../../services/utils.service";

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
  private id : number;

  private file:any;
  private flagEditPhoto: boolean = false;

  private base64textString: string= "";

  public valuePhoto:any;


  @Input() newObject ;

  constructor(public spinner: NgxSpinnerService,
              public utilsService: UtilsService,
              public newsService: NewsService, public toastr: ToastrService, public router : Router, public modelNews: NewsModel) { }

  ngOnInit() {

    if(this.newObject !== '' && this.newObject !== null && this.newObject !== undefined){
      this.title = this.newObject.title;
      this.date = moment(this.newObject.title).format(Constants.formatData);
      this.subtitle = this.newObject.subtitle;
      this.reporter = this.newObject.reporter;
      this.text = this.newObject.text;
      this.link = this.newObject.link;
      this.photo= this.newObject.photo;
    }
  }



  createNew(){

    this.spinner.show();

    this.getValuePhotoUpload();

    let urlPhoto = this.photo;
    this.photo = this.utilsService.getStringPhoto(urlPhoto);


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
      this.toastr.error('Error al crear una noticia!');
      console.log('Error al crear la noticia (' +error.message +')')
    })
  }


  updateNew(){
    let body;

    this.spinner.show();
    if(this.flagEditPhoto){
      this.getValuePhotoUpload();
      let urlPhoto = this.photo;
      this.photo = this.utilsService.getStringPhoto(urlPhoto);
      body = {
        'title': this.title,
        'date': this.date,
        'subtitle': this.subtitle,
        'reporter': this.reporter,
        'text': this.text,
        'link': this.link,
        "photo": this.photo
      }

    }else{
       body = {
        'title': this.title,
        'date': this.date,
        'subtitle': this.subtitle,
        'reporter': this.reporter,
        'text': this.text,
        'link': this.link
      }
    }

    this.newsService.updateNew(this.id,body).subscribe(resultData=>{
      this.toastr.success('Noticia Actualizada correctamente!');
      this.modelNews.setActiveNewsView('ListNews');
      this.router.navigate(['newsMain'])
      this.spinner.hide();
    },error=>{
      this.spinner.hide()
      this.toastr.error('Noticia Actualizada correctamente!');
      console.log('Error al actualizar la noticia ('+error.message+')')
    })
  }



  onFileChanged(event){


    this.flagEditPhoto = true;

    this.file = event.target.files[0];

    console.log('File', this.file)

    if (this.file) {
      let reader = new FileReader();

      reader.onload = (event:any) => {

        this.photo = event.target.result;

      };

      this.valuePhoto = this;



      reader.readAsDataURL(event.target.files[0]);

    }
  }


  getValuePhotoUpload(){

    if (this.file) {

      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this.valuePhoto);

      reader.readAsBinaryString(this.file);

    }
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    this.photo = this.base64textString;
  }


}
