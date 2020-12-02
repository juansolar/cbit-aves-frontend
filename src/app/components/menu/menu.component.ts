import { Component, OnInit } from '@angular/core';

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
  imagen: ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }

  public imagenSeleccionada(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      // this.file = <File>event.target.files[0];
      const reader = new FileReader();

    }
  }

}
