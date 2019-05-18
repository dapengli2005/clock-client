import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './models/user.interface';
import { API_BASE } from './constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const LOGIN_URL: string = `${API_BASE}/users/login`;

@Injectable()
export class UserService {
  user: User;
  constructor(private http: Http) {}

  login(username: string): Observable<User> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers });
    const body = { username };
    return this.http
      .post(LOGIN_URL, body, options)
      .map((response: Response) => {
        this.user = response.json();
        return this.user;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUser(): User {
    return this.user;
  }
}

