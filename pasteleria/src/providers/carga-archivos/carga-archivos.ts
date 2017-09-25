import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase";

import { ToastController,Platform } from "ionic-angular";

/*
  Generated class for the CargaArchivosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaArchivosService {

  private carpeta_imagenes="img";//esta carpeta se encuentra en firebase en el storage
  private POSTS:string="posts";


  imagenes:any[]=[];
  lastkey:string=undefined;
  constructor(private af:AngularFireDatabase,public toastCtrl: ToastController) {
  }
  // Este metodo hace magia 
cargar_Imagenes_firebase(archivo:any)
{
  let promesa= new Promise((resolve,reject)=>{

    this.mostrar_Texto("Inicio de carga de la imagen");

    let storageRef=firebase.storage().ref();
    let nombreArchivo= new Date().valueOf();

    let uploadTask:firebase.storage.UploadTask= storageRef.child(`${this.carpeta_imagenes}/${nombreArchivo}`).putString(archivo.img,'base64',{contentType:'image/jpeg'});

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{}//Saber el avance de los archivos
  ,(error)=>{

    this.mostrar_Texto("Error al cargar "+JSON.stringify(error));
    reject(error);
  },()=>// termino la carga
  {
    let url =uploadTask.snapshot.downloadURL;
    this.mostrar_Texto("Imagen cargada exitosamente");
    this.crear_Post(archivo.titulo,url);
    resolve();
  });
  });
  return promesa;
}

private crear_Post(titulo:string,url:string)
{
  let post:archivoSubir={img:url,titulo:titulo};

  let $key =this.af.list(`/${this.POSTS}`).push(post).key;
  post.$key=$key;
  this.imagenes.push(post);
}
private mostrar_Texto(mensaje:string)
{

  let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
}
  // este metodo se trae los posts de firebase de 5 en 5, para cuando se hace el scroll lo cargue de esa manera
cargar_Imagenes()
{
  return new Promise((resolve,reject)=>{
    this.af.list('/posts',{
      query:{
        limitToLast:5,
        orderByKey:true,
        endAt:this.lastkey
      }
    }).subscribe(posts=>{
      if(this.lastkey)
        {
          posts.pop();// eliminar un elemento que es el que se va a repetir
        }
        if(posts.length==0)
          {
            console.log("Ya no existen registros");
            resolve(false);
            return;
          }
          this.lastkey=posts[0].$key;

          for(let i=posts.length-1; i>=0; i--)
            {
              let post=posts[i];
              this.imagenes.push(post);
            }
            resolve(true);
    });
  })
}
}

interface archivoSubir{
  $key?:string;
  img:string;
  titulo:string;
}
