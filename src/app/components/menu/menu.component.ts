import { Component, OnInit } from '@angular/core';
import { CbirService } from '../../services/cbir.service';
import Swal from 'sweetalert2';

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

  animal: String = "";
  animal1: String = "";
  animal2: String = "";
  animal3: String = "";
  animal4: String = "";
  animal5: String = "";

  constructor(private cbirService: CbirService) { }

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

  public cbir(): void{

    if(this.imagenIngresada != null){

      this.imagen3 = this.imagenIngresada;
      this.animal1 = "halcon peregrino";
      this.animal5 = "halcon peregrino";
      this.cbirService.postImage(this.imagenIngresada).subscribe(
        (data) => {
          //nombres
          this.animal = data.nombreAve;
          this.animal1 = data.imagen[0].nombreArchivo;
          this.animal2 = data.imagen[1].nombreArchivo;
          this.animal3 = data.imagen[2].nombreArchivo;
          this.animal4 = data.imagen[3].nombreArchivo;
          this.animal5 = data.imagen[4].nombreArchivo;
  
          //nombres
          this.imagen1 = data.imagen[0].imagen;
          this.imagen2 = data.imagen[1].imagen;
          this.imagen3 = data.imagen[2].imagen;
          this.imagen4 = data.imagen[3].imagen;
          this.imagen5 = data.imagen[4].imagen;
        }
      )
  
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ninguna imagen'
      });
    }
  }

}

