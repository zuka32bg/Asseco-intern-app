import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { PfmService } from '../pfm.service';

@Component({
  selector: 'app-split-transakcije',
  templateUrl: './split-transakcije.component.html',
  styleUrls: ['./split-transakcije.component.scss']
})
export class SplitTransakcijeComponent implements OnInit {

  result: any;
  constructor(private splitTransactions: PfmService) { }

  ngOnInit(): void {

    this.splitTransactions.getCategories().subscribe((categories: Category[]) => {

      this.result = categories;
      console.log(this.result);

    });
  }

}
