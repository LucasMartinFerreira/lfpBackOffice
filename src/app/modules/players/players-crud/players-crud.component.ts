import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {PlayersService} from "../../../services/players/players.service";
import {PlayersModel} from "../../../models/players.model";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils.service";

@Component({
  selector: 'app-players-crud',
  templateUrl: './players-crud.component.html',
  styleUrls: ['./players-crud.component.scss']
})
export class PlayersCrudComponent implements OnInit {

  public characteristics :any;
  public age: string;
  public height : string;
  public weight : string;
  public statistics: any = {
    "goals": '',
    "titles": ''
  };
  public team: number;
  public strengths: any;
  public weaknesses: any;
  public name: string;
  public secondname: string;
  public nationality:string;
  public photo: string = '';
  public teamName; string;
  public idPlayer: number;
  private file:any;
  public valuePhoto:any;
  public position: string;


  private flagEditPhoto: boolean = false;

  private base64textString: string= "";



  @Input() player ;

  constructor(private spinner: NgxSpinnerService,
              public toastr: ToastrService,
              public router : Router,
              public utilsService: UtilsService,
              public playerService: PlayersService,
              public playerModel: PlayersModel
  ) {

    this.playerModel.getObjectPlayer().subscribe(result=>{

      if(result === '' || result === null || result === undefined){
        this.name= '';
        this.secondname= '';
        this.nationality= '';
        this.photo= '';
        this.teamName='';
        this.weaknesses= '';
        this.strengths= '';
        this.position = '';
        this.statistics={
          "goals": '',
          "titles": ''
        };
        this.age = '';
        this.height = "";
        this.weight = ""

      }
    });
  }


  ngOnInit() {


    if(this.player !== '' && this.player !== null && this.player !== undefined){

      if(this.player.characteristics !== undefined && this.player.characteristics!=='' && this.player.characteristics !==null){
        this.age = this.player.age;
        this.height = this.player.height;
        this.weight = this.player.weight;
      }
      // this.characteristics  = this.player.characteristics;
      this.statistics = this.player.statistics;
      if(this.player.team !== undefined && this.player.team!=='' && this.player.team !==null){
        this.team = this.player.team;
        this.teamName = this.player.team[0].name;
      }
      this.strengths = this.player.strengths;
      this.weaknesses = this.player.weaknesses;
      this.name = this.player.name;
      this.secondname = this.player.secondname;
      this.nationality = this.player.nationality;
      this.photo = this.player.photo;

      this.idPlayer = this.player._id;
      this.position = this.player.position;

    }else{
      this.player = null;
    }
  }


  createPlayer(){
    this.spinner.show();

    this.getValuePhotoUpload();
    let urlPhoto = this.photo;
    this.photo = this.utilsService.getStringPhoto(urlPhoto);

    let body = {
      "name" :this.name,
      "secondname": this.secondname,
      "nationality" :this.nationality,
      "photo": this.photo,
      "teamName": "",
      "team": null,
      "weaknesses":this.weaknesses,
      "strengths": this.strengths,
      "statistics":{
        "goals": this.statistics.goals,
        "titles": this.statistics.titles
      },
      "position": this.position,
      "characteristics" :{
        "age": this.age,
        "height": this.height,
        "weight": this.weight
      }
    };


    this.playerService.createPlayer(body).subscribe(resultCreated=>{
      this.toastr.success('Jugador creado correctamente!');
      this.playerModel.setnameViewActive('ListPlayers');
      this.router.navigate(['playersMain'])
      this.spinner.hide();
    },error => {
      this.spinner.hide();
      this.toastr.error('Error al crear el jugador!');
    })

  }

  updatePlayer(){
    let body;
    this.spinner.show();

    if(this.flagEditPhoto){
      this.getValuePhotoUpload();
      let urlPhoto = this.photo;
      this.photo = this.utilsService.getStringPhoto(urlPhoto);

      body = {
        "team": this.team,
        "name" :this.name,
        "secondname": this.secondname,
        "nationality" :this.nationality,
        "photo": this.photo,
        "teamName": "",
        "position": this.position,
        "weaknesses":this.weaknesses,
        "strengths":this.strengths,
        "statistics":{
          "goals": this.statistics.goals,
          "titles": this.statistics.titles
        },
        "characteristics" :{
          "age": this.age,
          "height": this.height,
          "weight": this.weight
        }
      };
    }else{
      body = {
        "team": this.team,
        "name" :this.name,
        "secondname": this.secondname,
        "nationality" :this.nationality,
        "teamName": "",
        "position": this.position,
        "weaknesses":this.weaknesses,
        "strengths":this.strengths,
        "statistics":{
          "goals": this.statistics.goals,
          "titles": this.statistics.titles
        },
        "characteristics" :{
          "age": this.age,
          "height": this.height,
          "weight": this.weight
        }
      };
    }



    this.playerService.updatePlayer(this.idPlayer,body).subscribe(result=>{
      this.toastr.success('Jugador actualizado correctamente!');
      this.playerModel.setnameViewActive('ListPlayers');
      this.router.navigate(['playersMain'])
      this.spinner.hide();
    },error => {
      this.spinner.hide();
      this.toastr.error('Error al actualizar el jugador!');
    })
  }



  onFileChanged(event){


    this.flagEditPhoto = true;

    this.file = event.target.files[0];
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
