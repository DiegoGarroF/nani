import { Component,ViewChild } from '@angular/core';
import { NavController,ModalController,Slides,Platform  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { CargaArchivosService } from "../../providers/carga-archivos/carga-archivos";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('pageSlider') pageSlider: Slides;
existe_registros=true;
 //posts: FirebaseListObservable<any[]>;
   tabs: any = '0';
 displayName;
 estadoLogueo:boolean=false;
  constructor(private platform: Platform,  private afAuth: AngularFireAuth,private _cas: CargaArchivosService,public navCtrl: NavController, private modalCtrl:ModalController, private fb: Facebook) {
this.estadoLogueo=this.verificarLogueo();
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;        
        return;
      }
      this.displayName = user.displayName;      
    });

  }
mostrarModal()
{
  let modal=this.modalCtrl.create("SubirPage").present();
}

megusta()
{
  alert("Click en me gusta");
}
comentar()
{
  this.navCtrl.push("ComentariosPage");

}
compartir(){
  alert("Click en compartir");

}
  changeWillSlide($event) {

    this.tabs = $event._snapIndex.toString();
  }
    selectTab(index) {
    this.pageSlider.slideTo(index);
  }

  doInfinite(infiniteScroll:any) {
    console.log('siguientes imagenes');
this._cas.cargar_Imagenes().then((existenMas:boolean)=>{
  this.existe_registros=existenMas;
infiniteScroll.complete();
});
  }
ngOnInit(){
  this._cas.cargar_Imagenes();

}
//facebook
  signInWithFacebook() {
    /*
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res =>{console.log(res);
    this.estadoLogueo=this.verificarLogueo();});*/
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
         let logueo=firebase.auth().signInWithCredential(facebookCredential);
        this.estadoLogueo=this.verificarLogueo();
              
        return logueo;
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res =>{
           console.log(res.user.displayName);
            this.displayName = res.user.displayName;     
      this.estadoLogueo=this.verificarLogueo();});
    }
      
  }
  signOut() {
    this.afAuth.auth.signOut();
    this.estadoLogueo=false;
  }

  verificarLogueo()
  {
     if(this.afAuth.auth.currentUser!=null)
      return true;
     return false;
  }
}
