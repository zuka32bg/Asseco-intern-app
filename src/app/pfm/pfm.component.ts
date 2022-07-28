import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PfmService } from '../pfm.service';
import { Pfm } from '../pfm';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoryComponent } from '../category/category.component';
import { ChartComponent } from '../chart/chart.component';



/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-pfm',
  templateUrl: './pfm.component.html',
  styleUrls: ['./pfm.component.scss']
})

export class PfmComponent implements AfterViewInit, OnInit {

  prekid: number = 0;
  nizTransakcijaDrop: any = [];
  fileNameDialogRef: MatDialogRef<CategoryComponent> | undefined;
  nizSvihTransakcija: number[] = [];
  public nizKategorija: Pfm[] = [];
  public selected: any;
  el: Pfm[] = [];
  dugmeOpenClose: boolean | undefined;
  counter = 0;










  constructor(private dialog: MatDialog, private transacionService: PfmService, private _liveAnnouncer: LiveAnnouncer) { }


  public ngOnInit(): void {
    this.transacionService.getTransactions().subscribe((transactions: Pfm[]) => {
      this.dataSource.data = transactions;
      this.nizKategorija = transactions;
      this.el[0] = transactions[0];

    });

    this.dataSource.sort = this.sort;


  }



  openPieChart() {
    this.dialog.open(ChartComponent);

  }


  openCategory(element: Pfm) {
    let config: MatDialogConfig = {

      data: {
        element

      }
    };


    this.fileNameDialogRef = this.dialog.open(CategoryComponent, config);

    this.fileNameDialogRef.afterClosed().pipe(
      filter(cat => cat)
    ).subscribe(cat => {

      if (this.prekid == 1) {

        for (let index = 0; index < this.nizKategorija.length; index++) {
          for (let index1 = 0; index1 < this.nizSvihTransakcija.length; index1++) {
            if (this.nizKategorija[index].id == this.nizSvihTransakcija[index1]) {
              console.log("if")

              this.nizKategorija[index].catcode = cat;
            }

          }

        }
        this.prekid = 0;
        this.nizSvihTransakcija.length = 0;
      }
      else {
        console.log("else")
        let a = this.nizKategorija.indexOf(element);

        this.nizKategorija[a].catcode = cat;
      }
    })
  }





  displayedColumns: string[] = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
  public dataSource = new MatTableDataSource(this.nizKategorija);
  selection = new SelectionModel<Pfm>(true, []);



  kategorijaSvima() {

    this.prekid++;
    for (let index = 0; index < this.nizKategorija.length; index++) {
      if (this.selection.isSelected(this.nizKategorija[index])) {
        this.nizSvihTransakcija.push(this.nizKategorija[index].id);
        console.log(this.nizKategorija[index].id);
      }

    }
  }
  filterKind(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange($event: any) {
    this.nizTransakcijaDrop = this.nizKategorija;
    let filteredData = _.filter(this.nizTransakcijaDrop, (item: any) => {
      console.log(item.kind)
      return item.kind.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  openCliDiv() {
    this.dugmeOpenClose = true;
  }

  openSelect() {
    this.counter++;
    this.openCliDiv();
    if (this.counter % 2 == 1) {
      this.displayedColumns.unshift('select');
    } else {
      this.displayedColumns = this.displayedColumns.filter(e => e !== 'select');

    }

  }

  restart() {
    this.nizSvihTransakcija.length = 0;
  }



  closeSelect() {
    this.displayedColumns = this.displayedColumns.filter(e => e !== 'select');
    this.dugmeOpenClose = false;
    this.counter = 0;
    this.nizSvihTransakcija.length = 0;

  }







  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;


  }


  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




  sveIzabranoCheck() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  izaberiSve() {
    if (this.sveIzabranoCheck()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkBoxLabela(row?: Pfm): string {
    if (!row) {
      return `${this.sveIzabranoCheck() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;


  }



}
