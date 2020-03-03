//importScripts('marvin.js');
var outImage;
var inImage;
self.onmessage = function (event) {
    //console.log("event.data.arr.__zone_symbol__value", event.data.arr.__zone_symbol__value);
    //console.log("ARR: ", event.data.arr)
    let arr;
    let dryArr;
    //console.log("WorkerDry: ", event.data.dry.__zone_symbol__value);
    try {
        arr = event.data.arr.__zone_symbol__value;
        dryArr = event.data.dry.__zone_symbol__value;
        //pega os valores do array atual
        // let somaAtt = self.calculaSomaArray(arr);
        // let somaDry = self.calculaSomaArray(dryArr);
        // let mediaDry = self.calculaMediaArray(somaDry);
        // let mediaArr = self.calculaMediaArray(somaAtt);
        let dataAim = self.calculaMediaArray(arr, dryArr);
       // console.log(dataAim[0]);
        let curvaAim = self.calculaSpr(dataAim[0], dataAim[1]);
        //console.log("MEDIA SPR ", self.calculaSpr(mediaArr, mediaDry));
        //let aimSpr = self.calculaSpr(att, dry);
        self.postMessage({dadosCurva: curvaAim});
    } catch (error) {
        console.log(error);
    }

};

self.calculaMediaArray = function (arr, dryArr) {
    let somaArr = [];
    let somaDry = [];
    let mediaArr = [];
    let mediaDry = [];
    console.log(arr[1].length);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (somaArr[i] == null || somaDry[i] == null) {
                somaArr.push(arr[i][j]);
                somaDry.push(dryArr[i][j]);
            } else {
                //_soma[j] = _soma[j] + image.getIntComponent0(i, j);
                somaArr[i] = somaArr[i] + arr[i][j];
                somaDry[i] = somaDry[i] + dryArr[i][j];
            }

        }
        mediaArr[i] = somaArr[i] / (somaArr.length + 1);
        mediaDry[i] = somaDry[i] / (somaDry.length + 1);
    }
    //console.log(mediaDry);
    let calc = [mediaArr, mediaDry];
    return calc;
}

self.calculaSpr = function (arrAtt, arrRef) {
    //console.log(arrAtt);
    let aim = [];
    for (let i = 0; i < arrAtt.length; i++) {
        aim[i] = arrAtt[i] / arrRef[i];
    }
    //console.log("aim, ", aim);
    return aim;
}


// self.calculaSomaArray = function (arr) {
//     let soma = [];
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr[i].length; j++) {
//             if (soma[i] == null) {
//                 soma.push(arr[i][j]);
//             } else {
//                 //_soma[j] = _soma[j] + image.getIntComponent0(i, j);
//                 soma[i] = soma[i] + arr[i][j];
//                 //console.log("soma ", soma);
//             }
//         }
//     }
//     return soma;

// }

// self.calculaMediaArray = function (soma) {
//     let media = [];
//     for (let i = 0; i < soma.length; i++) {
//         media[i] = (soma[i] / (parseInt(soma.length + 1)));
//     }
//     //console.log("media ", media);
//     return media;
// }



// self.dadosAIM = function (atual, dry) {
//     let dados = [];
//     for (let i = 0; i < atual.length; i++) {
//         dados.push(atual[i] / dry[i]);
//     }
//     return dados;
// }

// self.media = function (soma, tamanho) {
//     let media = [];
//     for (let i = 0; i < _soma.length; i++) {
//         media[i] = (soma[i] / (parseInt(tamanho + 1)));
//         //alterei de getWidth() pra pois a lógica está errada getHeight()
//     }
//     //const res = self.dadosAIM(media);
//     //this.postMessage(res);

//     return media;
// }

// self.calculaSoma = function (image) {
//     let soma = [];
//     for (let i = 0; i < image.getWidth(); i++) {
//         for (let j = 0; j < image.getHeight(); j++) {

//             if (soma[i] == null) {
//                 soma.push(image.getIntComponent0(i, j));
//             } else {
//                 //_soma[j] = _soma[j] + image.getIntComponent0(i, j);
//                 soma[i] = soma[i] + image.getIntComponent0(i, j);
//             }

//         }
//     }
//     let result = self.media(soma, image.getWidth());

//     return result;

// }



