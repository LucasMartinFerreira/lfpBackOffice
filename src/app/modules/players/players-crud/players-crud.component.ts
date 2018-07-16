import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {PlayersService} from "../../../services/players/players.service";
import {PlayersModel} from "../../../models/players.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-players-crud',
  templateUrl: './players-crud.component.html',
  styleUrls: ['./players-crud.component.scss']
})
export class PlayersCrudComponent implements OnInit {

  public characteristics :any;
  public age: number;
  public height : number;
  public weight : number;
  public statistics: any;
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


  private flagEditPhoto: boolean = false;

  private base64textString: string= "";

  @Input() player ;

  constructor(private spinner: NgxSpinnerService,
              public toastr: ToastrService,
              public router : Router,
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
        this.statistics='';
        this.characteristics ={
          "age":"",
          "height":"",
          "weight":""
        }
      }
    });
  }


  ngOnInit() {


    console.log('Tenemos en el CRUD los datos del jugador....', this.player)
    if(this.player !== '' && this.player !== null && this.player !== undefined){

      if(this.player.characteristics !== undefined && this.player.characteristics!=='' && this.player.characteristics !==null){
        this.age = this.player.characteristics.age;
        this.height = this.player.characteristics.height;
        this.weight = this.player.characteristics.weight;
      }
      // this.characteristics  = this.player.characteristics;
      this.statistics = this.player.statistics;
      if(this.player.team !== undefined && this.player.team!=='' && this.player.team !==null){
        this.team = this.player.team;
      }
      this.strengths = this.player.strengths;
      this.weaknesses = this.player.weaknesses;
      this.name = this.player.name;
      this.secondname = this.player.secondname;
      this.nationality = this.player.nationality;
      this.photo = this.player.photo;
      this.teamName = this.player.teamName;
      this.idPlayer = this.player._id;
    }
  }


  createPlayer(){
    this.spinner.show();
    let urlPhoto = this.photo;
    this.photo = urlPhoto.replace('data:image/png;base64,','');

    let body = {
      "name" :this.name,
      "secondname": this.secondname,
      "nationality" :this.nationality,
      "photo": this.photo,
      "teamName": "",
      "weaknesses":[],
      "strengths":[],
      "statistics":{
        teamsPlayed:['Real Madrid']
      },
      "characteristics" :{
        "age": this.age,
        "height": this.height,
        "weight": this.weight
      }
    };

    console.log('Datos que enviamos', body);
    this.playerService.createPlayer(body).subscribe(resultCreated=>{
      this.toastr.success('Jugador creado correctamente!');
      this.playerModel.setnameViewActive('ListPlayers');
      this.router.navigate(['playersMain'])
      this.spinner.hide();
    },error => {
      this.spinner.hide();
      this.toastr.success('Error al crear el jugador!');
    })

  }

  updatePlayer(){
    let body;
    this.spinner.show();

    if(this.flagEditPhoto){
      this.getValuePhotoUpload();
      let urlPhoto = this.photo;
      this.photo = urlPhoto.replace('data:image/png;base64,','');
      body = {
        "name" :this.name,
        "secondname": this.secondname,
        "nationality" :this.nationality,
        "photo": this.photo,
        "teamName": "",
        "weaknesses":"",
        "strengths":"",
        "statistics":{
          teamsPlayed:['Real Madrid']
        },
        "characteristics" :{
          "age": this.age,
          "height": this.height,
          "weight": this.weight
        }
      };
    }else{
      body = {
        "name" :this.name,
        "secondname": this.secondname,
        "nationality" :this.nationality,
        "teamName": "",
        "weaknesses":"",
        "strengths":"",
        "statistics":{
          teamsPlayed:['Real Madrid']
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
      this.toastr.success('Error al actualizar el jugador!');
    })
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

      reader.onload = this._handleReaderLoaded.bind(this.photo);

      reader.readAsBinaryString(this.file);

    }
  }


  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    this.photo = this.base64textString;
  }




}
