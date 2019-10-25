import { Component, OnDestroy, OnInit } from '@angular/core';

import { IBoard } from 'app/shared/model/board.model';
import { filter, map } from 'rxjs/operators';
import { BoardService } from 'app/board/board.service';
import { HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  boards: IBoard[];
  eventSubscriber: Subscription;

  constructor(protected boardService: BoardService, protected eventManager: JhiEventManager) {}

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
    this.registerChangeInBoards();
  }

  trackId(index: number, item: IBoard) {
    return item.id;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerChangeInBoards() {
    this.eventSubscriber = this.eventManager.subscribe('boardListModification', response => this.loadAll());
  }
}
