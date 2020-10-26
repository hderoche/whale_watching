import { Stats, Transaction, Timestamp } from './../transaction';
import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  public statistics: Stats;
  public minTransaction: Transaction;
  public maxTransaction: Transaction;

  public correlation: Timestamp[];


  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.rest.getStats$().subscribe((res) => {
      this.statistics = res;
      this.rest.getTransactionById$(this.statistics.min).subscribe((minreq) => {
        this.minTransaction = minreq;
      });
      this.rest.getTransactionById$(this.statistics.max).subscribe((maxreq) => {
        this.maxTransaction = maxreq;
        console.log(this.maxTransaction);
      });
      this.correlation = this.statistics.correlation;
    });
  }

}
