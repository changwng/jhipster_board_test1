import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBoard3 } from 'app/shared/model/board-3.model';

type EntityResponseType = HttpResponse<IBoard3>;
type EntityArrayResponseType = HttpResponse<IBoard3[]>;

@Injectable({ providedIn: 'root' })
export class Board3Service {
  public resourceUrl = SERVER_API_URL + 'api/board-3-s';

  constructor(protected http: HttpClient) {}

  create(board3: IBoard3): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board3);
    return this.http
      .post<IBoard3>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(board3: IBoard3): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board3);
    return this.http
      .put<IBoard3>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBoard3>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBoard3[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(board3: IBoard3): IBoard3 {
    const copy: IBoard3 = Object.assign({}, board3, {
      createdDate: board3.createdDate != null && board3.createdDate.isValid() ? board3.createdDate.format(DATE_FORMAT) : null
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
      res.body.forEach((board3: IBoard3) => {
        board3.createdDate = board3.createdDate != null ? moment(board3.createdDate) : null;
      });
    }
    return res;
  }
}
