import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {PlayersService} from "../../../services/players/players.service";
import {PlayersModel} from "../../../models/players.model";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils.service";
import {  FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';
import {Constants} from "../../../services/constants";

@Component({
  selector: 'app-players-crud',
  templateUrl: './players-crud.component.html',
  styleUrls: ['./players-crud.component.scss']
})
export class PlayersCrudComponent implements OnInit {

  public characteristics :any ={
    "age": '',
    "height": '',
    "weight": ''
  };
  public age: string;
  public height : string;
  public weight : string;
  public statistics: any = {
    "goals": '',
    "titles": ''
  };
  public formData;
  public team: string;
  public strengths: string = '';
  public weaknesses: string = '';
  public name: string;
  public secondname: string = '';
  public nationality:string = '';
  public photo: string = '';
  public teamName; string;
  public idPlayer: number;
  private file:any;
  public valuePhoto:any;
  public position: string;
  public form : FormGroup;

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
        this.age = "";
        this.height = "";
        this.weight = ""

      }
    });
  }


  ngOnInit() {

    this.formData = new FormData();

    if(this.player !== '' && this.player !== null && this.player !== undefined){


      if(this.player.characteristics !== undefined && this.player.characteristics!=='' && this.player.characteristics !==null){
        this.age = this.player.characteristics.age;
        this.height = this.player.characteristics.height;
        this.weight = this.player.characteristics.weight;
      }
      // this.characteristics  = this.player.characteristics;


      if(this.player.statistics !== undefined && this.player.statistics !=='' && this.player.statistics!==null){
        this.statistics.goals = this.player.statistics.goals;
        this.statistics.titles = this.player.statistics.titles;
      }else{
        this.statistics.goals ='';
        this.statistics.titles = '';
      }

      if(this.player.team !== undefined && this.player.team!=='' && this.player.team !==null){
        this.team = this.player.team;
        this.teamName = this.player.team.name;
      }else{
        this.teamName = "Sin Equipo"
      }
      this.strengths = this.player.strengths;
      this.weaknesses = this.player.weaknesses;
      this.name = this.player.name;
      this.secondname = this.player.secondname;
      this.nationality = this.player.nationality;

      if(this.player.photo !== undefined && this.player.photo !=='' && this.player.photo!==null){
        this.photo = this.player.photo;
      }else{
        this.photo ="";
      }


      this.idPlayer = this.player._id;
      this.position = this.player.position;

    }else{
      this.player = null;
    }

    this.validateInputForm();

  }


  validateInputForm(){
    this.form = new FormGroup({
      namePlayer: new FormControl('', Validators.required),
      secondname: new FormControl(),
      nationality: new FormControl(),
      teamName: new FormControl(),
      strengths: new FormControl(),
      position: new FormControl(),
      weaknesses: new FormControl(),
      goals: new FormControl('', Validators.pattern(Constants.exprNumber)),
      titles: new FormControl('', Validators.pattern(Constants.exprNumber)),
      agePlayer: new FormControl('', Validators.pattern(Constants.exprNumber)),
      heightPlayer: new FormControl('', Validators.pattern(Constants.exprNumber)),
      weightPlayer: new FormControl('', Validators.pattern(Constants.exprNumber))
    });
  }

  enabledAllForm(){
    for(let i in this.form.controls){
      this.form.controls[i].markAsTouched();
    }
  }

  createPlayer(){

    if(this.form.valid){
      this.spinner.show();

      this.validateForm();

      this.playerService.createPlayer(this.formData).subscribe(resultCreated=>{
        this.toastr.success('Jugador creado correctamente!');
        this.playerModel.setnameViewActive('ListPlayers');
        this.router.navigate(['playersMain'])
        this.spinner.hide();
      },error => {
        this.spinner.hide();
        this.toastr.error('Error al crear el jugador!');
      })
    }else{
      this.enabledAllForm();
      this.toastr.warning('Rellene los datos correctamente!');
    }

  }

  updatePlayer(){
    if(this.form.valid){
      this.spinner.show();
      this.validateForm();
      this.playerService.updatePlayer(this.idPlayer,this.formData).subscribe(result=>{
        this.toastr.success('Jugador actualizado correctamente!');
        this.playerModel.setnameViewActive('ListPlayers');
        this.router.navigate(['playersMain'])
        this.spinner.hide();
      },error => {
        this.spinner.hide();
        this.toastr.error('Error al actualizar el jugador!');
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

  validateForm(){

    if(this.name !== '' && this.name !== null && this.name !== undefined){
      this.formData.append('name', this.name );
    }

    if(this.nationality !== '' && this.nationality !== null && this.nationality !== undefined){
      this.formData.append('nationality', this.nationality );
    }

    if(this.secondname !== '' && this.secondname !== null && this.secondname !== undefined){
      this.formData.append('secondname', this.secondname );
    }

    if(this.weaknesses !== '' && this.weaknesses !== null && this.weaknesses !== undefined){
      this.formData.append('weaknesses', this.weaknesses );
    }

    if(this.strengths !== '' && this.strengths !== null && this.strengths !== undefined){
      this.formData.append('strengths', this.strengths );
    }

    if(this.statistics.goals !== '' && this.statistics.goals !== null && this.statistics.goals !== undefined){
      this.formData.append('statistics.goals', parseInt(this.statistics.goals) );
    }

    if(this.statistics.titles !== '' && this.statistics.titles !== null && this.statistics.titles !== undefined){
      this.formData.append('statistics.titles', this.statistics.titles );
    }

    if(this.position !== '' && this.position !== null && this.position !== undefined){
      this.formData.append('position', this.position );
    }

    if(this.age !== '' && this.age !== null && this.age !== undefined){
      this.formData.append('characteristics.age', parseInt(this.age));
    }

    if(this.height !== '' && this.height !== null && this.height !== undefined){
      this.formData.append('characteristics.height', parseInt(this.height));
    }

    if(this.weight !== '' && this.weight !== null && this.weight !== undefined){
      this.formData.append('characteristics.weight', parseInt(this.weight));
    }


  }

}
