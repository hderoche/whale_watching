import { RestService } from './../rest.service';
import { ResponseTransactions, Wallet, WalletTransaction } from './../transaction';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';


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
  displayedColumns2: string[] = ['wallet', 'date', 'from', 'to'];
  dataSource2: any;
  constructor(public rest: RestService) { }

  ngOnInit(): void {
    this.rest.getTransactions$().subscribe((res) => {
      this.resTransactions = res;
      this.resTransactions.imgPathSetup();
      this.uniqueAddress = this.resTransactions.occurenceTransactions();
      if (this.uniqueAddress){
        this.treeTransaction(this.uniqueAddress);
        this.dataSource2 = this.transactionByWallet;
        console.log(this.transactionByWallet);
      }
    });
  }

  treeTransaction = (walletList: Wallet[]) => {
    walletList.forEach((w) => {
      this.transactionByWallet.push(new WalletTransaction({wallet: w, transactions: this.resTransactions.allTransactionByWallet(w)}));
    });
  }

  // Stats (number of coins exchanged in total)
  //


}
