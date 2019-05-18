export interface ClockEntry {
  id?: number;
  user_id?: number;
  action_type: 'IN' | 'OUT';
  datetime?: Date;
  note?: string;
}
