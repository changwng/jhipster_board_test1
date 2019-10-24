import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IBoard } from 'app/shared/model/board.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<IBoard>;
type EntityArrayResponseType = HttpResponse<IBoard[]>;

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public resourceUrl = SERVER_API_URL + 'api/boards';

  constructor(protected http: HttpClient) {}

  create(board: IBoard): Observable<EntityResponseType> {
    return this.http.post<IBoard>(this.resourceUrl, board, { observe: 'response' });
  }

  update(board: IBoard): Observable<EntityResponseType> {
    return this.http.put<IBoard>(this.resourceUrl, board, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBoard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBoard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
