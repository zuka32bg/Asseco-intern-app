import { Pfm } from './pfm';
import { Category } from './category';
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PfmService {


  dataKategorije!: string;


  constructor(
    protected httpCli: HttpClient) {


  }

  public getTransactions(): Observable<Pfm[]> {

    return this.httpCli.get<any>('http://127.0.0.1:4010/transactions').pipe(
      map((response) => {
        return response.items.map((responseJSON: { [x: string]: any; id: any; date: any; direction: any; amount: any; description: any; currency: any; mcc: any; kind: any; category: any; }) => ({
          id: responseJSON.id,
          beneficiaryName: responseJSON['beneficiary-name'],
          date: responseJSON.date,
          direction: responseJSON.direction,
          amount: responseJSON.amount,
          description: responseJSON.description,
          currency: responseJSON.currency,
          mcc: responseJSON.mcc,
          kind: responseJSON.kind




        }))
      })
    );
  }



  public getCategories(): Observable<Category[]> {
    return this.httpCli.get<Kategorije>('http://127.0.0.1:4010/categories').pipe(
      map((responseJSON: Kategorije,) => {
        return responseJSON.items.map((responseJSON: { [x: string]: any; code: any; name: any; }) => ({
          code: responseJSON.code,
          parentCode: responseJSON['parent-code'],
          name: responseJSON.name
        }))
      })
    )
  }

  public addCategory(id: any, data: any) {
    this.dataKategorije = `{ "catcode" : "${data}" } `

    const url = `http://127.0.0.1:4010/transaction/${id}/categorize`;
    return this.httpCli.post(url, data);
  }


  splitTransaction(id: any, splited: any) {
    const data = {
      splits: []
    }
    data.splits = splited
    console.log(data)
    return this.httpCli.post(`http://127.0.0.1:4010/transaction/${id}/split`, data);
  }
}





interface Kategorije {
  items: Category[];
}