import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../clock.service';
import { ClockEntry } from '../../models/clock-entry.interface';

@Component({
  selector: 'edit-clock-entry',
  template: `
    <clock-entry-form [entry]="entry"></clock-entry-form>
    <button (click)="create()">Create</button>
  `
})
export class NewClockEntryComponent {
  entry: ClockEntry;

  constructor(private clockService: ClockService, private router: Router) {
    this.entry = {
      action_type: 'IN',
      datetime: new Date(),
      note: ''
    };
  }

  create() {
    this.clockService.createEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']));
  }
}

