import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'SinglePageComponent message';
  }

  ngOnInit() {}
}
