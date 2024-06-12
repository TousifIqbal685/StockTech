import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


const baseUrl  = `${environment.apiUrl}/MACD`;
const baseUrl2 = `${environment.apiUrl}/EMA50`;
const baseUrl3 = `${environment.apiUrl}/SMA50`;
const baseUrl4 = `${environment.apiUrl}/RSI`;
const baseUrl5 = `${environment.apiUrl}/STOCH`;
const baseUrl6 = `${environment.apiUrl}/BB`;

 

@Injectable({
  providedIn: 'root'
})
export class TechnicalIndicatorsService {


  constructor(private http: HttpClient) { }

  getMACD(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${code}/${dateFrom}`);
  }
  
  getEMA50(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl2}/${code}/${dateFrom}`);
  }
  
  getSMA50(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl3}/${code}/${dateFrom}`);
  }
  
  getRSI(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl4}/${code}/${dateFrom}`);
  }
  
  getSTOCH(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl5}/${code}/${dateFrom}`);
  }
  
  getBB(code: string, dateFrom: string): Observable<any> {
    return this.http.get<any>(`${baseUrl6}/${code}/${dateFrom}`);
  }
  

}
