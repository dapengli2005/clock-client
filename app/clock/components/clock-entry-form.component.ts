import { Component, Input } from '@angular/core';
import * as moment from 'moment-timezone';

import { ClockEntry } from '../models/clock-entry.interface';

@Component({
  selector: 'clock-entry-form',
  template: `
    <div>
      <span>Type: </span>
      <select
        name="action_type"
        (change)="onTypeChange(typeInput.value)"
        #typeInput
      >
        <option
          *ngFor="let allowedType of allowedTypes"
          [value]="allowedType"
          [selected]="allowedType === entry.action_type">
          {{ allowedType }}
        </option>
      </select>
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
  `
})
export class ClockEntryFormComponent {
  allowedTypes = ['IN', 'OUT'];

  @Input()
  entry: ClockEntry;

  constructor() {
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
}

