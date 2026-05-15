import { authFetcher } from "./fetcher";

export interface EventPayload {
  event_type: string;
  user_id?: number | null;
  session_id: string;
  timestamp: string;
  payload: Record<string, any>;
}

export const sendEvent = async (
  body: EventPayload
) => {
  return authFetcher(
    "/events",
    "POST",
    body
  );
};