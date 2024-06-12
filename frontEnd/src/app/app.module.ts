import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {NgApexchartsModule} from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { Graph2Component } from './components/graph2/graph2.component';
import { FAQsComponent } from './components/faqs/faqs.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    CompanyProfileComponent,
    Graph2Component,
    FAQsComponent,
  ],
  imports: [FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
