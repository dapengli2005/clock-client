export interface ClockEntry {
  id?: number;
  userId?: number;
  action_type: 'IN' | 'OUT';
  datetime?: Date;
  note?: string;
}
