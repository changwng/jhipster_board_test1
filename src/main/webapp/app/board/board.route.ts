import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';

import { BoardComponent } from './board.component';
import { BoardUpdateComponent } from 'app/board/board-update.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IBoard, Board } from 'app/shared/model/board.model';
import { BoardService } from 'app/board/board.service';
import { BoardDetailComponent } from 'app/board/board-detail.component';

@Injectable({ providedIn: 'root' })
export class BoardResolve implements Resolve<IBoard> {
  constructor(private service: BoardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoard> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Board>) => response.ok),
        map((board: HttpResponse<Board>) => board.body)
      );
    }
    return of(new Board());
  }
}

export const BOARD_ROUTE: Routes = [
  {
    path: '',
    component: BoardComponent,
    data: {
      authorities: [],
      pageTitle: 'Board Main Page'
    }
  },
  {
    path: 'new',
    component: BoardUpdateComponent,
    resolve: {
      board: BoardResolve
    },
    data: {
      pageTitle: 'Board Create/Update Page'
    }
  },
  {
    path: ':id/view',
    component: BoardDetailComponent,
    resolve: {
      board: BoardResolve
    },
    data: {
      pageTitle: 'Board Detail Page'
    }
  }
];
