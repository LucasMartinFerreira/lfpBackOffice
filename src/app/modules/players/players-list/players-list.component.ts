import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {  DialogService } from "ng2-bootstrap-modal";
import { ModalConfirmAction } from './../../../modules/teams/teams-crud/modal-confirm-action/modal-confirm-action'
import {PlayersService} from "../../../services/players/players.service";
import {PeriodicElement} from "../../teams/teams-list/teams-list.component";
import {PlayersModel} from "../../../models/players.model";
import {ModalConfirmActionPlayersComponent} from "../players-crud/modal-confirm-action/modal-confirm-action-players.component";



@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})

export class PlayersListComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Equipo', 'Nacionalidad','actions'];

  public dataSource : any;

  public objectPlayers: any = {};

  public newArray : any = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService,
              private playersService : PlayersService,
              public playersModel : PlayersModel,
              public dialogService: DialogService) {

    this.playersModel.getReloadTable().subscribe(result=>{
       this.getAllPlayers();
    });

  }

  ngOnInit() {

   this.getAllPlayers();
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPlayers(){

  this.spinner.show();
    this.playersService.getPlayers().subscribe(resultPlayers=>{

      for(let i=0; i<resultPlayers.data.length;i++){
        this.objectPlayers.name = resultPlayers.data[i].name;
        this.objectPlayers.secondname = resultPlayers.data[i].secondname;
        this.objectPlayers.nationality = resultPlayers.data[i].nationality;
        this.objectPlayers.photo = resultPlayers.data[i].photo;
        this.objectPlayers.idPlayer = resultPlayers.data[i]._id;
        if(resultPlayers.data[i].team ==='' || resultPlayers.data[i].team === undefined || resultPlayers.data[i].team === null){
          resultPlayers.data[i].teamName = 'Jugador en Mercado'
        }else{

          if(resultPlayers.data[i].team !== undefined){
            resultPlayers.data[i].teamName = resultPlayers.data[i].team.name;
          }else{
            resultPlayers.data[i].teamName = 'Sin Equipo';
          }

        }
        this.newArray.push(this.objectPlayers);
      }


      this.dataSource = this.newArray;
      this.dataSource = new MatTableDataSource<PeriodicElement>(resultPlayers.data);

      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.nextPageLabel = "Siguiente"
      this.paginator._intl.previousPageLabel = "Anterior";
      this.paginator._intl.lastPageLabel = "Última Página";
      this.paginator._intl.firstPageLabel = "Primera Página";
      this.spinner.hide()
    })


  }

  /**
   * @description Actualizar Jugador
   * @param {number} idPlayer
   */
  updatePlayer(idPlayer: number){
    this.spinner.show();
      this.playersService.getPlayer(idPlayer).subscribe(result=>{
        this.playersModel.setObjectPlayer(result.data);
        this.playersModel.setnameViewActive('CRUDPlayers');
        this.spinner.hide();
      })
  }


  deletePlayer(idPlayer: number, name: string){

    console.log('id del jugador', idPlayer)
    let dataObject ={
      title:"Borrado de Jugadores",
      message : "¿Desea borrar el jugador "+ name + "?",
      idPlayer: idPlayer
    };

    this.dialogService.addDialog(ModalConfirmActionPlayersComponent,dataObject);
  }
}



