import { HttpClient } from '@angular/common/http';
import { ResponseTransactions, ResponseTransactionsRecord, TransactionRecord, Transaction, StatsRecord } from './transaction';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getTransactions$ = (params = {}, headers = {}) =>
  this.http.get<ResponseTransactionsRecord>('http://localhost:4000/api/transactions')
       .pipe(map(p => new ResponseTransactions(p)))

  getLastTransaction$ = (params = {}, headers = {}) =>
    this.http.get<TransactionRecord[]>('http://localhost:4000/api/transactions')

  getStats$ = (params = {}, headers = {}) =>
  this.http.get<StatsRecord>('http://localhost:4000/api/stats')

  getTransactionById$ = (params = {}, headers = {}) =>
  this.http.get<Transaction>('http://localhost:4000/api/transactions/' + params)
        .pipe(map(p => new Transaction(p)))
}
