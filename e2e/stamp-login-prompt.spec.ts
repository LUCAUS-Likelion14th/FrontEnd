import { test, expect } from "@playwright/test";

/**
 * 회귀 테스트 배경 (2026-08-04 QA):
 * 비로그인 상태로 /stamp에 진입하면 백엔드 GET /stamp/check가 401이 아니라
 * 빈 본문의 500을 반환한다(실제 프로덕션에서 관측된 동작). 수정 전 코드는
 * error.message === "Unauthorized" 일 때만 로그인 유도 화면을 띄웠기 때문에,
 * 이 케이스에서는 "데이터를 불러오지 못했습니다" 막다른 에러 화면에 갇혀
 * 로그인 진입점이 화면에 전혀 노출되지 않았다(GA 실측 /stamp 도달률 7.3%로
 * /stage 53.8%·/booth 31.4% 대비 저조했던 원인 중 하나로 추정).
 *
 * src/app/stamp/page.tsx의 hasToken 방어 로직이 되돌려지면 아래 테스트가 깨진다.
 */

const STAMP_PATH = "/stamp";
const LOGIN_PROMPT_TEXT = "도장판은 로그인 후 이용할 수 있어요";
const GENERIC_ERROR_TEXT = "데이터를 불러오지 못했습니다";

test.describe("/stamp — 비로그인 사용자", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  });

  test("백엔드가 401 대신 빈 500을 반환해도 로그인 유도 화면을 보여준다", async ({
    page,
  }) => {
    await page.route("**/api/stamp/check", (route) =>
      route.fulfill({ status: 500, body: "" }),
    );

    await page.goto(STAMP_PATH);

    await expect(page.getByText(LOGIN_PROMPT_TEXT)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Google로 시작하기/ }),
    ).toBeVisible();
    await expect(page.getByText(GENERIC_ERROR_TEXT)).not.toBeVisible();
  });

  test("백엔드가 정상적인 401 JSON을 반환해도 로그인 유도 화면을 보여준다", async ({
    page,
  }) => {
    await page.route("**/api/stamp/check", (route) =>
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          message: "로그인이 필요합니다.",
        }),
      }),
    );

    await page.goto(STAMP_PATH);

    await expect(page.getByText(LOGIN_PROMPT_TEXT)).toBeVisible();
  });

  test("로그인 버튼 클릭 시, 돌아올 목적지로 /stamp를 저장한 뒤 구글 인증으로 이동한다", async ({
    page,
  }) => {
    await page.route("**/api/stamp/check", (route) =>
      route.fulfill({ status: 500, body: "" }),
    );

    // window.location.href 대입은 스펙상 [Unforgeable]이라 오버라이드로
    // 가로챌 수 없고, 실제 이동이 한번 커밋되면(성공이든 에러 문서든) 원래
    // localhost 문서의 sessionStorage는 더 이상 읽을 수 없다. 그래서 문서가
    // 언로드되기 직전(beforeunload, 아직 원래 문서가 살아있는 시점)에
    // sessionStorage 값을 Node 쪽으로 직접 보고하도록 한다.
    let capturedAtUnload: string | null = null;
    await page.exposeFunction(
      "__reportPostLoginRedirect",
      (value: string | null) => {
        capturedAtUnload = value;
      },
    );
    await page.addInitScript(() => {
      window.addEventListener("beforeunload", () => {
        (
          window as unknown as {
            __reportPostLoginRedirect: (v: string | null) => void;
          }
        ).__reportPostLoginRedirect(
          sessionStorage.getItem("postLoginRedirect"),
        );
      });
    });
    // 실제 구글 서버로 나가지 않도록 무해한 응답으로 대체(navigation 자체는
    // 유지되어야 beforeunload가 정상적으로 발생한다).
    await page.route("**/oauth2/authorization/google", (route) =>
      route.fulfill({ status: 200, contentType: "text/plain", body: "ok" }),
    );

    await page.goto(STAMP_PATH);
    await page.getByRole("button", { name: /Google로 시작하기/ }).click();

    await expect.poll(() => capturedAtUnload).toBe(STAMP_PATH);
  });
});

test.describe("/stamp — 로그인된 사용자", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("accessToken", "e2e-fake-access-token");
      window.localStorage.setItem("refreshToken", "e2e-fake-refresh-token");
    });
  });

  test("인증과 무관한 서버 오류는 로그인 유도가 아니라 재시도 화면을 보여준다", async ({
    page,
  }) => {
    // 토큰이 있는데도 500이 나는 경우(진짜 서버 장애)는 로그인 유도가 아니라
    // 기존 재시도 UX를 유지해야 한다 — hasToken 방어 로직이 과도하게 넓어지지
    // 않았는지 확인하는 회귀 테스트.
    await page.route("**/api/stamp/check", (route) =>
      route.fulfill({ status: 500, body: "" }),
    );

    await page.goto(STAMP_PATH);

    await expect(page.getByText(GENERIC_ERROR_TEXT)).toBeVisible();
    await expect(page.getByText(LOGIN_PROMPT_TEXT)).not.toBeVisible();
  });
});
