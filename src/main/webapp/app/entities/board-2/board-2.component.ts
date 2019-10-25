import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IBoard2 } from 'app/shared/model/board-2.model';
import { AccountService } from 'app/core/auth/account.service';
import { Board2Service } from './board-2.service';

@Component({
  selector: 'jhi-board-2',
  templateUrl: './board-2.component.html'
})
export class Board2Component implements OnInit, OnDestroy {
  board2S: IBoard2[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected board2Service: Board2Service, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.board2Service
      .query()
      .pipe(
        filter((res: HttpResponse<IBoard2[]>) => res.ok),
        map((res: HttpResponse<IBoard2[]>) => res.body)
      )
      .subscribe((res: IBoard2[]) => {
        this.board2S = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBoard2S();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBoard2) {
    return item.id;
  }

  registerChangeInBoard2S() {
    this.eventSubscriber = this.eventManager.subscribe('board2ListModification', response => this.loadAll());
  }
}
