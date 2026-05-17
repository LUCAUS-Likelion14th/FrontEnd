const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log(BASE_URL);

type TrackEventParams = {
  eventType: string;
  targetType?: string;
  targetId?: number;
  payload?: Record<string, any>;
};

function getUserId() {

  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );
    return payload.memberId ?? null;

  } catch {
    return null;
  }
}

export async function trackEvent({
  eventType,
  targetType,
  targetId,
  payload = {},
}: TrackEventParams) {

  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }

  const userId = getUserId();

  try {
    await fetch(`${BASE_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        userId,
        sessionId,
        targetType,
        targetId,
        payload,
      }),
    });
  } catch (e) {
    console.error("trackEvent error", e);
  }
}