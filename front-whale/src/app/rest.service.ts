import { HttpClient } from '@angular/common/http';
import { ResponseTransactions, ResponseTransactionsRecord } from './transaction';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getTransactions$ = (params = {}, headers = {}) =>
  this.http.get<ResponseTransactionsRecord>('../assets/alerts.json')
       .pipe(map(p => new ResponseTransactions(p)))

}
