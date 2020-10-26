import { RestService } from './../rest.service';
import { ResponseTransactions, Wallet, WalletTransaction, Transaction } from './../transaction';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public resTransactions: ResponseTransactions;
  public uniqueAddress: Wallet[];
  public transactionByWallet: WalletTransaction[] = [];
  displayedColumns: string[] = ['blockchain', 'date', 'from', 'to', 'amount', 'usd'];

  public ListTransactions: Transaction[] = [];
  public LT: Transaction[];
  public total: number;
  constructor(public rest: RestService) { }
/*
  ngOnInit(): void {
    this.rest.getTransactions$().subscribe((res) => {
      this.resTransactions = res;
      console.log(this.resTransactions);
      this.resTransactions.imgPathSetup();
      this.uniqueAddress = this.resTransactions.occurenceTransactions();
      if (this.uniqueAddress){
        this.treeTransaction(this.uniqueAddress);
        console.log(this.transactionByWallet);
      }
    });
  }

  treeTransaction = (walletList: Wallet[]) => {
    walletList.forEach((w) => {
      this.transactionByWallet.push(new WalletTransaction({wallet: w, transactions: this.resTransactions.allTransactionByWallet(w)}));
    });
  }
  */
  ngOnInit(): void {
    this.rest.getLastTransaction$().subscribe((res) => {
      res.forEach(element => {
        this.ListTransactions.push(new Transaction(element));
      });

      this.LT = this.ListTransactions;
      this.total = this.LT.length;
    });
  }


  // Stats (number of coins exchanged in total)
  //


}
