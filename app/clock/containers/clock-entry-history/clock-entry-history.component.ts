import { Component, OnInit } from '@angular/core';

import { ClockService } from '../../clock.service';

import { PaginatedClockEntries, PaginationMeta } from '../../models/paginated-clock-entries.interface';

@Component({
  selector: 'clock-entry-history',
  template: `
    <div *ngIf="paginatedEntries">
      <div *ngFor="let entry of paginatedEntries.data">
        {{entry.id}}
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

