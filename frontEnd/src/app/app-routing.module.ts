import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { Graph2Component } from './components/graph2/graph2.component';
import { FAQsComponent } from './components/faqs/faqs.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'news', component: NewsComponent },
  {path: 'company/:code', component: CompanyProfileComponent},
  {path: 'company/:code/graph', component: Graph2Component},
  {path: 'FAQs', component:FAQsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
