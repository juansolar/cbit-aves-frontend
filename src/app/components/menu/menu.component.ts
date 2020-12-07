import { Component, OnInit } from '@angular/core';
import { CbirService } from '../../services/cbir.service';
import {grupo } from '../../models/imagen'
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  file: File;
  imagenIngresada: String | ArrayBuffer;
  imagen1: String | ArrayBuffer;
  imagen2: String | ArrayBuffer;
  imagen3: String | ArrayBuffer;
  imagen4: String | ArrayBuffer;
  imagen5: String | ArrayBuffer;

  animal: grupo[] = [];
  existeImagenes: boolean = false;

  img1: String = "";
  img2: String = "";
  img3: String = "";
  img4: String = "";
  img5: String = "";

  constructor(private cbirService: CbirService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  public imagenSeleccionada(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagenIngresada = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  async cbir(){

    if(this.imagenIngresada != null){
      this.animal = [];
      this.spinner.show()
      setTimeout( () =>{
        this.spinner.hide();
      }, 15000);
      console.log(this.existeImagenes)
      const a = await this.cbirService.postImage(this.imagenIngresada);
      this.existeImagenes = true;
      console.log(a);

      this.img1 = a.topImagenes[0].nombreGrupo + "/" +  a.topImagenes[0].nombreImagen;
      this.img2 = a.topImagenes[1].nombreGrupo + "/" +  a.topImagenes[1].nombreImagen;
      this.img3 = a.topImagenes[2].nombreGrupo + "/" +  a.topImagenes[2].nombreImagen;
      this.img4 = a.topImagenes[3].nombreGrupo + "/" +  a.topImagenes[3].nombreImagen;
      this.img5 = a.topImagenes[4].nombreGrupo + "/" +  a.topImagenes[4].nombreImagen;

      for(var i = 0; i < 5; i++){
        var nombreGrupo = a.topGrupos[i].nombreGrupo.split(".");
        this.animal.push({
          posicion: (i+1),
          nombre: nombreGrupo[1],
          ocurrencias: a.topGrupos[i].numeroOcurrencias
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ninguna imagen'
      });
    }
  }

}

