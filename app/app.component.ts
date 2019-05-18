import { Injectable, Component } from '@angular/core';
import { User } from './models/user.interface';
import { UserService } from './user.service';

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <nav *ngIf="userService.getUser()" class="nav">
        <a
          *ngFor="let item of nav"
          [routerLink]="item.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: item.exact }">
          {{ item.name }}
        </a>
      </nav>
      <div *ngIf="userService.getUser()">
        Hello {{userService.getUser().username}}.
        <a href="#" (click)="logout($event)">log out</a>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
@Injectable()
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/clock',
      name: 'Clock',
      exact: true
    },
    {
      link: '/clock/history',
      name: 'History',
      exact: true
    },
    {
      link: '/clock/new',
      name: 'New',
      exact: true
    }
  ];

  constructor(private userService: UserService) {
  }

  logout(e) {
    e.preventDefault();
    console.log('log out');
  }
}
