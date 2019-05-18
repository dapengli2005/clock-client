import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { User } from '../models/user.interface';
import { UserService } from '../user.service';
import { API_BASE } from '../constants';

import { ClockEntry } from './models/clock-entry.interface';
import { PaginatedClockEntries, PaginationMeta } from './models/paginated-clock-entries.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const NEXT_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/next`;
const REGISTER_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries`;
const GET_ENTRIES_URL: string = `${API_BASE}/users/:user_id/clock_entries`;
const GET_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/:id`;
const UPDATE_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/:id`;

@Injectable()
export class ClockService {
  constructor(private http: Http, private userService: UserService) {}

  getNext(): Observable<ClockEntry> {
    const url = NEXT_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.http
      .get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  registerEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = REGISTER_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.http
      .post(url, entry)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntries(): Observable<PaginatedClockEntries> {
    const url = GET_ENTRIES_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.http
      .get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntriesBy({ url, method }: PaginationMeta): Observable<PaginatedClockEntries> {
    return this.http
      .request(new Request({ url, method: this.mapMethod(method) }))
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntry(id: number): Observable<ClockEntry> {
    const url = GET_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                             .replace(':id', `${id}`);

    return this.http
      .get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = UPDATE_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                                .replace(':id', `${entry.id}`);

    return this.http
      .put(url, entry)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  methodMapper = {
    GET: RequestMethod.Get,
    POST: RequestMethod.Post
  };
  private mapMethod(method: PaginationMeta['method']): RequestMethod {
    return this.methodMapper[method];
  }
}

