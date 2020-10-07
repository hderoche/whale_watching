import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { ResponseTransactions, Wallet, WalletTransaction } from '../transaction';

@Component({
  selector: 'app-track-wallet',
  templateUrl: './track-wallet.component.html',
  styleUrls: ['./track-wallet.component.css']
})
export class TrackWalletComponent implements OnInit {

  public resTransactions: ResponseTransactions;
  public uniqueAddress: Wallet[];
  public transactionByWallet: WalletTransaction[] = [];
  displayedColumns2: string[] = ['wallet', 'date', 'from', 'to'];

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.rest.getTransactions$().subscribe((res) => {
      this.resTransactions = res;
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
}
