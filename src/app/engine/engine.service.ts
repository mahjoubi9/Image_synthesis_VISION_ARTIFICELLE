import * as THREE from 'three';
import {ElementRef, Injectable, Input, NgZone, OnDestroy} from '@angular/core';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {Color} from "three";

@Injectable({providedIn: 'root'})
export class EngineService implements OnDestroy {
  keysection:any;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;
  private avion: any;
  private loader = new GLTFLoader();
  private colors: string[] = [
    '#ff0000', '#1e62c0', '#00ff23', '#3de68b',  '#ffbf00'
  ];
  private i=1;
  string1:any;

  private frameId: number = null;
  private mateialstotal: MTLLoader.MaterialCreator;
  private objectgroup : string[] = [];
  img1: any;

  public constructor(private ngZone: NgZone) {
    this.objectgroup.push("tout l'avion");
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.renderer != null) {
      this.renderer.dispose();
      this.renderer = null;
      this.canvas = null;
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.i=this.i+1;
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
 //try {

 /* this.loader.load('assets/airplane1.glb',function ( gltf ) {
     //this.scene.add(this.avion);
     console.log("susss");
     console.log(gltf);
     this.avion =  gltf;
   }, undefined, function ( error ) {
     console.log("error");
     console.error( error );

   } );*/


  // this.avion = this.gltfLoaderService.load('assets/airplane1.glb');
/* }catch (e) {
   console.log("error");
   console.log(e);
 }*/

      // let loader = new GLTFLoader();
      //
      // loader.load(
      //   "assets/airplane1.gltf",
      //   gltf => {
      //    // this.scene.add(gltf);
      //
      //     for(let i=0;i<2;i++){
      //       if(gltf)
      //         gltf.scene.children[i].visible=true;
      //         gltf.userData.isContainer = true
      //       // @ts-ignore
      //   //    gltf.scene.children[i].material.emissive.setHex(parseInt(#b3478c.substring(1), 16));
      //       this.scene.add(gltf.scene.children[i]);
      //       this.avion=gltf.scene.children;
      //       console.log(gltf.scene.children[i])
      //     }
      //
      //
      //   },
      //   xhr => {
      //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      //   },
      //   error => {
      //     console.error(error);
      //   }
      // );
    let mtlLoader = new MTLLoader()
    mtlLoader.load(
     'assets/final5.mtl',
      //'assets/plane_2.mtl',
      (materials) => {
        materials.preload()
        console.log(materials);
        this.mateialstotal=materials;
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        console.log(objLoader);
        objLoader.load(
            'assets/final5.obj',
          //'assets/plane_2.obj',
            (object) => {
              //motarliman
            //  (object.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(10,10,10);
              (object.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material=materials.materials['Material.005'];
              //lwast
              (object.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material=materials.materials['Material.001'];
              (object.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material=materials.materials['Material.001'];
              //lor
              (object.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material=materials.materials['Material.006'];
              //jnahliman
              (object.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material=materials.materials['Material.002'];
              //jnahlisar
              (object.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material=materials.materials['Material.007'];
              //roidaliman
              (object.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material=materials.materials['Material.003'];
              (object.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material=materials.materials['Material.003'];
              //roidlisar
              (object.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material=materials.materials['Material.003'];
              (object.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material=materials.materials['Material.008'];
              //motartlisar
              (object.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material=materials.materials['Material.008'];

              //l9adam
              (object.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material=materials.materials['Material.009'];
              //jnahliman
              (object.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material=materials.materials['Material.002'];

              console.log((object.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material);
              console.log("this.scene22")
              console.log(materials.materials['Material.006']);


                this.scene.add(object)
              console.log("this.scene22")
              console.log(this.scene)
              console.log("this.scene22")
              this.string1=["un modèle 3D optimisé d’un avion à partir d’un blueprint sous Blender","1 camera",this.i+" light","9 object pour manipulate","","",""]
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened')
            }
        )
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log('An error happened')
      }
    )
    /*// instantiate a loader
    let loader2 = new OBJLoader();

// load a resource
    loader2.load(
      // resource URL
      'assets/airplane1.obj',
      // called when resource is loaded
      function ( object ) {
        scene.add( object );

      },
      // called when loading is in progresses
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
    );*/

 console.log("eeee"+this.avion);



    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    let controls = new OrbitControls(this.camera, this.renderer.domElement );
    controls.enableZoom =true;
    controls.enableDamping=true;
    controls.minDistance = 200;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping=true;
    controls.enablePan=true;
    controls.update();
    console.log("this.avion");
    console.log(this.avion);
    console.log("this.avion");
    console.log(this.cube);
 //   this.scene.add(this.avion);

  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    //this.cube.position.set(1,1,1);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.cube.scale.set(50, 50, 50);
    this.cube.position.set(200,200,200);
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  changepositionandcolor(keysection: KeyboardEvent){
    this. keysection=keysection;
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    if(this.cube&&keysection){

      console.log("this.scene");
      console.log(this.scene);
      console.log("this.scene");

/*if(){
  // soft white light
  this.light = new THREE.AmbientLight(0x404040);
  this.light.position.z = 3;
  this.scene.add(this.light);
}*/
      //tout l'avion
      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "tout l'avion")){
        this.scene.children[3].position.set(this.scene.children[3].position.x,this.scene.children[3].position.y-7,this.scene.children[3].position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "tout l'avion")){

        this.scene.children[3].position.set(this.scene.children[3].position.x,this.scene.children[3].position.y+7,this.scene.children[3].position.z)
        //this.scene.children[4].position.set(this.scene.children[4].position.x,this.scene.children[4].position.y+7,this.scene.children[4].position.z)
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "tout l'avion")){
        this.scene.children[3].position.set(this.scene.children[3].position.x+7,this.scene.children[3].position.y,this.scene.children[3].position.z)
        // this.scene.children[4].position.set(this.scene.children[4].position.x+7,this.scene.children[4].position.y,this.scene.children[4].position.z)
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "tout l'avion")){
        this.scene.children[3].position.set(this.scene.children[3].position.x-7,this.scene.children[3].position.y,this.scene.children[3].position.z)
        //this.scene.children[4].position.set(this.scene.children[4].position.x-7,this.scene.children[4].position.y,this.scene.children[4].position.z)
      }

      //L'aile de l'avoin

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y-7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y-7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y+7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y+7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x+7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x+7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "L'aile de l'avion")){

        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x-7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x-7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }

      //L'aile droite de l'avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y-7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
       // (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y-7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y+7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y+7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x+7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x+7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){

        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x-7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x-7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }

      //L'aile gauche de l'avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
    //    (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y-7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y-7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
      //  (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x,this.scene.getObjectByName("airplane1.004_Material.003").position.y+7,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x,this.scene.getObjectByName("airplane1.005_Material.003").position.y+7,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
       // (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x+7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x+7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){

        //(this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.004_Material.003").position.x-7,this.scene.getObjectByName("airplane1.004_Material.003").position.y,this.scene.getObjectByName("airplane1.004_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.005_Material.003").position.x-7,this.scene.getObjectByName("airplane1.005_Material.003").position.y,this.scene.getObjectByName("airplane1.005_Material.003").position.z);
      }
      //MOTEUR

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Moteurs")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y-7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y-7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Moteurs")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y+7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y+7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Moteurs")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x+7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x+7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Moteurs")){

        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x-7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x-7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }

      //MoteuR droite de l'avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y-7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y-7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y+7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y+7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x+7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x+7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x-7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x-7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }

      //Moteur gauche de l'avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Moteur gauche")){
        //(this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y-7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y-7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Moteur gauche")){
        // (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x,this.scene.getObjectByName("airplane1.006_Material.003").position.y+7,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x,this.scene.getObjectByName("airplane1.009_Material.003").position.y+7,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Moteur gauche")){
        // (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x+7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x+7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Moteur gauche")){
        //(this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.006_Material.003").position.x-7,this.scene.getObjectByName("airplane1.006_Material.003").position.y,this.scene.getObjectByName("airplane1.006_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.009_Material.003").position.x-7,this.scene.getObjectByName("airplane1.009_Material.003").position.y,this.scene.getObjectByName("airplane1.009_Material.003").position.z);
      }

      //Roues avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Roues avion")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y-7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y-7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y-7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y-7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Roues avion")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y+7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y+7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y+7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y+7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Roues avion")) {
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x+7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x+7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x+7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x+7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Roues avion")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x-7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x-7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x-7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x-7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }

      //Roue droite

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Roue droite")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y-7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y-7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
      //  (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y-7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
     //   (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y-7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Roue droite")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y+7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y+7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
     //   (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y+7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
     //   (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y+7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Roue droite")) {
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x+7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x+7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
      //  (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x+7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
     //   (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x+7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Roue droite")){
        //roidaliman
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x-7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x-7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
      //  (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x-7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
       // (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x-7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }

      //Roues gauche avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Roue gauche")){
        //roidaliman
      //  (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y-7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
      //  (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y-7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y-7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y-7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Roue gauche")){
        //roidaliman
     //   (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x,this.scene.getObjectByName("airplane1.007_Material.003").position.y+7,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
      //  (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x,this.scene.getObjectByName("airplane1.007_Material.004").position.y+7,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x,this.scene.getObjectByName("airplane1.008_Material.003").position.y+7,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x,this.scene.getObjectByName("airplane1.008_Material.004").position.y+7,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Roue gauche")) {
        //roidaliman
     //   (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x+7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
      //  (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x+7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x+7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x+7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);

      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Roue gauche")){
        //roidaliman
      //  (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.003").position.x-7,this.scene.getObjectByName("airplane1.007_Material.003").position.y,this.scene.getObjectByName("airplane1.007_Material.003").position.z);
      //  (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.007_Material.004").position.x-7,this.scene.getObjectByName("airplane1.007_Material.004").position.y,this.scene.getObjectByName("airplane1.007_Material.004").position.z);
        //roidlisar
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.003").position.x-7,this.scene.getObjectByName("airplane1.008_Material.003").position.y,this.scene.getObjectByName("airplane1.008_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.008_Material.004").position.x-7,this.scene.getObjectByName("airplane1.008_Material.004").position.y,this.scene.getObjectByName("airplane1.008_Material.004").position.z);
      }
      //Le fuselage

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Le fuselage")){

        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.003").position.x,this.scene.getObjectByName("airplane1.001_Material.003").position.y-7,this.scene.getObjectByName("airplane1.001_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y-7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Le fuselage")){
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.003").position.x,this.scene.getObjectByName("airplane1.001_Material.003").position.y+7,this.scene.getObjectByName("airplane1.001_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y+7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Le fuselage")){
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.003").position.x+7,this.scene.getObjectByName("airplane1.001_Material.003").position.y,this.scene.getObjectByName("airplane1.001_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x+7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Le fuselage")){

        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.003").position.x-7,this.scene.getObjectByName("airplane1.001_Material.003").position.y,this.scene.getObjectByName("airplane1.001_Material.003").position.z);
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x-7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }

      //Poste de pilotage

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Poste de pilotage")){

        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.003_Material.003").position.x,this.scene.getObjectByName("airplane1.003_Material.003").position.y-7,this.scene.getObjectByName("airplane1.003_Material.003").position.z);
        //  (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y-7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.003_Material.003").position.x,this.scene.getObjectByName("airplane1.003_Material.003").position.y+7,this.scene.getObjectByName("airplane1.003_Material.003").position.z);
        //  (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y+7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.003_Material.003").position.x+7,this.scene.getObjectByName("airplane1.003_Material.003").position.y,this.scene.getObjectByName("airplane1.003_Material.003").position.z);
        // (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x+7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Poste de pilotage")){

        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.003_Material.003").position.x-7,this.scene.getObjectByName("airplane1.003_Material.003").position.y,this.scene.getObjectByName("airplane1.003_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x-7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }

      //Les empennages d'un avion

      if(keysection.key=="ArrowDown"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){

        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.002_Material.003").position.x,this.scene.getObjectByName("airplane1.002_Material.003").position.y-7,this.scene.getObjectByName("airplane1.002_Material.003").position.z);
        //  (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y-7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);

      }else if(keysection.key=="ArrowUp"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.002_Material.003").position.x,this.scene.getObjectByName("airplane1.002_Material.003").position.y+7,this.scene.getObjectByName("airplane1.002_Material.003").position.z);
        //  (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x,this.scene.getObjectByName("airplane1.001_Material.004").position.y+7,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowRight"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.002_Material.003").position.x+7,this.scene.getObjectByName("airplane1.002_Material.003").position.y,this.scene.getObjectByName("airplane1.002_Material.003").position.z);
        // (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x+7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }else if(keysection.key=="ArrowLeft"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){

        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.002_Material.003").position.x-7,this.scene.getObjectByName("airplane1.002_Material.003").position.y,this.scene.getObjectByName("airplane1.002_Material.003").position.z);
        //(this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).position.set(this.scene.getObjectByName("airplane1.001_Material.004").position.x-7,this.scene.getObjectByName("airplane1.001_Material.004").position.y,this.scene.getObjectByName("airplane1.001_Material.004").position.z);
      }

//set color for all
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "tout l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //MOTEUR

        material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;

        //Roues avion
        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;
        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

        //Le fuselage
        material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;

        //Poste de pilotage
        material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;

        //Les empennages d'un avion
        material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }
//set color for L'aile de l'avion
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "L'aile de l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //L'aile droite de l'avion
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        //L'aile droite de l'avion

        let material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

      }

