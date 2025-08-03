// client/src/types/shift.ts
export type Shift = {
  id?: number;   // 新規作成時はidないかも
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
};
