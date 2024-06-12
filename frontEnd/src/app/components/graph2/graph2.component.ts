import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit{
  
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  dateString :string ='';
  code:string='';

  rsi: string = "The Relative Strength Index (RSI) is represented on a scale of 0 to 100, the RSI helps traders and investors assess whether an asset is overbought or oversold. Readings above 70 indicate an overbought condition, suggesting a potential downward correction, while readings below 30 indicate an oversold condition, suggesting a potential upward correction.";
  stoch: string = "The Stoch graph consists of two lines, %K and %D, which represent the current closing price relative to the high-low range over a specified period. %K reflects price momentum and %D is a smoothed version of %K. Interpreting the graph involves analyzing the positions of %K and %D. When %K crosses above %D and rises above 20, it indicates a buying opportunity. Conversely, when %K crosses below %D and falls below 80, it suggests a selling opportunity. The graph oscillates between 0 and 100, reflecting potential price movements and overbought/oversold conditions.";
  bb: string="Bollinger Bands consist of a moving average (usually 20-day) with an upper band and a lower band that represent two standard deviations from the moving average. They help identify periods of high or low volatility and potential price reversals. When the price moves near the upper band, it suggests an overbought condition and a potential bearish reversal. Conversely, when the price approaches the lower band, it indicates an oversold condition and a potential bullish reversal.";
  ema: string="Exponential Moving Average is a type of moving average that places more weight on recent price data, making it more responsive to price changes compared to Simple Moving Average (SMA). It calculates the average price over a specified period, with more weight given to recent prices. EMA is often used to identify short-term trends and generate trading signals. Traders commonly use combinations of different EMAs, such as the 9-day EMA and the 50-day EMA, to analyze price movements and identify potential entry and exit points. When the price is consistently above the moving averages, it suggests a bullish trend. Conversely, when the price consistently stays below them, it indicates a bearish trend.";
  sma: string="Simple Moving Average is a basic moving average that calculates the average price over a specific period, giving equal weight to each data point in that period. SMA is widely used to smooth out price fluctuations and identify longer-term trends. Traders often use SMA crossovers, such as the 50-day SMA crossing above or below the 200-day SMA, as signals to enter or exit trades. When the price is consistently above the moving averages, it suggests a bullish trend. Conversely, when the price consistently stays below them, it indicates a bearish trend.";
  macd: string="MACD is a trend-following momentum indicator that calculates the difference between two exponential moving averages (usually 12-day and 26-day). It also includes a signal line (typically a 9-day EMA) to generate trading signals when the MACD line crosses above or below the signal line. When the MACD line (fast line) crosses above the signal line (slow line), it generates a bullish signal. Conversely, when the MACD line crosses below the signal line, it generates a bearish signal.";


  ngOnInit(): void {
    
    this.setYear();
    console.log(this.dateString);
    this.route.params.subscribe((params) => {
      this.code = this.route.snapshot.params['code'];
    });
    this.renderIndiceGraph();
    this.renderIndiceGraph2();
    this.renderIndiceGraph6();
    this.renderIndiceGraph4();
    this.renderIndiceGraph5();
    this.renderIndiceGraph3();

  }
  public lineGraph: Partial<ChartOptions> | any;
  public lineGraph2: Partial<ChartOptions> | any;
  public lineGraph3: Partial<ChartOptions> | any;
  public lineGraph4: Partial<ChartOptions> | any;
  public lineGraph5: Partial<ChartOptions> | any;
  public lineGraph6: Partial<ChartOptions> | any;


  constructor(private TecIndSer: TechnicalIndicatorsService,
    private route: ActivatedRoute, private location: Location) { }

  setYear(){
    let currentYear = this.currentDate.getFullYear();
    this.currentDate.setFullYear(currentYear-1);
    const year =this.currentDate.getFullYear();
    const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + this.currentDate.getDate()).slice(-2);
    this.dateString = `${year}-${month}-${day}`;
  }

  goBack(): void {
    this.location.back(); // Navigate back to the previous page
  }

  receiveMACD(): Observable<any> {
    return this.TecIndSer.getMACD(this.code,this.dateString);

  }

  receiveSMA(): Observable<any> {
    return this.TecIndSer.getSMA50(this.code,this.dateString);

  }
  receiveEMA(): Observable<any> {
    return this.TecIndSer.getEMA50(this.code,this.dateString);

  }
  receiveRSI(): Observable<any> {
    return this.TecIndSer.getRSI(this.code,this.dateString);

  }
  receiveSTOCH(): Observable<any> {
    return this.TecIndSer.getSTOCH(this.code,this.dateString);

  }
  receiveBB(): Observable<any> {
    return this.TecIndSer.getBB(this.code,this.dateString);

  }

  renderIndiceGraph2(): void {
    this.receiveSTOCH().subscribe((data1) => {
      const date = data1['date'];
      const K = data1['K'];
      const D = data1['D'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          K: K[i],
          D: D[i]
        };
        data.push(item);
        
      }
      // console.log(data);
      this.lineGraph = {
        chart: {
          type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        stroke: {
          width: 2
        },
        colors: ['#0B6623', '#d32f2f', '#546E7A', '#E91E63', '#FF9800'],
        series: [
          {
            name: 'K',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.K,
            }))
          },
          {
            name: 'D',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.D,
            }))
          }
        ],
        
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis: 
          {
            labels: {
              formatter: function(value: number) {
                return value.toFixed(2);
              }
            },
            title: {
              text: 'Price',
            },
          },
      };

      this.lineGraph.render();
    });
  }

  renderIndiceGraph3(): void {
    this.receiveMACD().subscribe((data1) => {
      const date = data1['date'];
      const macd = data1['macd'];
      const signal = data1['signal'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          macd: macd[i],
          signal: signal[i]
        };
        data.push(item);
        
      }
      // console.log(data);
      this.lineGraph6 = {
        chart: {
          // type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'MACD',
            type: 'line',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.macd,
            }))
          },
          {
            name: 'signal',
            type: "bar",
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.signal,
            }))
          }
        ],
        // plotOptions: {
        //   column: {
        //     columnWidth: '1%', // Adjust the width of the columns as desired
        //   }
        // },
       
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          },
          title: {
            text: 'Price',
          },
        },
      };

      this.lineGraph6.render();
    });
  }

  renderIndiceGraph4(): void {
    this.receiveEMA().subscribe((data1) => {
      const date = data1['date'];
      const ema50 = data1['ema50'];
      const ema200 = data1['ema200'];
      // const ema20 = data1['ema20'];
      // const ema100 = data1['ema100'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          ema50: ema50[i],
          ema200: ema200[i],
          // ema20: ema20[i],
          // ema100: ema100[i]
        };
        data.push(item);
        
      }
      console.log(data);
      this.lineGraph4 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'ema50',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.ema50,
            }))
          },
          {
            name: 'ema200',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.ema200,
            }))
          },
          // {
          //   name: 'ema100',
          //   data: data.map(item => ({
          //     x: new Date(item.date),
          //     y: item.ema100,
          //   }))
          // },
          // {
          //   name: 'ema20',
          //   data: data.map(item => ({
          //     x: new Date(item.date),
          //     y: item.ema20,
          //   }))
          // }
        ],
       
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis:  {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          },
          title: {
            text: 'Price',
          },
        },
      };

      this.lineGraph4.render();
    });
  }

  renderIndiceGraph5(): void {
    this.receiveSMA().subscribe((data1) => {
      const date = data1['date'];
      const sma50 = data1['sma50'];
      const sma200 = data1['sma200'];
      // const sma20 = data1['sma20'];
      // const sma100 = data1['sma100'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          sma50: sma50[i],
          sma200: sma200[i],
          // sma20: sma20[i],
          // sma100: sma100[i]
        };
        data.push(item);
        
      }
      this.lineGraph5 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'sma50',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.sma50,
            }))
          },
          {
            name: 'sma200',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.sma200,
            }))
          },
          // {
          //   name: 'sma20',
          //   data: data.map(item => ({
          //     x: new Date(item.date),
          //     y: item.sma20,
          //   }))
          // },
          // {
          //   name: 'sma100',
          //   data: data.map(item => ({
          //     x: new Date(item.date),
          //     y: item.sma100,
          //   }))
          // },
          
          
        ],
       
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          },
          title: {
            text: 'Price',
          },
        },
      };

      this.lineGraph5.render();
    });
  }
  
  renderIndiceGraph(): void {

    this.receiveRSI().subscribe((data1) => {
      const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));
      console.log(data);
      this.lineGraph2 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'RSI',
          data: data,
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          },
          title: {
            text: 'Price',
          },
        },
      };
      this.lineGraph2.render();
    });
  }


  renderIndiceGraph6(): void {
    this.receiveBB().subscribe((data1) => {
      const date = data1['date'];
      const upper = data1['Upper'];
      const middle = data1['Middle'];
      const lower=data1['Lower'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          U: upper[i],
          M: middle[i],
          L: lower[i]
        };
        data.push(item);
      }
      this.lineGraph3 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '95%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'Upper',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.U,
            }))
          },
          {
            name: 'Middle',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.M,
            }))
          },
          {
            name: 'Lower',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.L,
            }))
          }
        ],
        
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          },
          title: {
            text: 'Price',
          },
        },
      };

      this.lineGraph3.render();
    });
  }

}