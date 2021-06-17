import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
