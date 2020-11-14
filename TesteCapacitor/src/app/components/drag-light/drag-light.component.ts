import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-drag-light',
  templateUrl: './drag-light.component.html',
  styleUrls: ['./drag-light.component.scss'],
})
export class DragLightComponent implements OnInit {
  @Input() height;
  @Input() width;


  ngOnInit() {

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //console.log(this.height + " "+ this.width)
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes)
    let currentW: number = changes.width.currentValue;
    let previousW: number = changes.width.previousValue;
    let currentH: number = changes.height.currentValue;
    let previousH: number = changes.height.previousValue;
    if (currentH != previousH || currentW != previousW) {
      let cardColor = document.getElementById("card-color");
      cardColor.style.width = currentW+"px";
      cardColor.style.height = currentH+"px";

     }


  }

}
