import { RestService } from './../rest.service';
import { ResponseTransactions, Transaction } from './../transaction';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public resTransactions: ResponseTransactions;
  public uniqueAddress: string[];
  constructor(public rest: RestService) { }

  ngOnInit(): void {
    this.rest.getTransactions$().subscribe((res) => {
      this.resTransactions = res;
      this.uniqueAddress = this.resTransactions.occurenceTransactions();
      console.log((this.uniqueAddress).length);
    });
  }
}
