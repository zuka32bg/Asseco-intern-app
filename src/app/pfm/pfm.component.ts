import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PfmService } from '../pfm.service';

@Component({
  selector: 'app-pfm',
  templateUrl: './pfm.component.html',
  styleUrls: ['./pfm.component.scss']
})
export class PfmComponent implements OnInit {
  filteredString: string = '';
  public displayedColumns: string[] = ['id', 'beneficiary-name', 'date', 'direction', 'amount'];
  public dataSource = new MatTableDataSource();
  public transactions: any = [];
  constructor(
    protected transactionService: PfmService
  ) { }

  ngOnInit(): void {
    this.getTransactions();

  }
  private getTransactions() {
    this.transactionService.getTransactions().subscribe((res) => {
      this.transactions = res;
      console.log('this.transactions', this.transactions);
      this.dataSource.data = this.transactions.items;

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
