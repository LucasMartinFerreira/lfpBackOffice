import {Component, OnDestroy, OnInit} from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {TeamsService} from "../../../services/teams/teams.service";
import {TeamsModel} from "../../../models/teams-model";
import {NgxSpinnerService} from "ngx-spinner";
import {PlayersService} from "../../../services/players/players.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-players-assign-to-team',
  templateUrl: './players-assign-to-team.component.html',
  styleUrls: ['./players-assign-to-team.component.scss']
})
export class PlayersAssignToTeamComponent implements OnInit , OnDestroy{


  public playerForTeam : any = [];

  public playersWitOutTeam : any =[];

  public allPLayers: any;

  private idTeam: string;

  public nameTeam : string;

  private playerDrag: string;

  public photoTeam : string = '';


  public destroyDropPLayer : Subscription;
  public destroyOutPLayer : Subscription;

  constructor(private dragula: DragulaService,
              private spinner : NgxSpinnerService,
              private teamService : TeamsService,
              private playerService : PlayersService,
              private teamModel : TeamsModel,
              private toastr: ToastrService) {



    this.destroyDropPLayer = dragula.dropModel.subscribe(() => {
      this.onDropModel();
    });

    // dragula.over.subscribe((value) => {
    //   this.onOver(value.slice(1));
    // });
    this.destroyOutPLayer = dragula.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
    this.idTeam = this.teamModel.getTeam();
    this.nameTeam = this.teamModel.getNameTeam();
    this.playersWitOutTeam = [];
    this.playerForTeam = []
    this.getPlayersToTeam();

    this.getAllPlayers();
  }

  ngOnDestroy(){
    this.destroyDropPLayer.unsubscribe();
    this.destroyOutPLayer.unsubscribe();

  }

  private onOut(args) {
    this.playerDrag = args[0].innerHTML;
  }

  /**
   * @description : Actions when user drop Player
   */
  private onDropModel() {
    this.checkPlayerTeam();
    this.checkAssignPlayerTeam();
  }

  /**
   * @description : Remove player of team
   */
  checkPlayerTeam(){
    this.spinner.show()
    for(let i =0; i<this.playersWitOutTeam.length ; i++){
      let namePLayer =  this.playersWitOutTeam[i].name +" " + this.playersWitOutTeam[i].surname
      if(namePLayer === this.playerDrag){
        let body ={
          team:null
        };
        this.playerService.updatePlayer(this.playersWitOutTeam[i].idPlayer, body).subscribe(updatePlayer=>{
          this.spinner.hide()

          this.toastr.success('Jugador '+ this.playersWitOutTeam[i].name  +' enviado al mercado');

          if(this.playerForTeam.length >0){
            var index = this.playerForTeam.indexOf(this.playerForTeam[i].idPlayer);

            if (index > -1) {
              this.playerForTeam.splice(index, 1);
            }
          }
        },error=>{
          this.spinner.hide()
          this.toastr.error('Error al actualizar el jugador !', this.playersWitOutTeam[i].name);
        })
      }
    }
  }


  /**
   * @description : Assign player to team
   */
  checkAssignPlayerTeam(){

    this.spinner.show()

    for(let i =0; i<this.playerForTeam.length ; i++){
      let namePLayer =  this.playerForTeam[i].name +" " + this.playerForTeam[i].surname
      if(namePLayer === this.playerDrag){

        let body ={
          "team":this.idTeam
        };

        this.playerService.updatePlayer(this.playerForTeam[i].idPlayer, body).subscribe(updatePlayer=>{
          this.spinner.hide()
          this.toastr.success('Jugador '+ " " +this.playerForTeam[i].name +" " +'fichado por '+this.nameTeam);


          if(this.playersWitOutTeam.length>0){
            var index = this.playersWitOutTeam.indexOf(this.playersWitOutTeam[i].idPlayer);

            if (index > -1) {
              this.playersWitOutTeam.splice(index, 1);
            }
          }


        },error=>{
          this.spinner.hide()
          this.toastr.error('Error al actualizar el jugador !', this.playerForTeam[i].name);
        })

      }
    }
  }


  /**
   * @description : Get all players to team
   */
  getPlayersToTeam(){
    this.spinner.show()
    this.teamService.getTeam(this.idTeam).subscribe(dataTeam =>{
      this.createArrayWithPlayers(dataTeam);
      this.photoTeam = dataTeam.data.shield;
    },error=>{
      this.spinner.hide()
      this.toastr.error('Error al Obtener los jugadores de un equipo!');
    })
  }

  /**
   * @description : Get All player without team
   */
  getAllPlayers(){
    this.spinner.show();
    this.playerService.getPlayersWitOutTeam().subscribe(dataAllPlayers=>{
      this.allPLayers = dataAllPlayers;
      let playersWitOutTeam = this.allPLayers.data;
      let players = [];
      let objectPlayer;
      for (let i=0; i<playersWitOutTeam.length; i++){
        if(playersWitOutTeam[i].team === null){
          objectPlayer={
            "name":playersWitOutTeam[i].name,
            "surname" : playersWitOutTeam[i].secondname,
            "idPlayer" : playersWitOutTeam[i]._id
          }
          players.push(objectPlayer)
        }
      }
      this.playersWitOutTeam = players;
      this.spinner.hide();
    },error=>{
      this.spinner.hide()
      this.toastr.error('Error al Obtener los jugadores!');
    })
  }

  /**
   * @description : Create Array with players
   * @param dataTeam
   */
  createArrayWithPlayers(dataTeam){
    let players = dataTeam.data.players.playersData;
    let array = [];
    let objectPlayers = {};

    for(let i=0; i<players.length; i++){

      if(players[i].name !== undefined){

        objectPlayers = {
          "name" : players[i].name,
          "surname" : players[i].secondname,
          'idPlayer' : players[i]._id
        }

        array.push(objectPlayers);
      }
    }

    this.playerForTeam = array;
    this.spinner.hide();

  }
}
