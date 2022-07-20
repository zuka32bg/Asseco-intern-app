import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PfmService } from '../pfm.service';
import { FormControl, Validators } from '@angular/forms';
import { Pfm } from '../pfm';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';



/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-pfm',
  templateUrl: './pfm.component.html',
  styleUrls: ['./pfm.component.scss']
})

export class PfmComponent implements AfterViewInit {
  nizTransakcije: Pfm[] = [];
  nizSvihTransakcija: Pfm[] = [];
  nizTransakcijaDrop: Pfm[] = [];



  displayedColumns: string[] = ['id', 'beneficiaryName', 'date', 'direction', 'amount', 'currency', 'description', 'mcc', 'kind', 'catcode'];




  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private transactionService: PfmService) {




  }

  ngOnInit(): void {


    this.transactionService.getTransactions().subscribe((transakcije: Pfm[]) => {
      console.log(transakcije);
      this.nizTransakcijaDrop = transakcije;
      this.dataSource.data = transakcije;
      this.nizSvihTransakcija = transakcije;

    })


  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;

  }
  dataSource = new MatTableDataSource<Pfm>(this.nizSvihTransakcija);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filterKind($event: any) {

    let filteredData = _.filter(this.nizTransakcijaDrop, (item: any) => {
      return item.kind.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }


}






