import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EngineService} from './engine.service';
declare var window: any;
//Import Boostrap in your component
import Bootstrap from 'bootstrap/dist/js/bootstrap';
@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {
  formModal: any;
// Define a variable for bootstrap modal and @ViewChild like below
  modalDirect: Bootstrap.Modal;
  @ViewChild('demoModal') input;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  colors: string[] = [
    '#b3478c', '#1e62c0', '#ffa764', '#3de68b', '#a11f2a', '#ffbf00'
  ];
  selectedColor = this.colors[0];
  keysection = new KeyboardEvent('keydown', {
    code: '123',
    //keyCode: 345,
    key: 'a',
  });
  img: any;

  objectgroup: any;
  string1=["un modèle 3D optimisé d’un avion à partir d’un blueprint sous Blender"," 1 camera","1 light"," 9 object pour manipulate","","",""]




  objectselectedstring: any;
  toutavion=true;

  aileavion=false;
  droiteaileavion=false;
  gaucheaileavion=false;

  moteurs=false;
  droitemoteurs=false;
  gauchemoteurs=false;

  rouesavion=false;
  droiterouesavion=false;
  gaucherouesavion=false;

  fuselage=false;
  postedepilotage=false;
  empennagesavion=false;
  objectvisible: any;

  @Input()
  set color(value: string) {

  }
  @Input()
  set keyboardevent(value: KeyboardEvent) {
    this.keysection = value;
    console.log("positin ");
    console.log(this.keysection);
    this.keybord();
  }

  public constructor(private engServ: EngineService) {
    this.img="assets/avion-transformed.png";
  }
//Now create a method to open the bootstrap5 modal on click of a button
  open(element): void {
    this.modalDirect = new Bootstrap.Modal(element, {});
  }
  public ngOnInit(): void {
  /*  this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );*/
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {

    // confirm or save something
    this.formModal.hide();
  }
  public keybord(){
    if(this.keysection){
      this.engServ.changepositionandcolor(this.keysection);
      console.log(this.engServ.string1)
      this.string1[0]=this.engServ.string1[0];
      this.string1[1]=this.engServ.string1[1];
      this.string1[2]=this.engServ.string1[2];
      this.string1[3]=this.engServ.string1[3];
      this.string1[4]=this.engServ.string1[4];
      this.img=this.engServ.img1;

   //  this.string1= this.engServ.string1;
    }
  }
 /* public changecolor(){
    if(this.objectgroup){
      this.engServ.changecolor(this.objectgroup);
    }
  }*/

  objectselected() {
    console.log(this.objectselectedstring)

    if(this.objectselectedstring=="tout l'avion"){
      this.toutavion=true;
      console.log("tout l'avion");
    }
    if(this.objectselectedstring=="L'aile de l'avion"){
      this.aileavion=true; console.log("L'aile de l'avion");
    }
    if(this.objectselectedstring=="L'aile droite de l'avion"){
      this.droiteaileavion=true; console.log("L'aile droite de l'avion");
    }
    if(this.objectselectedstring=="L'aile gauche de l'avion"){
      this.gaucheaileavion=true; console.log("L'aile gauche de l'avion");
    }
    if(this.objectselectedstring=="Moteurs"){
      this.moteurs=true; console.log("Moteurs");
    }
    if(this.objectselectedstring=="Moteur droite"){
      this.droitemoteurs=true; console.log("Moteur droite");
    }
    if(this.objectselectedstring=="Moteur gauche"){
      this.gauchemoteurs=true; console.log("Moteur gauche");
    }
    if(this.objectselectedstring=="Roues avion"){
      this.rouesavion=true; console.log("Roues avion");
    }
    if(this.objectselectedstring=="Roue droite"){
      this.droiterouesavion=true; console.log("Roue droite");
    }
    if(this.objectselectedstring=="Roue gauche"){
      this.gaucherouesavion=true; console.log("Roue gauche");
    }
    if(this.objectselectedstring=="Le fuselage"){
      this.fuselage=true; console.log("Le fuselage");
    }
    if(this.objectselectedstring=="Poste de pilotage"){
      this.postedepilotage=true; console.log("Poste de pilotage");
    }
    if(this.objectselectedstring=="Les empennages d'un avion"){
      this.empennagesavion=true; console.log("Les empennages d'un avion");
    }
    this.reglelaselection();


  }
  reglelaselection(){

    if(this.aileavion==true){
      this.droiteaileavion=true;
      this.gaucheaileavion=true;
    }
    if(this.moteurs==true){
      this.droitemoteurs=true;
      this.gauchemoteurs=true;
    }
    if (this.rouesavion==true){
      this.droiterouesavion=true;
      this.gaucherouesavion=true;
    }
    if(this.toutavion==true){
      this.aileavion=true;
      this.droiteaileavion=true;
      this.gaucheaileavion=true;

      this.moteurs=true;
      this.droitemoteurs=true;
      this.gauchemoteurs=true;

      this.rouesavion=true;
      this.droiterouesavion=true;
      this.gaucherouesavion=true;

      this.fuselage=true;
      this.postedepilotage=true;
      this.empennagesavion=true;
    }
  }
  objectselectedgroup() {
    console.log(this.objectgroup);
    this.engServ.objectgroupselected(this.objectgroup);


  }
  add_light() {
    console.log("add_light");
    this.engServ.add_light(this.objectgroup);
  }
  rotation() {
    console.log("rotation");
    this.engServ.rotation();
  }
}
