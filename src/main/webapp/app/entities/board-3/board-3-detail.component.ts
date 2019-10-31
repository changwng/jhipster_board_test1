import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoard3 } from 'app/shared/model/board-3.model';

@Component({
  selector: 'jhi-board-3-detail',
  templateUrl: './board-3-detail.component.html'
})
export class Board3DetailComponent implements OnInit {
  board3: IBoard3;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board3 }) => {
      this.board3 = board3;
    });
  }

  previousState() {
    window.history.back();
  }
}
