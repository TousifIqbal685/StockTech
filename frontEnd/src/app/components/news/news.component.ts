import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor(private NewsService: NewsService) {}
  newsData: any;


  ngOnInit(): void {
    this.receiveNews();
  }
  
  
  receiveNews(): void {  
    this.NewsService.getNews()
      .subscribe({
        next: (res) => {
          this.newsData = res;         
        },
        error: (e) => console.error(e)
      });
  }
}
