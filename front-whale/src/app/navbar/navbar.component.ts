import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  
  constructor() { this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
    setTimeout(() => {
      observer.next([
        {label: 'First', content: 'Content 1'},
        {label: 'Second', content: 'Content 2'},
        {label: 'Third', content: 'Content 3'},
      ]);
    }, 1000);
  });
}

  ngOnInit(): void {
  }

}

export interface ExampleTab {
  label: string;
  content: string;
}
