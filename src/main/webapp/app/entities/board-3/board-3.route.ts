import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Board3 } from 'app/shared/model/board-3.model';
import { Board3Service } from './board-3.service';
import { Board3Component } from './board-3.component';
import { Board3DetailComponent } from './board-3-detail.component';
import { Board3UpdateComponent } from './board-3-update.component';
import { Board3DeletePopupComponent } from './board-3-delete-dialog.component';
import { IBoard3 } from 'app/shared/model/board-3.model';

@Injectable({ providedIn: 'root' })
export class Board3Resolve implements Resolve<IBoard3> {
  constructor(private service: Board3Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoard3> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Board3>) => response.ok),
        map((board3: HttpResponse<Board3>) => board3.body)
      );
    }
    return of(new Board3());
  }
}

export const board3Route: Routes = [
  {
    path: '',
    component: Board3Component,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board3S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Board3DetailComponent,
    resolve: {
      board3: Board3Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board3S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Board3UpdateComponent,
    resolve: {
      board3: Board3Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board3S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Board3UpdateComponent,
    resolve: {
      board3: Board3Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board3S'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const board3PopupRoute: Routes = [
  {
    path: ':id/delete',
    component: Board3DeletePopupComponent,
    resolve: {
      board3: Board3Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Board3S'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
