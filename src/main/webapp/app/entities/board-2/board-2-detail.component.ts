import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoard2 } from 'app/shared/model/board-2.model';

@Component({
  selector: 'jhi-board-2-detail',
  templateUrl: './board-2-detail.component.html'
})
export class Board2DetailComponent implements OnInit {
  board2: IBoard2;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board2 }) => {
      this.board2 = board2;
    });
  }

  previousState() {
    window.history.back();
  }
}
