import { Component, OnInit } from '@angular/core';
import { IBoard } from 'app/shared/model/board.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-board-detail',
  templateUrl: './board-detail.component.html'
})
export class BoardDetailComponent implements OnInit {
  board: IBoard;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board }) => {
      this.board = board;
    });
  }

  previousState() {
    window.history.back();
  }
}
