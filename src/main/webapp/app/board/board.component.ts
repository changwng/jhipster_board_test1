import { Component, OnInit } from '@angular/core';

import { IBoard } from 'app/shared/model/board.model';
import { filter, map } from 'rxjs/operators';
import { BoardService } from 'app/board/board.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards: IBoard[];

  constructor(protected boardService: BoardService) {}

  loadAll() {
    this.boardService
      .query()
      .pipe(
        filter((res: HttpResponse<IBoard[]>) => res.ok),
        map((res: HttpResponse<IBoard[]>) => res.body)
      )
      .subscribe((res: IBoard[]) => {
        this.boards = res;
      });
  }

  ngOnInit() {
    this.loadAll(); // 처음 실행시 시작되는 것
  }

  trackId(index: number, item: IBoard) {
    return item.id;
  }
}
