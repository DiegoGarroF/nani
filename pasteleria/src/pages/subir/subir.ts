import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController,LoadingController,ToastController,Platform } from "ionic-angular";

import { CargaArchivosService } from "../../providers/carga-archivos/carga-archivos";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
/**
 * Generated class for the SubirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
  
})
export class SubirPage {

  titulo:string="";
imgPreview:string=null;
img:string=null;
  constructor(public loadingCtrl: LoadingController,private  _cas :CargaArchivosService,private imagePicker: ImagePicker,private platform:Platform,public toastCtrl: ToastController,private camera: Camera,private viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubirPage');
  }
cerrar_modal()
{
this.viewCtrl.dismiss();
}

tomarFoto()
{
  if(!this.platform.is("cordova"))
    {
      this.mostrarMensaje("Camara no permitida");
      return;
    }
const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  correctOrientation:true
}

this.camera.getPicture(options).then((imageData) => {

 this.imgPreview = 'data:image/jpeg;base64,' + imageData;
 this.img=imageData;
}, (err) => {
 this.mostrarMensaje("Error "+err);
 console.error("Error en la camara ");
});
}


mostrarMensaje(mensaje:string)
{
  let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
}

abrirGaleria()
{
   if(!this.platform.is("cordova"))
    {
      this.mostrarMensaje("Camara no permitida");
      return;
    }
    let opciones:ImagePickerOptions={
      maximumImagesCount:1,
      quality:50,
      outputType:1

    };
  this.imagePicker.getPictures(opciones).then((results) => {

    for(let img of results)
      {
        this.imgPreview='data:image/jpeg;base64,' + img;
        this.img=img;
        break;
      }
 
}, (err) => {
  this.mostrarMensaje("Error a seleccionar imagen "+err);
 });
}

crearPost(){
let archivo={'titulo':this.titulo,
'img':this.img};
let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
this._cas.cargar_Imagenes_firebase(archivo).then(()=>{
  loader.dismiss();
  this.cerrar_modal();
},(error)=>{loader.dismiss();
this.mostrarMensaje("Error al cargar la imagen");});
}
}
