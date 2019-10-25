import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBoard2 } from 'app/shared/model/board-2.model';

type EntityResponseType = HttpResponse<IBoard2>;
type EntityArrayResponseType = HttpResponse<IBoard2[]>;

@Injectable({ providedIn: 'root' })
export class Board2Service {
  public resourceUrl = SERVER_API_URL + 'api/board-2-s';

  constructor(protected http: HttpClient) {}

  create(board2: IBoard2): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board2);
    return this.http
      .post<IBoard2>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(board2: IBoard2): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board2);
    return this.http
      .put<IBoard2>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBoard2>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBoard2[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(board2: IBoard2): IBoard2 {
    const copy: IBoard2 = Object.assign({}, board2, {
      createdDate: board2.createdDate != null && board2.createdDate.isValid() ? board2.createdDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((board2: IBoard2) => {
        board2.createdDate = board2.createdDate != null ? moment(board2.createdDate) : null;
      });
    }
    return res;
  }
}