      //L'aile gauche de l'avion
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        //L'aile gauche de l'avion

        let material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //MOTEUR

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Moteurs")){
        //MOTEUR

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Moteur droite

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Moteur droite")){
        //Moteur droite

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

      }
      //Moteur gauche

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Moteur gauche")){
        //Moteur gauche
        let  material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Roues avion

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Roues avion")) {
        //Roues avion
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

      }

      //Roue droite

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Roue droite")) {
        //Roue droite
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

      }

      //Roues gauche avion

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Roue gauche")) {
        //roidaliman
        /*  material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
          // @ts-ignore
          material.color.setHex(parseInt('#ff0000'.substring(1), 16));
          (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;*/

        let  material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;
      }

      //Le fuselage

      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Le fuselage")){

        //Le fuselage
        let material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;
      }
      //Poste de pilotage
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        //Poste de pilotage
        let  material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;
      }
      //Les empennages d'un avion
      if(keysection.key=="r"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        //Les empennages d'un avion
        let  material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ff0000'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//set color for all
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "tout l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //MOTEUR

        material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;

        //Roues avion
        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;
        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

        //Le fuselage
        material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;

        //Poste de pilotage
        material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;

        //Les empennages d'un avion
        material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }
//set color for L'aile de l'avion
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "L'aile de l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //L'aile droite de l'avion
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        //L'aile droite de l'avion

        let material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

      }

      //L'aile gauche de l'avion
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        //L'aile gauche de l'avion

        let material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //MOTEUR

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Moteurs")){
        //MOTEUR

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Moteur droite

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Moteur droite")){
        //Moteur droite

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

      }
      //Moteur gauche

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Moteur gauche")){
        //Moteur gauche
        let  material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Roues avion

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Roues avion")) {
        //Roues avion
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

      }

      //Roue droite

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Roue droite")) {
        //Roue droite
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

      }

      //Roues gauche avion

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Roue gauche")) {
        //roidaliman
        /*  material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
          // @ts-ignore
          material.color.setHex(parseInt('#ff0000'.substring(1), 16));
          (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;*/

        let  material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;
      }

      //Le fuselage

      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Le fuselage")){

        //Le fuselage
        let material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;
      }
      //Poste de pilotage
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        //Poste de pilotage
        let  material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;
      }
      //Les empennages d'un avion
      if(keysection.key=="b"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        //Les empennages d'un avion
        let  material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#ffbf00'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//set color for all
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "tout l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //MOTEUR

        material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;

        //Roues avion
        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;
        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

        //Le fuselage
        material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;

        //Poste de pilotage
        material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;

        //Les empennages d'un avion
        material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }
