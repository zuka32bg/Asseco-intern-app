import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

import { PfmService } from '../pfm.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  result: any;
  kategName: any;
  kategCode: any;
  chart: any = [];

  constructor(private transactionService: PfmService) { }

  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((res) => {
      this.result = res
      console.log(this.result);

      this.kategName = this.result.map((kateg: any) => kateg.name)
      this.kategName.splice(21, 86)
      console.log(this.kategName);

      this.kategCode = this.result.map((kateg: any) => kateg.code)
      console.log(this.kategCode);


      //show Chart data
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: this.kategName,
          datasets: [{
            label: 'My First Dataset',
            data: this.kategCode.slice(66),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
              'rgb(32, 46, 79)',
              'rgb(69, 227, 2) ',
              'rgb(2, 141, 92)',
              'rgb(22, 18, 37)',
              'rgb(80, 43, 5)',
              'rgba(44, 79, 224, 0.2)',
              'rgba(148, 91, 41, 0.5)',
              'rgba(207, 203, 228, 0.3)',
              'rgba(171, 167, 57, 0.6)',
              'rgba(226, 122, 123, 0.3)',
              'rgba(42, 105, 175, 0.7)',
              'rgba(228, 248, 74, 1)',
              'rgba(185, 172, 28, 0.9)',
              'rgba(1, 25, 227, 0.9)',
              'rgba(176, 43, 21, 0.8)',
              'rgba(235, 9, 18, 0.8)'
            ]
          }]

        }

      })
      console.log(this.kategName);
    })

  }

}
