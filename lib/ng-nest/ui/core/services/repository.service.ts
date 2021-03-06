import { XId, XQuery, XResultList } from '../interfaces';
import { XHttpService } from './http.service';
import { Observable } from 'rxjs';

export interface XRepositoryInput {
  controller: XController;
}

export interface XController {
  name: string;
}

export abstract class XRepositoryAbstract {
  abstract getList(index?: number, size?: number, query?: XQuery): Observable<XResultList<any>>;
  abstract get(id: number | string): Observable<any>;
  abstract post(entity: any): Observable<any>;
  abstract put(entity: any): Observable<any>;
  abstract delete(id: number | string): Observable<boolean>;
}

export class XRepositoryService<Entity extends XId> extends XRepositoryAbstract {
  constructor(public http: XHttpService, public input: XRepositoryInput) {
    super();
  }

  getList(index?: number, size?: number, query?: XQuery): Observable<XResultList<Entity>> {
    index = index ? index : 1;
    size = size ? size : 10;
    return this.http.post(`${this.input.controller.name}/${size}/${index}`, query);
  }

  get(id: number | string): Observable<Entity> {
    return this.http.get(`${this.input.controller.name}/${id}`);
  }

  post(entity: Entity): Observable<Entity> {
    return this.http.post(`${this.input.controller.name}`, entity);
  }

  put(entity: Entity): Observable<Entity> {
    return this.http.put(`${this.input.controller.name}`, entity);
  }

  delete(id: number | string): Observable<boolean> {
    return this.http.delete(`${this.input.controller.name}/${id}`);
  }
}
