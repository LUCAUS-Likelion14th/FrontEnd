import { sendEvent } from "./eventApi";

const getSessionId = () => {
  let sessionId =
    sessionStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem(
      "session_id",
      sessionId
    );
  }

  return sessionId;
};

export const trackEvent = async (
  eventType: string,
  payload: Record<string, any> = {}
) => {
  try {
    await sendEvent({
      event_type: eventType,
      session_id: getSessionId(),
      timestamp: new Date().toISOString(),
      payload: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("trackEvent error", e);
  }
};