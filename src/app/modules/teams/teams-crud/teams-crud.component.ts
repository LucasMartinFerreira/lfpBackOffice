import {Component, Input, OnInit} from '@angular/core';
import {TeamsService} from "../../../services/teams/teams.service";
import {NgxSpinnerService} from "ngx-spinner";
import {TeamsModel} from "../../../models/teams-model";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-teams-crud',
  templateUrl: './teams-crud.component.html',
  styleUrls: ['./teams-crud.component.scss']
})
export class TeamsCRUDComponent implements OnInit {

  public idTeam:any;
  public nameTeam: string ='';
  public photo : string = '';
  public stadium : string ='';
  public coach: string = '';
  public president: string= '';
  public history: any = {'goals':'',titles:''};
  private valuePhoto:any;
  private file:any;
  private reader: any;

  private flagEditPhoto: boolean = false;

  private base64textString: string= "";

  @Input() team ;

  constructor(public teamsService: TeamsService,
              public router : Router,
              public spinner: NgxSpinnerService, public teamsModel: TeamsModel,
              public toastr: ToastrService ) {

  }

  ngOnInit() {
    console.log('Tenemos el objecto Equipo', this.team)
    if(this.team !== ""){
      this.idTeam = this.team._id;
      this.nameTeam = this.team.name;
      this.photo = this.team.shield;
      this.stadium = this.team.stadium;
      this.coach = this.team.coach;
      this.president = this.team.president;
      this.history.goals = this.team.history.goals;
      this.history.titles = this.team.history.titles;
    }

  }


  createTeam(){

    this.spinner.show()

    console.log('Que estamos enviando...',this.photo)

    let urlPhoto = this.photo;
    this.photo = urlPhoto.replace('data:image/png;base64,','');

    let body={
      "name": this.nameTeam,
      "shield":this.photo,
      "stadium": this.stadium,
      "history":{
        "goals": this.history.goals,
        "titles": this.history.titles
      },
      "coach": this.coach,
      "president": this.president
    };

    console.log('Body que enviamos...', body)
    this.teamsService.createTeam(body).subscribe(result =>{
      console.log('Equipo Creado correctamente')
      this.toastr.success('Equipo Creado correctamente!');

      this.teamsModel.setnameViewActive('ListTeams');
      this.router.navigate(['teamsMain'])
      this.spinner.hide();
    },error=>{
      this.spinner.hide()
      console.log('Error al crear el Equipo')
    })

  }

  editTeam(){

    let body;
    this.spinner.show();

    if(this.flagEditPhoto){
      this.getValuePhotoUpload();
      let urlPhoto = this.photo;
      this.photo = urlPhoto.replace('data:image/png;base64,','');
      body ={
        "name": this.nameTeam,
        "shield":this.photo,
        "stadium": this.stadium,
        "history":{
          "goals": this.history.goals,
          "titles": this.history.titles
        },
        "coach": this.coach,
        "president": this.president
      };
    }else{
      body ={
        "name": this.nameTeam,
        "stadium": this.stadium,
        "history":{
          "goals": this.history.goals,
          "titles": this.history.titles
        },
        "coach": this.coach,
        "president": this.president
      };
    }

    let idTeam = this.idTeam;



    console.log('Editamos el equipo:', idTeam);
    console.log('Body que enviamos', body)
    this.teamsService.updateTeam(idTeam,body).subscribe(result=>{
      this.toastr.success('Equipo actualizado correctamente!');
      this.teamsModel.setnameViewActive('ListTeams');
      this.router.navigate(['teamsMain'])
      this.spinner.hide();
    },error => {
      this.spinner.hide();
      alert('Error al actualizar')
      console.log('Error al editar el equipo');
    })

  }

  prepareUpdateTeam(){

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
