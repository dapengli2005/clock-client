import { ClockEntry } from './clock-entry.interface';

export interface PaginationMeta {
  method: 'GET' | 'POST';
  url: string;
}

export interface PaginatedClockEntries {
  data: ClockEntry[];
  meta: {
    next?: PaginationMeta,
    prev?: PaginationMeta
  }
}
