import {Component, Input, OnInit} from '@angular/core';
import {TeamsService} from "../../../services/teams/teams.service";
import {NgxSpinnerService} from "ngx-spinner";
import {TeamsModel} from "../../../models/teams-model";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {UtilsService} from "../../../services/utils.service";
import {  FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';
import {Constants} from "../../../services/constants";


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
  public formData;
  private flagEditPhoto: boolean = false;
  public form : FormGroup;

  @Input() team ;

  constructor(public teamsService: TeamsService,
              public router : Router,
              public spinner: NgxSpinnerService, public teamsModel: TeamsModel,
              public toastr: ToastrService,
              public utilsService: UtilsService) {

    this.teamsModel.getObjectTeam().subscribe(result=>{
      if(result === '' || result === null || result === undefined){
        this.idTeam ='';
        this.nameTeam = '';
        this.photo = '';
        this.stadium = '';
        this.coach = '';
        this.president = '';
        this.history.goals ='';
        this.history.titles = '';
      }
    });
  }

  ngOnInit() {

    this.formData = new FormData();

    if(this.team !== "" && this.team !== null){
      this.idTeam = this.team._id;
      this.nameTeam = this.team.name;
      this.photo = this.team.shield;


      if(this.team.shield !== undefined && this.team.shield !=='' && this.team.shield!==null){
        this.photo = this.team.shield;
      }else{
        this.photo ="";
      }

      this.stadium = this.team.stadium;
      this.coach = this.team.coach;
      this.president = this.team.president;

      if(this.team.history !== undefined && this.team.history !=='' && this.team.history!==null){
        this.history.goals =  this.team.history.goals
        this.history.titles =   this.team.history.titles;
      }else{
        this.history.goals ='';
        this.history.titles = '';
      }

    }else{
      this.team = null
    }

    this.validateInputForm();
  }

  validateInputForm(){
    this.form = new FormGroup({
      nameTeam: new FormControl('', Validators.required),
      stadium: new FormControl(),
      coach: new FormControl(),
      president: new FormControl(),
      goalsInput: new FormControl('', Validators.pattern(Constants.exprNumber)),
      titlesInput: new FormControl('', Validators.pattern(Constants.exprNumber))
    });
  }

  enabledAllForm(){
    for(let i in this.form.controls){
      this.form.controls[i].markAsTouched();
    }
  }

  createTeam(){

    if(this.form.valid){
      this.spinner.show();

      this.validateForm();

      this.teamsService.createTeam(this.formData).subscribe(result =>{

        this.toastr.success('Equipo Creado correctamente!');
        this.teamsModel.setnameViewActive('ListTeams');
        this.router.navigate(['teamsMain'])
        this.spinner.hide();
      },error=>{
        this.spinner.hide()

        this.toastr.error('Error: !'+ error.message);

        console.log('Error al crear el Equipo')
      })
    }else{
      this.enabledAllForm();
      this.toastr.warning('Rellene los datos correctamente!');
    }



  }

  editTeam(){
    if(this.form.valid){
      this.spinner.show();

      this.validateForm();

      let idTeam = this.idTeam;

      this.teamsService.updateTeam(idTeam, this.formData).subscribe(result=>{
        this.toastr.success('Equipo actualizado correctamente!');
        this.teamsModel.setnameViewActive('ListTeams');
        this.router.navigate(['teamsMain'])
        this.spinner.hide();
      },error => {
        this.spinner.hide();
        this.toastr.error('Erroral actualizar el equipo!');
        console.log('Error al editar el equipo');
      })
    }else{
      this.enabledAllForm();
      this.toastr.warning('Rellene los datos correctamente!');
    }

  }


  onFileChanged(event){


    this.flagEditPhoto = true;

    this.file = event.target.files[0];

    this.formData.append('shield', this.file );

    if (this.file) {
      let reader = new FileReader();
      this.valuePhoto = this;

      reader.onload = (event: any) => {
        this.photo = event.target.result;
        // this.formData.append('shield', this.photo);
      };

      // console.log('Valor de la Photo?', this.photo);

      reader.readAsDataURL(event.target.files[0]);

    }
  }

  validateForm(){

    if(this.nameTeam !== '' && this.nameTeam !== null && this.nameTeam !== undefined){
      this.formData.append('name', this.nameTeam );
    }

    if(this.stadium !== '' && this.stadium !== null && this.stadium !== undefined){
      this.formData.append('stadium', this.stadium );
    }

    if(this.history.goals  !== '' && this.history.goals  !== null && this.history.goals  !== undefined){
      this.formData.append('history.goals', this.history.goals );
    }

    if(this.history.titles !== '' && this.history.titles !== null && this.history.titles !== undefined){
      this.formData.append('history.titles', this.history.titles);
    }

    if(this.coach !== '' && this.coach !== null && this.coach !== undefined){
      this.formData.append('coach', this.coach );
    }

    if(this.president !== '' && this.president !== null && this.president !== undefined){
      this.formData.append('president', this.president );
    }






  }
}
