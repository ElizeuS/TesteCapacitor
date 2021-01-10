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
      this.minimoR = Math.round(this.minimoHunter(dadosAIM));
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = Math.round(this.minimoHunter(dadosAIMG));
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = Math.round(this.minimoHunter(dadosAIMB));
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    } else if (choise == 2) {
      this.minimoR = Math.round(this.minimoPolinomial(dadosAIM));
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = Math.round(this.minimoPolinomial(dadosAIMG));
      this._indicesMinimoR.push(parseFloat(this.minimoG));

      this.minimoB = Math.round(this.minimoPolinomial(dadosAIMB));
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);


    } else if (choise == 3) {
      //IMPLEMENTAR O MÉTODO DO CENTROID
      this.minimoR = Math.round(this.centroide(dadosAIM, this.baseline));
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = Math.round(this.centroide(dadosAIM, this.baseline));
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = Math.round(this.centroide(dadosAIM, this.baseline));
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    } else {
      this.minimoR = Math.round(this.minimoHunter(dadosAIM));
      this._indicesMinimoR.push(parseFloat(this.minimoR));

      this.minimoG = Math.round(this.minimoHunter(dadosAIMG));
      this._indicesMinimoG.push(parseFloat(this.minimoG));

      this.minimoB = Math.round(this.minimoHunter(dadosAIMB));
      this._indicesMinimoB.push(parseFloat(this.minimoB));

      this.calculateAsymmetryWidth(this.minimoR, dadosAIM);

    }

  }

  getClCr(dataAIM) {
    let max = Math.max.apply(Math, dataAIM);
    let min = Math.min.apply(Math, dataAIM);

    let teta_medio = (max + min) / 2;

    let aux = 0;
    let CL = 0;
    let CR = 0;
    let posCR = 0;
    let posCL = 0;
    for (let k = 0; k < dataAIM.length; k++) {
      if (dataAIM[k] <= teta_medio) {
        if (aux == 0) {
          CR = dataAIM[k];
          posCR = k;
          aux++;
        } else {
          CL = dataAIM[k];
          posCL = k;
        }
      }
    }
    return {
      "valorCR": CR,
      "valorCL": CL,
      "posCR": posCR,
      "posCL": posCL
    };
  }

  calculateAsymmetryWidth( currentMinimun, dataAIM ) {
    let centroid = this.getClCr(dataAIM);

    this.largura = parseFloat("" + (centroid.valorCL + centroid.valorCR).toFixed(4));
    this.assimetria = parseFloat("" + (centroid.valorCL / centroid.valorCR).toFixed(4));

    this.indicesAssimetry.push(this.assimetria);
    this.indicesWidth.push(this.largura);
  }

  centroide(data:[number], baseLine: number) {
    let centroid = this.getClCr(data);

    let valuesI: number = 0;
    let valuesII: number = 0;

    //let array = data.slice(posCR, posCL + 1);

    for (let pos = centroid.posCR; pos < centroid.posCL + 1; pos++) {

      valuesI = valuesI + ((data[pos] - baseLine) * (pos+1));

      valuesII = valuesII + (data[pos] - baseLine);
    }

    let cent: number = valuesI / valuesII;
    return Math.round(cent)
  };

  //Método de caça ao mínimo (Min Hunter)
  minimoHunter(dataAIM:[number]) {
    let valueMin = Math.min.apply(Math, dataAIM);
    let posMin = dataAIM.indexOf(valueMin);

    return posMin;
  }

  //Método de mínimo por Regressão Polinomial
  minimoPolinomial(dadosAIM) {

    const degree = 2; // setup the maximum degree of the polynomial
    let x = [];
    for (let i = 0; i < dadosAIM.length; i++) {
      x[i] = i
    }
    const regression = new PolynomialRegression(x, dadosAIM, degree);
    const a = regression.coefficients[2];
    const b = regression.coefficients[1];
    const c = regression.coefficients[0];
    let regressionMin = (-b / (2 * a));

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