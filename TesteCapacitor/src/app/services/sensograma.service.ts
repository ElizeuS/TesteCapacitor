import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SensogramaService {
  private _minHunterX;
  
  private _indicesMinHunter = [];
  
  constructor() { }

  minimoHunter(dadosAIM) {
    let minHunX;
    let min = 255.0;
    for (let i=0; i < dadosAIM.length; i++) {
      if (min > dadosAIM[i]) {
        min = dadosAIM[i];
        minHunX = i;
      }
    }
    this._minHunterX = minHunX; //Pega os valores do minimo no eixo X
    this._indicesMinHunter.push(this._minHunterX);
    
  }


  public get indicesMinHunter() {
    return this._indicesMinHunter;
  }
  public set indicesMinHunter(value) {
    this._indicesMinHunter = value;
  }
  public get minHunterX() {
    return this._minHunterX;
  }
  public set minHunterX(value) {
    this._minHunterX = value;
  }
}