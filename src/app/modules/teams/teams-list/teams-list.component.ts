import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {TeamsService} from "../../../services/teams/teams.service";
import {TeamsModel} from "../../../models/teams-model";
import { NgxSpinnerService } from 'ngx-spinner';
import {  DialogService } from "ng2-bootstrap-modal";

import { ModalConfirmAction } from './../../../modules/teams/teams-crud/modal-confirm-action/modal-confirm-action'
import {PlayersModel} from "../../../models/players.model";
import {Router} from "@angular/router";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})

export class TeamsListComponent implements OnInit {

   displayedColumns: string[] = ['Equipo', 'Entrenador', 'Presidente', 'actions'];
   public dataSource : any



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public teamsService: TeamsService, public teamsModel: TeamsModel,private spinner: NgxSpinnerService,
              public dialogService: DialogService,
              public playersModel: PlayersModel,
              private changeDetectorRefs: ChangeDetectorRef,
              public router : Router) {


    this.teamsModel.getReloadTable().subscribe(result=>{
      this.getAllTeams();

    });
  }

  ngOnInit() {
    this.getAllTeams();
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getAllTeams(){
    this.spinner.show();
    this.teamsService.getTeams().subscribe(result =>{
     // this.dataSource = result.data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(result.data);
      this.dataSource.paginator = this.paginator;

      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.nextPageLabel = "Siguiente"
      this.paginator._intl.previousPageLabel = "Anterior";
      this.paginator._intl.lastPageLabel = "Última Página";
      this.paginator._intl.firstPageLabel = "Primera Página";
      this.spinner.hide()

      this.dataSource.connect().value

    })
  }

  updateTeam(idTeam){
    this.teamsService.getTeam(idTeam).subscribe(result=>{
      this.teamsModel.setObjectTeam(result.data);
      this.teamsModel.setnameViewActive('CRUDTeams')
    })
  }

  deleteTeam(idTeam , nameTeam){

    let dataObject ={
      title:"Eliminar",
      message : "¿Desea eliminar el equipo "+ nameTeam + " ?",
      idTeam: idTeam
    };

    this.dialogService.addDialog(ModalConfirmAction,dataObject)
  }

  assignPlayers(idTeam: string, nameTeam: string){
    this.teamsModel.setTeam(idTeam);
    this.teamsModel.setNameTeam(nameTeam);
    this.playersModel.setnameViewActive('assignPlayers');
    this.playersModel.setViewActive('assignPlayers');
    this.router.navigate(['playersMain'])

  }
}



