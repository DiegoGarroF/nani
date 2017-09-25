import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * 



...



this.keyboard.close();
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

 constructor(private keyboard: Keyboard,public navCtrl: NavController, public navParams: NavParams) 
 {
  }
 ngOnInit()
 {
          console.log('cargo init');

 }
 ngAfterViewInit(){
       console.log('cargo primero');

 }
  ionViewDidLoad() {
    this.keyboard.show();
    console.log('ionViewDidLoad ComentariosPage');
  }

}
