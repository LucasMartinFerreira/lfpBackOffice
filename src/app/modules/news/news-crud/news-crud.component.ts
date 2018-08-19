import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {NewsService} from "../../../services/news/news.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NewsModel} from "../../../models/news.model";
import * as moment from 'moment';
import {Constants} from "../../../services/constants";
import {UtilsService} from "../../../services/utils.service";
import {  FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';

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
  public formData;
  private file:any;
  private flagEditPhoto: boolean = false;
  public form : FormGroup;

  private base64textString: string= "";

  public valuePhoto:any;


  @Input() newObject ;

  constructor(public spinner: NgxSpinnerService,
              public utilsService: UtilsService,
              public newsService: NewsService,
              public toastr: ToastrService,
              public router : Router,
              public modelNews: NewsModel) {

    this.modelNews.getObjectNew().subscribe(result=>{
      this.title = '';
      this.date = '';
      this.subtitle = '';
      this.reporter = '';
      this.text = '';
      this.link = '';
      this.photo= '';
    });



  }

  ngOnInit() {

    this.formData = new FormData();

    console.log('Id que llega..', this.newObject)
    if(this.newObject !== '' && this.newObject !== null && this.newObject !== undefined){
      this.title = this.newObject.title;
      this.date = moment(this.newObject.date).format(Constants.formatData);
      this.subtitle = this.newObject.subtitle;
      this.reporter = this.newObject.reporter;
      this.text = this.newObject.text;
      this.link = this.newObject.link;
      this.photo= this.newObject.photo;
      this.id = this.newObject._id;
    }

    this.validateInputForm();

  }

  validateInputForm(){
    this.form = new FormGroup({
      titleNews: new FormControl('', Validators.required),
      subtitleNews: new FormControl('', Validators.required),
      textBody: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.pattern(Constants.exprDate),Validators.required]),
      link: new FormControl('', [Validators.pattern(Constants.exprLink),Validators.required]),

    });
  }

  enabledAllForm(){
    for(let i in this.form.controls){
      this.form.controls[i].markAsTouched();
    }
  }

  createNew(){

    if(this.form.valid){
      this.spinner.show();

      this.formData.append('title', this.title );
      this.formData.append('date', moment.utc(this.date).format());
      this.formData.append('subtitle', this.subtitle );
      this.formData.append('reporter', this.reporter );
      this.formData.append('text', this.text );
      this.formData.append('link', this.link );



      this.newsService.createNew(this.formData).subscribe(resultData=>{
        this.toastr.success('Noticia Creada correctamente!');
        this.modelNews.setActiveNewsView('ListNews');
        this.router.navigate(['newsMain'])
      },error=>{
        this.spinner.hide()
        this.toastr.error('Error al crear una noticia!');
        console.log('Error al crear la noticia (' +error.message +')')
      })
    }else{
      this.enabledAllForm();
      this.toastr.warning('Rellene los datos correctamente!');
    }

  }


  updateNew(){

    if(this.form.valid){
      this.spinner.show();
      this.formData.append('title', this.title );

      this.formData.append('date',this.date);
      this.formData.append('subtitle', this.subtitle );
      this.formData.append('reporter', this.reporter );
      this.formData.append('text', this.text );
      this.formData.append('link', this.link );




      this.newsService.updateNew(this.id,this.formData).subscribe(resultData=>{
        this.toastr.success('Noticia Actualizada correctamente!');
        this.modelNews.setActiveNewsView('ListNews');
        this.router.navigate(['newsMain'])
        this.spinner.hide();
      },error=>{
        this.spinner.hide()
        this.toastr.success('Noticia Actualizada correctamente!');
        console.log('Error al actualizar la noticia ('+error.message+')')
      })
    }else{
      this.enabledAllForm();
      this.toastr.warning('Rellene los datos correctamente!');
    }

  }



  onFileChanged(event){


    this.flagEditPhoto = true;

    this.file = event.target.files[0];

    this.formData.append('photo', this.file );

    if (this.file) {
      let reader = new FileReader();

      reader.onload = (event:any) => {

        this.photo = event.target.result;

      };

      this.valuePhoto = this;



      reader.readAsDataURL(event.target.files[0]);

    }
  }



}
