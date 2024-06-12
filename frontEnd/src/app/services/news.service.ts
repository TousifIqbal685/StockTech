import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const baseUrl = `${environment.apiUrl}/news/`;
const baseUrl2 = `${environment.apiUrl}/companyNews`;


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  getCompanyNews(code: string): Observable<any> {
    return this.http.get<any>(`${baseUrl2}/${code}`);
  }
}