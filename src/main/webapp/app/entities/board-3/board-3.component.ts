import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IBoard3 } from 'app/shared/model/board-3.model';
import { AccountService } from 'app/core/auth/account.service';
import { Board3Service } from './board-3.service';

@Component({
  selector: 'jhi-board-3',
  templateUrl: './board-3.component.html'
})
export class Board3Component implements OnInit, OnDestroy {
  board3S: IBoard3[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected board3Service: Board3Service, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.board3Service
      .query()
      .pipe(
        filter((res: HttpResponse<IBoard3[]>) => res.ok),
        map((res: HttpResponse<IBoard3[]>) => res.body)
      )
      .subscribe((res: IBoard3[]) => {
        this.board3S = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBoard3S();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBoard3) {
    return item.id;
  }

  registerChangeInBoard3S() {
    this.eventSubscriber = this.eventManager.subscribe('board3ListModification', response => this.loadAll());
  }
}