//set color for L'aile de l'avion
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "L'aile de l'avion")){

        //L'aile de l'avoin
        let  material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;

        //L'aile droite de l'avion

        material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

        //L'aile gauche de l'avion

        material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //L'aile droite de l'avion
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        //L'aile droite de l'avion

        let material = (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).material = material;

      }

      //L'aile gauche de l'avion
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        //L'aile gauche de l'avion

        let material = (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).material = material;
      }

      //MOTEUR

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Moteurs")){
        //MOTEUR

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Moteur droite

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Moteur droite")){
        //Moteur droite

        let  material = (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).material = material;

      }
      //Moteur gauche

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Moteur gauche")){
        //Moteur gauche
        let  material = (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).material = material;
      }
      //Roues avion

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Roues avion")) {
        //Roues avion
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

        //roidaliman
        material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;

      }

      //Roue droite

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Roue droite")) {
        //Roue droite
        let material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).material = material;

      }

      //Roues gauche avion

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Roue gauche")) {
        //roidaliman
        /*  material = (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material;
          // @ts-ignore
          material.color.setHex(parseInt('#ff0000'.substring(1), 16));
          (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).material = material;*/

        let  material = (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).material = material;
      }

      //Le fuselage

      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Le fuselage")){

        //Le fuselage
        let material = (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).material = material;
      }
      //Poste de pilotage
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        //Poste de pilotage
        let  material = (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).material = material;
      }
      //Les empennages d'un avion
      if(keysection.key=="v"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        //Les empennages d'un avion
        let  material = (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).material = material;

        material = (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material;
        // @ts-ignore
        material.color.setHex(parseInt('#3de68b'.substring(1), 16));
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).material = material;
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      if(keysection.key=="x"&&this.objectgroup.find(e => e === "tout l'avion")){

        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;

      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "tout l'avion")){
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=true;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=true;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=true;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=true;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=true;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=true;
      }
      if(keysection.key=="x"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
//L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
//L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=true;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
      }

      //L'aile droite de l'avion
      if(keysection.key=="x"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
      }
      //L'aile droite de l'avion
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
      }

      //L'aile gauche de l'avion
      if(keysection.key=="x"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
      }
      //L'aile gauche de l'avion
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=true;
      }

      //MOTEUR

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Moteurs")){
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;

      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Moteurs")){
        //MOTEUR
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=true;

      }
      //Moteur droite

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;


      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Moteur droite")){
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=true;


      }
      //Moteur gauche

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Moteur gauche")){

        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Moteur gauche")){
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=true;
      }
      //Roues avion

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Roues avion")) {

        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;


      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Roues avion")) {
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=true;

      }

      //Roue droite

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Roue droite")) {
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;


      }

      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Roue droite")) {
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;


      }

      //Roues gauche avion

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Roue gauche")) {
    //    (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;

      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Roue gauche")) {
       /// (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=true;

      }

      //Le fuselage

      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Le fuselage")){
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;


      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Le fuselage")){
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=true;

      }
      //Poste de pilotage
      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;

      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=true;
      }
      //Les empennages d'un avion
      if(keysection.key=="x"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
//Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
      }
      if(keysection.key=="c"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=true;
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      if(keysection.key=="w"&&this.objectgroup.find(e => e === "tout l'avion")){
        this.img1="assets/avion-transformed.png";
        this.string1=["un modèle 3D optimisé d’un avion à partir d’un blueprint sous Blender","1 camera",this.i+" light","9 object pour manipulate","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;

      }


      if(keysection.key=="w"&&this.objectgroup.find(e => e === "L'aile de l'avion")){
        this.img1="assets/Laileavion.jpeg";
        this.string1=["L'aile de l'avion","","","","","",""];
      //  this.string1="dddddddddddddd";
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
//L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=true;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
      }
      //L'aile droite de l'avion
      if(keysection.key=="w"&&this.objectgroup.find(e => e === "L'aile droite de l'avion")){
        this.img1="assets/Laileavion.jpeg";
        this.string1=["L'aile de l'avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=true;
      }

      //L'aile gauche de l'avion
      if(keysection.key=="w"&&this.objectgroup.find(e => e === "L'aile gauche de l'avion")){
        this.img1="assets/Laileavion.jpeg";
        this.string1=["L'aile de l'avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=true;
      }

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Moteurs")){
        this.img1="assets/moteur.jpg";
        this.string1=["Moteurs","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=true;

      }
      //Moteur droite

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Moteur droite")){
        this.img1="assets/moteur.jpg";
        this.string1=["Moteurs","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=true;


      }
      //Moteur gauche

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Moteur gauche")){
        this.img1="assets/moteur.jpg";
        this.string1=["Moteurs","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=true;
      }
      //Roues avion


      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Roues avion")) {
        this.img1="assets/roues.png";
        this.string1=["Roues avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=true;

      }

      //Roue droite

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Roue droite")) {
        this.img1="assets/roues.png";
        this.string1=["Roues avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;


      }

      //Roues gauche avion

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Roue gauche")) {
        this.img1="assets/roues.png";
        this.string1=["Roues avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        /// (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=true;

      }

      //Le fuselage

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Le fuselage")){
        this.img1="assets/Lefuselage.png";
        this.string1=["Le fuselage","","","","","",""];
        //Le fuselage
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=true;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=true;

      }
      //Poste de pilotage
      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Poste de pilotage")){
        this.img1="assets/Postedepilotage.png";
        this.string1=["Poste de pilotage","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=true;
      }
      //Les empennages d'un avion

      if(keysection.key=="w"&&this.objectgroup.find(e => e === "Les empennages d'un avion")){
        this.img1="assets/loravion.PNG";
        this.string1=["Les empennages d'un avion","","","","","",""];
        //L'aile de l'avoin
        (this.scene.getObjectByName("airplane1.004_Material.003") as THREE.Mesh).visible=false;
        //L'aile droite de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //L'aile gauche de l'avion
        (this.scene.getObjectByName("airplane1.005_Material.003") as THREE.Mesh).visible=false;
        //MOTEUR
        (this.scene.getObjectByName("airplane1.006_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.009_Material.003") as THREE.Mesh).visible=false;
        //Roues avion
        (this.scene.getObjectByName("airplane1.007_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.007_Material.004") as THREE.Mesh).visible=false;
//roidaliman

        (this.scene.getObjectByName("airplane1.008_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.008_Material.004") as THREE.Mesh).visible=false;
        //Le fuselage
        (this.scene.getObjectByName("airplane1.001_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.001_Material.004") as THREE.Mesh).visible=false;
        //Poste de pilotage
        (this.scene.getObjectByName("airplane1.003_Material.003") as THREE.Mesh).visible=false;
        //Les empennages d'un avion
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=false;
        (this.scene.getObjectByName("airplane1.002_Material.003") as THREE.Mesh).visible=true;
      }


      this.cube.position.set(1,1,1);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }

  }

  objectgroupselected(objectgroup: []) {
    this.objectgroup = objectgroup;
  }

  add_light(objectgroup: []) {
    this.objectgroup = objectgroup;
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    if(this.cube&&this.keysection){
      console.log("this.scene");
      console.log(this.scene);
      console.log("this.scene");
      // soft white light
      this.light = new THREE.AmbientLight(0x404040);
      this.light.position.z = 15;
      this.scene.add(this.light);
      this.cube.position.set(1,1,1);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }

  }

  rotation() {

    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    let controls = new OrbitControls(this.camera, this.renderer.domElement );
    controls.autoRotate =true;
    controls.update();
    this.cube.position.set(1,1,1);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
