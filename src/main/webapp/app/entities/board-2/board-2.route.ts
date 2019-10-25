import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Board2 } from 'app/shared/model/board-2.model';
import { Board2Service } from './board-2.service';
import { Board2Component } from './board-2.component';
import { Board2DetailComponent } from './board-2-detail.component';
import { Board2UpdateComponent } from './board-2-update.component';
import { Board2DeletePopupComponent } from './board-2-delete-dialog.component';
import { IBoard2 } from 'app/shared/model/board-2.model';

@Injectable({ providedIn: 'root' })
export class Board2Resolve implements Resolve<IBoard2> {
  constructor(private service: Board2Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoard2> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Board2>) => response.ok),
        map((board2: HttpResponse<Board2>) => board2.body)
      );
    }
    return of(new Board2());
  }
}

export const board2Route: Routes = [
  {
    path: '',
    component: Board2Component,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board2S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Board2DetailComponent,
    resolve: {
      board2: Board2Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board2S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Board2UpdateComponent,
    resolve: {
      board2: Board2Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board2S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Board2UpdateComponent,
    resolve: {
      board2: Board2Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board2S'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const board2PopupRoute: Routes = [
  {
    path: ':id/delete',
    component: Board2DeletePopupComponent,
    resolve: {
      board2: Board2Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board2S'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
