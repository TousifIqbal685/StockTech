import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const baseUrl  = `${environment.apiUrl}/marketData/`;
const baseUrl1 = `${environment.apiUrl}/indices/`;
const baseUrl2 = `${environment.apiUrl}/sectorwise/`;
const baseUrl3 = `${environment.apiUrl}/companyprofile`;
const baseUrl5 = `${environment.apiUrl}/price`;
const baseUrl6 = `${environment.apiUrl}/bullbear`;




export class company {
  trading_code: string;
  full_name: string;
  ltp: number;
  closep: number;
  change: number;
  ycp: number;

  constructor() {
    this.trading_code = '';
    this.ltp = 0;
    this.closep = 0;
    this.change = 0;
    this.ycp = 0;
    this.full_name = '';
  }
}

export class sector {
  category: string[];
  value: number[];
  yvalue: number[];
  volume: number[];
  gainer: number[];
  loser: number[];
  neutral: number[];
  total: number[];

  constructor() {
    this.category = [];
    this.value = [];
    this.yvalue = [];
    this.volume = [];
    this.gainer = [];
    this.loser = [];
    this.neutral = [];
    this.total = [];
  }
}


export class index {
  dsex: string;
  dses: string;
  ds30: string;

  constructor() {
    this.dsex = '';
    this.dses = '';
    this.ds30 = '';
  }
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  

  constructor(private http: HttpClient) { }

  getMarketData(): Observable<company[]> {
    return this.http.get<company[]>(baseUrl);
  }
  
  getSectorWiseData(): Observable<sector> {
    return this.http.get<sector>(baseUrl2);
  }

  getIndices(): Observable<index> {
    return this.http.get<index>(baseUrl1);
  }

  
  getProfile(code: string): Observable<any> {
    return this.http.get<any>(`${baseUrl3}/${code}`);
  }
  
  getBullBear(code: string): Observable<any> {
    return this.http.get<any>(`${baseUrl6}/${code}`);
  }
  
  getPrice(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl5}/${code}/${dateFrom}`);
  }

}