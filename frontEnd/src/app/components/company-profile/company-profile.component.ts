import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarketDataService } from 'src/app/services/market-data.service';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
export class news {
  title: string = '';
  body: string = '';
}
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})

export class CompanyProfileComponent implements OnInit, OnChanges {
  isAuthenticated: boolean = false;
  password: string = '';
  public lineGraph: Partial<ChartOptions> | any;
  public pieChart: Partial<ChartOptions> | any;
  public pieChart2: Partial<ChartOptions> | any;
  public pieChart3: Partial<ChartOptions> | any;
  y: number[] = Array(3).fill(0);
  dtOptions: DataTables.Settings = {};
  newsData: news[] = [];
  code: string = '';
  financialData: any;
  basicData: any;
  graphdata: any;
  graphdata2: any;
  graphdata1: any;
  trading_code: string = '';
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  dateString: string = '';
  myForm!: FormGroup;



  constructor(private MarketDataService: MarketDataService,
    private TecIndSer: TechnicalIndicatorsService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient,) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.showData();
    this.renderPieChart();
    this.renderPieChart2();
    this.renderDataTable();
    this.receiveNews();
    this.renderPriceGraph();
  }

  ngOnInit(): void {
    this.setYear();
    console.log(this.dateString);
    this.route.params.subscribe((params) => {
      this.code = this.route.snapshot.params['code'];
    });
    
    this.showData();
    this.renderPriceGraph();
    this.renderPieChart();
    this.renderPieChart3();
    this.renderPieChart2();
    
    this.receiveNews();

  }
  setYear() {
    let currentYear = this.currentDate.getFullYear();
    this.currentDate.setFullYear(currentYear - 1);
    const year = this.currentDate.getFullYear();
    const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + this.currentDate.getDate()).slice(-2);
    this.dateString = `${year}-${month}-${day}`;
  }

  showGraph() {
    const currentUrl = this.location.path();
    this.router.navigate([currentUrl, 'graph']);
  }

  getData(): Observable<any> {
    return this.MarketDataService.getProfile(this.code);
  }

  getData1(): Observable<any> {
    return this.MarketDataService.getBullBear(this.code);
  }

  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getMarketData();
  }

  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();
  }

  receiveNews(): void {  
    this.newsService.getCompanyNews(this.code).subscribe((data)=>{
          this.newsData = data['news'];
          console.log(this.newsData);       
        });
  }



  showData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getData().subscribe({
        next: (res) => {
          this.basicData = res;
          resolve();
        },
        error: (e) => {
          console.error(e);
          resolve(); // Resolve even if there's an error
        }
      });
    });
  }



  receivePrice(): Observable<any> {
    return this.MarketDataService.getPrice(this.code, this.dateString);
  }


  renderPriceGraph(): void {
    this.receivePrice().subscribe((data1) => {
      const date = data1['date'];
      const open = data1['open'];
      const high = data1['high'];
      const low = data1['low'];
      const close = data1['close'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          open: open[i],
          high: high[i],
          low: low[i],
          close: close[i]
        };
        data.push(item);
      }
      this.lineGraph = {
        chart: {
          type: 'candlestick',
          height: '250%',
          width: '100%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          data: data.map(item => ({
            x: item.date,
            y: [item.open, item.high, item.low, item.close]
          }))
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis:
        {
          labels: {
            formatter: function (value: number) {
              return value.toFixed(2);
            }
          }
        },
      };
      this.lineGraph.render();
    })
  }


  renderPieChart(): void {
    this.getData().subscribe((data) => {
      const categories = ['Institute', 'Foreign', 'Public', 'Govt', 'SponsorDirector'];
      this.graphdata = data;
      this.pieChart = {
        chart: {
          type: 'pie',
          width: '55%',
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#255aee',

          }
        },
        series: [this.graphdata.Institute, this.graphdata.Foreign, this.graphdata.Public, this.graphdata.Govt, this.graphdata.SponsorDirector],
        labels: categories,
      };

      this.pieChart.render();
    },
    );
  }


  renderPieChart3(): void {
    this.getData1().subscribe((data) => {
      const categories = ['Bull', 'Bear', 'Neutral'];
      this.graphdata1 = data;
      this.pieChart3 = {
        chart: {
          type: 'pie',
          width: '50%',
        },
        theme: {
          palette: 'palette1' // upto palette10
        },

        series: [this.graphdata1.bull, this.graphdata1.bear, this.graphdata1.neutral],
        labels: categories,
      };
      this.pieChart3.render();
    },
    );
  }


  renderPieChart2(): void {
    this.getData().subscribe((data) => {
      const categories = ['Authorized Capital: ' + this.graphdata.AuthorizedCap, 'Paid Up Capital: ' + this.graphdata.PaidUpCap];

      this.graphdata2 = data;

      this.pieChart2 = {
        chart: {
          type: 'pie',
          width: '65%',

        },
        theme: {
          palette: 'palette4' // upto palette10
        },


        series: [this.graphdata.AuthorizedCap, this.graphdata.PaidUpCap],
        labels: categories,
      };
      this.pieChart2.render();
    }
    );
  }


}
