import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from '../models/user.interface';
import { UserService } from '../user.service';
import { API_BASE } from '../constants';

import { ClockEntry } from './models/clock-entry.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const NEXT_ENTRY_URL: string = `${API_BASE}/users/:id/clock_entries/next`;
const REGISTER_ENTRY_URL: string = `${API_BASE}/users/:id/clock_entries`;

@Injectable()
export class ClockService {
  constructor(private http: Http, private userService: UserService) {}

  getNext(): Observable<ClockEntry> {
    const url = NEXT_ENTRY_URL.replace(':id', `${this.userService.getUser().id}`);
    return this.http
      .get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  registerEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = REGISTER_ENTRY_URL.replace(':id', `${this.userService.getUser().id}`);
    return this.http
      .post(url, entry)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}

