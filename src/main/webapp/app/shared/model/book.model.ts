export interface IBook {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public imageContentType?: string,
    public image?: any
  ) {}
}
