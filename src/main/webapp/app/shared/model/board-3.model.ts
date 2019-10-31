import { Moment } from 'moment';

export interface IBoard3 {
  id?: number;
  title?: string;
  contents?: string;
  createdDate?: Moment;
}

export class Board3 implements IBoard3 {
  constructor(public id?: number, public title?: string, public contents?: string, public createdDate?: Moment) {}
}
