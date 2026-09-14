// 축제 운영기간 종료 시각 (KST). 실제 종료 일정이 바뀌면 이 값만 수정하면 된다.
export const EVENT_END_AT = "2026-05-22T23:59:59+09:00";

export function isEventEnded(now: Date = new Date()): boolean {
  return now.getTime() > new Date(EVENT_END_AT).getTime();
}
