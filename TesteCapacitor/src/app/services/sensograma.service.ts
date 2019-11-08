import { Injectable } from '@angular/core';
import PolynomialRegression from 'ml-regression-polynomial';

@Injectable({
  providedIn: 'root'
})
export class SensogramaService {
  private _minimo;


  private _indicesMinimo = [];


  constructor() { }


  //este método define qual o método de mínimo será aplicado 1, 2, 3][Hunter, Polinomyal, Centroid]
  calculaMin(choise, dadosAIM){
    if(choise == 1){
      this.minimoHunter(dadosAIM);
    } else if(choise == 2){
      this.minimoPolinomial(dadosAIM);
    } else if(choise == 3){

    } else{
      this.minimoHunter(dadosAIM);
    }
  }


  //Método de caça ao mínimo (Min Hunter)
  minimoHunter(dadosAIM) {
    let minHunX;
    let min = 255.0;
    for (let i = 0; i < dadosAIM.length; i++) {
      if (min > dadosAIM[i]) {
        min = dadosAIM[i];
        minHunX = i;
      }
    }
  

    this._minimo = minHunX; //Pega os valores do minimo no eixo X
    this._indicesMinimo.push(parseFloat(this._minimo));

  }

  //Método de mínimo por Regressão Polinomial
  minimoPolinomial(dadosAIM) {
  
    const degree = 2; // setup the maximum degree of the polynomial
    let x = [];
    for(let i = 0; i< dadosAIM.length; i++){
      x[i] = i
    }
    const regression = new PolynomialRegression(x, dadosAIM, degree);
    //console.log(regression.predict(41)); // Apply the model to some x value. Prints 2.6.
    //console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
   // console.log(regression.toString(3)); // Prints a human-readable version of the function.
    //console.log(regression.toLaTeX());
    //console.log(regression.score(x, y));
    //alert(3);
    const a = regression.coefficients[2];
    const b = regression.coefficients[1];
    const c = regression.coefficients[0];
    //alert(4);
    let regressionMin = (-b / (2 * a));

    console.log("Mínimo: y " + (b ^ 2 - 4 * a * c) / (-4 * a));
   // alert(regressionMin);
    //alert(5);
    this._minimo = regressionMin.toFixed(4);
    this._indicesMinimo.push(parseFloat(this._minimo)); //Pega os valores do minimo no eixo X

  }


  public get minimo() {
    return this._minimo;
  }
  public set minimo(value) {
    this._minimo = value;
  }
  public get indicesMinimo() {
    return this._indicesMinimo;
  }
  public set indicesMinimo(value) {
    this._indicesMinimo = value;
  }

}