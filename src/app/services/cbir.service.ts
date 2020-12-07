import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { imagen } from '../models/imagen';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CbirService {

  json: imagen = {

    nombreAve: "aguila",
    imagen: [
      {
        imagen: "imagen1",
        nombreArchivo: "archivo1"
      },
      {
        imagen: "imagen2",
        nombreArchivo: "archivo2"
      },
      {
        imagen: "imagen3",
        nombreArchivo: "archivo3"
      },
      {
        imagen: "imagen4",
        nombreArchivo: "archivo4"
      },
      {
        imagen: "imagen5",
        nombreArchivo: "archivo5"
      }
    ]
  }

  private url: String = "http://127.0.0.1:5002/buscarImagen";
  public data: any;

  constructor(private _http: HttpClient) { }

  async postImage(imagen: String | ArrayBuffer){
    return this._http.post<any>("http://127.0.0.1:5002/buscarImagen", {
      "base64img": imagen,
    },
    {headers: {'Content-Type': 'application/json',}}
    ).toPromise()
  }

}
