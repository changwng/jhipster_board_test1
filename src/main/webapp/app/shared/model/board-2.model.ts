import { Moment } from 'moment';

export interface IBoard2 {
  id?: number;
  title?: string;
  contents?: string;
  createdDate?: Moment;
}

export class Board2 implements IBoard2 {
  constructor(public id?: number, public title?: string, public contents?: string, public createdDate?: Moment) {}
}
