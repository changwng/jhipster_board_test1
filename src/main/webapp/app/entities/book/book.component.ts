import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IBook } from 'app/shared/model/book.model';
import { AccountService } from 'app/core/auth/account.service';
import { BookService } from './book.service';

@Component({
  selector: 'jhi-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
  books: IBook[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected bookService: BookService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.bookService
      .query()
      .pipe(
        filter((res: HttpResponse<IBook[]>) => res.ok),
        map((res: HttpResponse<IBook[]>) => res.body)
      )
      .subscribe((res: IBook[]) => {
        this.books = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBooks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBook) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInBooks() {
    this.eventSubscriber = this.eventManager.subscribe('bookListModification', response => this.loadAll());
  }
}
