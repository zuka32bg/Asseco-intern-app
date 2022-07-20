
import { Pfm } from './pfm';
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PfmService {
  constructor(
    protected httpClient: HttpClient) {

  }

  public getTransactions(): Observable<Pfm[]> {

    return this.httpClient.get<any>('http://127.0.0.1:4010/transactions').pipe(
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



}