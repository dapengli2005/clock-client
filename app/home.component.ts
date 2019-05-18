import { Component, Input, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-home',
  template: `
      <span>Username: </span>
      <div>
        <input
          type="text"
          [value]="username"
          (input)="onNameChange(nameInput.value)"
          #nameInput>
        <button [disabled]="!username" (click)="login()">
          Login
        </button>
      </div>
  `
})
@Injectable()
export class HomeComponent implements OnInit {
  @Input()
  username: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.userService.getUser()) {
      this.router.navigate(['/clock']);
    }
  }

  onNameChange(value) {
    this.username = value;
  }

  login() {
    this.userService
      .login(this.username)
      .subscribe((user: User) => {
        this.router.navigate(['/clock']);
      });
  }
}
