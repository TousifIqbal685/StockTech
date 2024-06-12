import { Component, OnInit } from '@angular/core';

interface Question {
  id: number;
  title: string;
  answer: string;
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent implements OnInit {
  public questions: Question[] = [];
  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questions = [
      {
        id: 1,
        title: 'What is a stock market?',
        answer: 'A stock market is a public marketplace where investors can buy and sell shares of publicly traded companies. It allows companies to raise capital by issuing and selling shares of their stock, and it allows investors to profit from the growth of these companies.'},
      {
        id: 2,
        title: 'What is a stock exchange?',
        answer: 'To invest in the stock market, you need to open an account with a brokerage firm or an online trading platform. You then need to deposit money into your account and start researching the stocks you want to invest in. You can buy and sell stocks through your brokerage account, either on your own or with the help of a financial advisor.'},
      {
        id: 3,
        title: 'How do I invest in the stock market?',
        answer: 'To invest in the stock market, you need to open an account with a brokerage firm or an online trading platform. You then need to deposit money into your account and start researching the stocks you want to invest in. You can buy and sell stocks through your brokerage account, either on your own or with the help of a financial advisor.'},
      {
        id: 4,
        title: 'What is a stock index?',
        answer: 'A stock index is a statistical measure of the performance of a group of stocks, often used as a benchmark for the overall stock market. Some of the most popular stock indexes include the Dow Jones Industrial Average (DJIA), the S&P 500, and the Nasdaq Composite.'
      },
      {
        id: 5,
        title: 'What is a dividend?',
        answer: 'A dividend is a payment made by a company to its shareholders, usually in the form of cash or additional shares of stock. It is typically paid out of the company\'s profits, and the amount of the dividend can vary depending on the company\'s financial performance and its dividend policy.'
      },
      {
        id: 6,
        title: 'What is the difference between a limit order and a market order?',
        answer: 'A limit order is an order to buy or sell a stock at a specific price or better, whereas a market order is an order to buy or sell a stock at the current market price. The key difference is that a limit order offers more control over the execution price, but there is a risk that the order may not be filled if the market does not reach the specified price.'
      },
      {
        id: 7,
        title: 'What is insider trading?',
        answer: 'Insider trading is the buying or selling of a company\'s stock by someone who has access to non-public information about the company, such as a company executive or director. It is illegal because it gives the insider an unfair advantage over other investors who do not have access to the same information.'
      },
      // {
      //   id: 8,
      //   title: 'What is Stochastic Oscillator?',
      //   answer: ''
      // },
      {
        id: 8,
        title: 'What is Stochastic Oscillator?',
        answer: 'The Stochastic Oscillator is a popular momentum indicator used in technical analysis to identify overbought and oversold conditions in the market. It compares a security\'s closing price to its price range over a specific period, typically 14 periods.The Stochastic Oscillator consists of two lines: the %K line and the %D line. The %K line represents the current closing price relative to the price range over a specific period. The %D line is a moving average of the %K line. It is typically a 3-day simple moving average of the %K line. The %D line helps smooth out the fluctuations of the %K line and generates more reliable signals.'
      }
    ];

  }



}
