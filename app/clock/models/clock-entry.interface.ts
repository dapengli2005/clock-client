export interface ClockEntry {
  id?: number;
  userId?: number;
  type: 'IN' | 'OUT';
  datetime?: Date;
  note?: string;
}
