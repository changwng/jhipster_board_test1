import { Moment } from 'moment';

export interface IBoard {
  id?: number;
  title?: string;
  contents?: string;
  createdDate?: Moment;
}

export class Board implements IBoard {
  constructor(public id?: number, public title?: string, public contents?: string, public createdDate?: Moment) {}
}
