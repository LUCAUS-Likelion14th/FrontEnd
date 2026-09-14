import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PLAYWRIGHT_PORT ?? "3001";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // GA4 실측 기준 모바일 89% / iOS 71%지만, 이 환경의 WebKit 빌드가
    // 이 macOS 버전에서 크래시하므로 Chromium 기반 모바일 에뮬레이션 사용.
    ...devices["Pixel 7"],
  },
  // 개발 서버가 이미 떠 있으면 그대로 재사용하고, 없으면 새로 띄운다.
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
