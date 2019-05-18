import { Component, OnInit } from '@angular/core';

import { ClockService } from '../../clock.service';

import { PaginatedClockEntries, PaginationMeta } from '../../models/paginated-clock-entries.interface';

@Component({
  selector: 'clock-entry-history',
  styleUrls: ['clock-entry-history.component.scss'],
  template: `
    <div *ngIf="paginatedEntries">
      <div *ngFor="let entry of paginatedEntries.data">
          {{entry.action_type}} - {{entry.datetime | date:'medium'}}<span class="note" *ngIf="entry.note"> ({{entry.note}})</span>
      </div>
      <a href="#" *ngIf="paginatedEntries.meta?.prev" (click)="goTo($event, paginatedEntries.meta.prev)">prev</a>
      <a href="#" *ngIf="paginatedEntries.meta?.next" (click)="goTo($event, paginatedEntries.meta.next)">next</a>
    </div>
  `
})
export class ClockEntryHistoryComponent implements OnInit {
  paginatedEntries: PaginatedClockEntries;

  constructor(private clockService: ClockService) {
  }

  ngOnInit() {
    this.clockService.getEntries()
      .subscribe(val => this.paginatedEntries = val);
  }

  goTo(e, paginationMeta: PaginationMeta) {
    e.preventDefault();
    this.clockService.getEntriesBy(paginationMeta)
      .subscribe(val => this.paginatedEntries = val);
  }
}

