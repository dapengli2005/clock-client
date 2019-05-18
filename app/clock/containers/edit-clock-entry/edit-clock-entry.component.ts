import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';

import 'rxjs/add/operator/switchMap';

import { ClockService } from '../../clock.service';
import { ClockEntry } from '../../models/clock-entry.interface';

@Component({
  selector: 'edit-clock-entry',
  template: `
    <div *ngIf="entry">
      {{entry.datetime}}
      <div>
        <span>Type: </span>
        <input
          type="text"
          [value]="entry.action_type"
          (input)="onTypeChange(typeInput.value)"
          #typeInput>
      </div>
      <div>
        <span>Date: </span>
        <input
          type="datetime-local"
          [ngModel]="entry.datetime | date:'yyyy-MM-ddTHH:mm'"
          (ngModelChange)="onDatetimeChange(datetimeInput.value)"
          #datetimeInput>
      </div>
      <div>
        <span>Note: </span>
        <input
          type="text"
          [value]="entry.note"
          (input)="onNoteChange(noteInput.value)"
          #noteInput>
      </div>
      <button (click)="update()">Update</button>
    </div>
  `
})
export class EditClockEntryComponent implements OnInit {
  entry: ClockEntry;

  constructor(private clockService: ClockService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .switchMap(({ id }) => this.clockService.getEntry(id))
      .subscribe((val: ClockEntry) => this.entry = val);
  }

  onTypeChange(val: ClockEntry['action_type']) {
    this.entry.action_type = val;
  }

  onDatetimeChange(val: Date) {
    const utcDate = moment(val).utc().format();
    this.entry.datetime = utcDate;
  }

  onNoteChange(val: string) {
    this.entry.note = val;
  }

  update() {
    console.log(this.entry);
    this.clockService.updateEntry(this.entry)
      .subscribe(() => this.router.navigate([`/clock/edit/${this.entry.id}`]));
  }
}

