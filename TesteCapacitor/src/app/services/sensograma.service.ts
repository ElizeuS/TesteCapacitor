import { Injectable } from '@angular/core';
import PolynomialRegression from 'ml-regression-polynomial';

@Injectable({
  providedIn: 'root'
})
export class SensogramaService {
  private _minimoR;

  private _minimoG;

  private _minimoB;

  largura: number;
  assimetria: number;

  posCL: number = 0;
  posCR: number = 0;
  baseline: number = 0;

  indicesAssimetry: number[] = [];
  indicesWidth: number[] = []

  private _indicesMinimoR = [];
  private _indicesMinimoG = [];
  private _indicesMinimoB = [];



  constructor() { }


  //este método define qual o método de mínimo será aplicado 1, 2, 3][Hunter, Polinomyal, Centroid]
  async  calculaMin(choise, dadosAIM, dadosAIMG, dadosAIMB) {

    if (choise == 1) {
      this.minimoR = this.minimoHunter(dadosAIM).toFixed(3);
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = this.minimoHunter(dadosAIMG).toFixed(3);
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = this.minimoHunter(dadosAIMB).toFixed(3);
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    } else if (choise == 2) {
      this.minimoR = this.minimoPolinomial(dadosAIM).toFixed(3);
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = this.minimoPolinomial(dadosAIMG).toFixed(3);
      this._indicesMinimoR.push(parseFloat(this.minimoG));

      this.minimoB = this.minimoPolinomial(dadosAIMB).toFixed(3);
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);


    } else if (choise == 3) {
      //IMPLEMENTAR O MÉTODO DO CENTROID
      this.minimoR = this.centroide(dadosAIM, this.baseline, this.posCR, this.posCL).toFixed(3);
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = this.centroide(dadosAIM, this.baseline, this.posCR, this.posCL).toFixed(3);
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = this.centroide(dadosAIM, this.baseline, this.posCR, this.posCL).toFixed(3);
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    } else {
      this.minimoR = this.minimoHunter(dadosAIM).toFixed(3);
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = this.minimoHunter(dadosAIMG).toFixed(3);
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = this.minimoHunter(dadosAIMB).toFixed(3);
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    }

  }

  calculateAsymmetryWidth( currentMinimun, dataAIM ) {
    let max = Math.max.apply(Math, dataAIM);
    let min = Math.min.apply(Math, dataAIM);

    let teta_medio = (max + min) / 2;

    let aux = 0;
    let valorCL = 0;
    let valorCR = 0;
    let posCR = 0;
    let posCL = 0;
    for (let k = 0; k < dataAIM.length; k++) {
      if (dataAIM[k] <= teta_medio) {
        if (aux == 0) {
          valorCR = dataAIM[k];
          posCR = k;
          aux++;
        } else {
          valorCL = dataAIM[k];
          posCL = k;
        }
      }
    }

  this.largura = parseFloat("" + (valorCL + valorCR).toFixed(4));
  this.assimetria = parseFloat("" + (valorCL / valorCR).toFixed(4));
  this.posCR = posCR;
  this.posCL = posCL;

  this.indicesAssimetry.push(this.assimetria);
  this.indicesWidth.push(this.largura);
  }

  centroide(data:[number], baseLine: number, posCR: number, posCL: number) {

    let valuesI: number = 0;
    let valuesII: number = 0;

    //let array = data.slice(posCR, posCL + 1);

    for (let pos = posCR; pos < posCL + 1; pos++) {

      valuesI = valuesI + ((data[pos] - baseLine) * (pos+1));

      valuesII = valuesII + (data[pos] - baseLine);
    }

    let cent: number = valuesI / valuesII;
    return Math.round(cent)
  };

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

    return minHunX;

  }

  //Método de mínimo por Regressão Polinomial
  minimoPolinomial(dadosAIM) {

    const degree = 2; // setup the maximum degree of the polynomial
    let x = [];
    for (let i = 0; i < dadosAIM.length; i++) {
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



    return regressionMin;

  }


  public get minimoR() {
    return this._minimoR;
  }
  public set minimoR(value) {
    this._minimoR = value;
  }
  public get minimoG() {
    return this._minimoG;
  }
  public set minimoG(value) {
    this._minimoG = value;
  }

  public get minimoB() {
    return this._minimoB;
  }
  public set minimoB(value) {
    this._minimoB = value;
  }

  public get indicesMinimoR() {
    return this._indicesMinimoR;
  }
  public set indicesMinimoR(value) {
    this._indicesMinimoR = value;
  }
  public get indicesMinimoG() {
    return this._indicesMinimoG;
  }
  public set indicesMinimoG(value) {
    this._indicesMinimoG = value;
  }

  public get indicesMinimoB() {
    return this._indicesMinimoB;
  }
  public set indicesMinimoB(value) {
    this._indicesMinimoB = value;
  }

}