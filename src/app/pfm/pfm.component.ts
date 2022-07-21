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

  public nizTransakcija: Pfm[] = [];


  el: Pfm[] = [];


  constructor(private dialog: MatDialog, private transactionService: PfmService, private _liveAnnouncer: LiveAnnouncer) { }


  public ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transactions: Pfm[]) => {
      //console.log(transactions);
      this.dataSource.data = transactions;
      this.nizTransakcija = transactions;
      this.el[0] = transactions[0];
      console.log(this.el[0].description)
    });

    this.dataSource.sort = this.sort;


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

        for (let index = 0; index < this.nizTransakcija.length; index++) {
          for (let index1 = 0; index1 < this.nizSvihTransakcija.length; index1++) {
            if (this.nizTransakcija[index].id == this.nizSvihTransakcija[index1]) {
              console.log("if")
              //  element.catcode=cat;
              this.nizTransakcija[index].catcode = cat;
            }

          }

        }
        this.prekid = 0;
        this.nizSvihTransakcija.length = 0;
      }
      else {
        console.log("else")
        let a = this.nizTransakcija.indexOf(element);

        this.nizTransakcija[a].catcode = cat;
      }
    })
  }

  displayedColumns: string[] = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
  public dataSource = new MatTableDataSource(this.nizTransakcija);
  selection = new SelectionModel<Pfm>(true, []);




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterKind($event: any) {
    this.nizTransakcijaDrop = this.nizTransakcija;
    let filteredData = _.filter(this.nizTransakcijaDrop, (item: any) => {
      console.log(item.kind)
      return item.kind.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;

  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




}
