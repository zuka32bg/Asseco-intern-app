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
  chart: any = [];

  constructor(private transactionService: PfmService) { }

  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((res) => {
      this.result = res
      console.log(this.result);

      this.kategName = this.result.data.name.map((kateg: any) => kateg.name)
    })

  }

}
