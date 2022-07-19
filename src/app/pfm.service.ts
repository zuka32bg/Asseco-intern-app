import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PfmService {
  constructor(
    protected httpClient: HttpClient) {

  }

  public getTransactions() {
    return this.httpClient.get("http://127.0.0.1:4010/transactions");

  }



}