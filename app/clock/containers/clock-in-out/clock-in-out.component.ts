import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClockEntry } from '../../models/clock-entry.interface';
import { ClockService } from '../../clock.service';

@Component({
  selector: 'clock-in-out',
  template: `
    <span>Note: </span>
    <input
      type="text"
      [value]="note"
      (input)="onNoteChange(noteInput.value)"
      #noteInput>
    <div *ngIf="nextEntry">
      <button (click)="handleClick()">Clock {{nextEntry.type}}</button>
    </div>
  `
})
export class ClockInOutComponent implements OnInit {
  note: string = '';
  nextEntry: ClockEntry;

  constructor(private clockService : ClockService, private router: Router) {
  }

  ngOnInit() {
    this.clockService.getNext()
      .subscribe((val: ClockEntry) => this.nextEntry = val);
  }

  onNoteChange(val) {
    this.note = val;
  }

  handleClick() {
    const entry = {
      ...this.nextEntry,
      note: this.note
    };

    this.clockService.registerEntry(entry)
      .subscribe(() => this.router.navigate(['/clock/history']));
  }
}

