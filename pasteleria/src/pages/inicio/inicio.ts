import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';



import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RegisterPage } from '../register/register';
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  //@ViewChild(Nav) nav: Nav;
  db = null;
  usuarios = [];
  estadoUsuario = false;
  boton = 0;
  formLogin: FormGroup;
  formRegister: FormGroup;
  segments: string = "login";
  stateEmail = false;

  iconSave: String = "paper";
  loader: any;
  constructor(public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.initialForm();

   
    console.log("Hola mundo");
  }

  initialForm() {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.formRegister = this.fb.group({
      name: ['', [Validators.required]], email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern(/^[a-z0-9_-]{5,100}$/), Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  mostrarMensaje(mensaje, tiempo, position) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: position,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

  }
  public goToRegister() {

   
  }

  verificarDatos() {

  }

  goToRecover() {
    this.mostrarMensaje("Se envío una clave nueva a tu correo!!", 3000, 'top');
  }  //Functions for register
  guardarUsuario() {

    
  }
  /*
    verificarConexion() {
      var networkState = navigator.connection.type;
      alert(networkState);
  
    }*/
  segmentChanged(e) {
    this.formLogin.reset();
    this.formRegister.reset();
  }

  findEmail() {
    
  }

  irHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
