import * as HighCharts from 'highcharts';

declare var require: any;
let hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

export const getHighChartData = {

    chart: {
        type: 'scatter',
        zoomType: 'xy',
        width: 350,
        height: 300,
        backgroundColor: "black"
    },
    title: {
        text: 'AIM Curve',
        style: { "color": "#ffffff" }
    },
    xAxis: {
        title: {
            text: "Pixel",
            style: { "color": "#ffffff" }
        },
    },
    yAxis: {
        title: {
            text: "Reflexivity",
            style: { "color": "#ffffff" },
        },
        max: 1.2,
        min: 0

    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: 'x: {point.x:.2f}<br/>y: {point.y:.4f}'
    },
    legend: {
        enabled: true,

    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            color: 'rgba(255, 0, 0, .6)',
            showInLegend: true,
        }
    },
    exporting: {
        enabled: true,
        csv: {
            itemDelimiter: ' '
          }
    },
    series: [{
        name: 'Curve',
        color: 'rgba(255, 0, 0, .6)'
    },
    {
        name: 'Dry Cell',
        color: 'rgba(0,0,255, .3)',
        type: undefined,
        //data: []
    }],
    
}

export const getHighChartData2 = {
    chart: {
        type: 'spline',
        marginRight: 5,
        zoomType: 'xy',
        width: 350,
        height: 300,
        backgroundColor: 'black',
        events: {
            load: function () {

            }
        }
    },

    title: {
        text: 'Sensorgram',
        style: { "color": "#ffffff" }
    },
    xAxis: {
        title: {
            text: "Time",
            style: { "color": "#ffffff" }
        },
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Pixel',
            style: { "color": "#ffffff" }
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#ffffff'
        }]
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: 'x: {point.x:2f}<br/>y: {point.y:.4f}'
    },
    legend: {
        enabled: true,
        color: 'rgba(250, 255, 250, 1)',
    },
    exporting: {
        enabled: true,
        csv: {
            itemDelimiter: ';'
          }
    },
    series: [{
        name: 'Min',
        color: 'rgba(255, 0, 0, .6)',
        type: undefined,
        //data: []
    }/*, {
        name: 'Assimetry',
        color: 'rgba(240, 255, 0, 1)',
        data: []
    },{
        name: 'Width',
        color: 'rgba(154, 18, 179, 1)',
        data: [ ]
    }*/]
};



