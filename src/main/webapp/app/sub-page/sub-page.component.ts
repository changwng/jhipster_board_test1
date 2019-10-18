import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['sub-page.component.scss']
})
export class SubPageComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'SubPageComponent message';
  }

  ngOnInit() {}
}
