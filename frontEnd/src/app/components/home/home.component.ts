import { Component, Input, OnInit } from '@angular/core';
import { MarketDataService } from 'src/app/services/market-data.service';
import { company } from 'src/app/services/market-data.service';
import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
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
import { Router } from '@angular/router';


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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dataAvail = true;
  public spinner: boolean = true;
  y: number[] = Array(3).fill(0);

  public search: string = '';
  public lineGraph: Partial<ChartOptions> | any;
  public lineGraph2: Partial<ChartOptions> | any;
  public lineGraph3: Partial<ChartOptions> | any;
  public pieChart: Partial<ChartOptions> | any;
  public barGraph: Partial<ChartOptions> | any;

  constructor(private http:HttpClient,private MarketDataService: MarketDataService, private router: Router) { }


  ngOnInit(): void {
    // window.location.reload();
    this.renderDataTable();
    this.receiveMarketData().subscribe((data) => {
      
      data = data.filter(function (dat: any) {
        return dat.trading_code != '';
      });
      this.spinner = false;
      this.dtOptions.data = data;
      this.dataAvail = true;
    });
   
    this.renderIndiceGraph("dsex");
    this.renderIndiceGraph2("dses");
    this.renderIndiceGraph3("ds30");
    this.renderPieChart();
    this.renderSectorGraph();

  }

  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getMarketData();
  }

  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();

  }
  receiveSectors(): Observable<any> {
    return this.MarketDataService.getSectorWiseData();

  }
  someClickHandler(info: any): void {
    //console.log(info.ltp);
    this.router.navigate(["companyProfile/" + info.trading_code]);
  }


  renderDataTable(): void {
    this.dtOptions = {
      lengthChange: false,
      language: {
        paginate: { next: '>', last: 'Last', first: 'First', previous: '<' },
        searchPlaceholder: "Search...",
        search: ""
      },
       pageLength: 20,
      columnDefs: [
        { width: '30em', targets: [0, 1, 2, 3, 4] },
        { name: 'some name', targets: 0 },
        { orderable: true, targets: [0, 1] },
      ],

      columns: [
        {
          title: 'CODE', data: 'trading_code',
          render: function (data, type, row) {
            row.trading_code = row.trading_code.replace(/ /g, '-');
            if (type === 'display') {
              if (row.change < 0) {
                data =
                  '<a style="color:red;" href="company/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              } else if (row.change == 0) {
                data =
                  '<a style="color:#2a76e8;" href="company/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              } else {
                data =
                  '<a style="color:green;" href="company/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              }
            }

            return data;
          },
        },
        { title: 'LTP', data: 'ltp' },
        { title: 'CLOSEP', data: 'closep' },
        { title: 'CHANGE', data: 'change',
          render: function (data, type, row) {
            if (type === 'display') {
              if (row.change < 0) {
                data = '<span style="color:red;">' + data + '</span>';
              } else if (row.change == 0) {
                data = '<span style="color:#2a76e8;">' + data + '</span>';
              } else {
                data = '<span style="color:green;">' + data + '</span>';
              }
            }

            return data;
          },
        },
        { title: 'YCP', data: 'ycp' },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;

        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
      
        return row;
      }
    }
  }

  renderIndiceGraph(index: string): void {
    this.receiveDseIndices().subscribe((data1) => {
      const data2 = data1[index];
      const data = Object.entries(data2).map(([x, y]) => ({ x: parseInt(x), y: y }));

      this.lineGraph = {
        chart: {
          type: 'area',
          height: '140%',
          width: '100%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
     
        series: [{
          name: 'Index',
          data: data,
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'h:mm',
          }
        },
        yaxis: {
          decimalsInFloat: 2, // Display two decimal places
        },
        stroke: {
          width: 1.5,
          
        },
        
        dataLabels: {
          enabled: false 
        },
        

      };
      this.lineGraph.render();

    })
  }

  renderIndiceGraph2(index: string): void {

    this.receiveDseIndices().subscribe((data1) => {
      const data2 = data1[index];
      const data = Object.entries(data2).map(([x, y]) => ({ x: parseInt(x), y: y }));
      this.lineGraph2 = {
        chart: {
          type: 'area',
          height: '140%',
          width: '100%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'Index',
          data: data,
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'h:mm',
          }
        },
        yaxis: {
          decimalsInFloat: 2, // Display two decimal places
        },
      };
      this.lineGraph.render();
    })
  }

  renderIndiceGraph3(index: string): void {


    this.receiveDseIndices().subscribe((data1) => {
      const data2 = data1[index]

      const data = Object.entries(data2).map(([x, y]) => ({ x: parseInt(x), y: y }));

      this.lineGraph3 = {
        chart: {
          type: 'area',
          height: '140%',
          width: '100%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'Index',
          data: data,
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'h:mm',
          }
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return value.toFixed(2);
            }
          }
        },
      };
      this.lineGraph.render();

    })
  }

  renderPieChart(): void {
    this.receiveMarketData().subscribe((data: company[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].change > 0) {
          this.y[0]++;
        }
        else if (data[i].change < 0) {
          this.y[1]++;
        }
        else { this.y[2]++; }
      }

      const categories = ['Gainers', 'Losers', 'Neutral'];
      const colours = ['#0B6623', '#d32f2f', '#00008B'];
      console.log(this.y);
      this.pieChart = {
        chart: {
          type: 'donut',
          height: '180%',
          width: '100%',
        },
        series: this.y,
        labels: categories,
        colors: colours
      };
    })
  }

  renderSectorGraph(): void {
    this.receiveSectors().subscribe((data1) => {


      this.barGraph = {
        series: [{
          name: 'Gainer',
          data: data1["Winner"],
          color: '#0B6623',

        }, {
          name: 'Loser',
          data: data1["Loser"],
          color: '#d32f2f',

        }, {
          name: 'Neutral',
          data: data1["Neutral"],
          color: '#00008B',


        }],
        chart: {
          type: 'bar',
          height: 500,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,

                },
              },
            },

          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },

        xaxis: {
          categories: data1["Category"],


        },
        fill: {
          opacity: 1,
          colors: ['#0B6623', '#d32f2f', '#00008B']// set colors for each series,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      };
      this.barGraph.render();
    })
  }
}