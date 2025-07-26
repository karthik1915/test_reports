# Test info

- Name: TC_ANALYZE_003 - should test visit inference dashboard button works
- Location: /home/runner/work/ui-semiconductor-scheduling/ui-semiconductor-scheduling/tests/inference/analyze.spec.tsx:81:5

# Error details

```
Error: page.waitForEvent: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for event "popup"
============================================================
    at /home/runner/work/ui-semiconductor-scheduling/ui-semiconductor-scheduling/tests/inference/analyze.spec.tsx:91:10
```

# Page snapshot

```yaml
- link:
  - /url: /
- list:
  - listitem:
    - link "Data Upload":
      - /url: /data-upload
  - listitem:
    - link "Sync":
      - /url: /sync
  - listitem:
    - link "Dashboard":
      - /url: /dashboard
  - listitem:
    - link "Start Training":
      - /url: /train
  - listitem:
    - link "Inference":
      - /url: /inference/inference-path-navigation
  - listitem:
    - link "Settings":
      - /url: /settings
- text: You are in testing phase
- heading "Select inference run" [level=2]
- combobox "Inference Run 1":
  - option "Select inference run" [disabled]
  - option "Inference Run 1" [selected]
- button "?"
- combobox "Baseline Schedule 1":
  - option "Select a baseline schedule" [disabled]
  - option "Baseline Schedule 1" [selected]
- button "?"
- heading "Click the button to access the inference dashboard for the chosen inference run and compare them with the baseline schedule" [level=2]
- button "Visit Inference Dashboard"
- button "?"
- button "Get Gantt Chart"
- dialog:
  - heading "Info" [level=3]
  - paragraph
  - button "Close"
- alert
```

# Test source

```ts
   1 | // @ Linked Doc : /docs/tests/playwright/inference/basic-pages.md
   2 |
   3 | import cnfdata from "@/config/config-prod.json";
   4 | import { test, expect, Locator } from "@playwright/test";
   5 | import { CheckHelperText } from "../utils/checkHelperText";
   6 |
   7 | let inferenceRunDrp: Locator;
   8 | let baselineScheduleDrp: Locator;
   9 | let visitInferenceDashboardBtn: Locator;
   10 | let visitGanttChartBtn: Locator;
   11 |
   12 | let inferenceRunInfo: Locator;
   13 | let baselineScheduleInfo: Locator;
   14 | let inferenceDashboardInfo: Locator;
   15 |
   16 | let configData: any;
   17 |
   18 | test.beforeAll(async () => {
   19 |   configData = cnfdata;
   20 | });
   21 |
   22 | test.beforeEach(async ({ page }) => {
   23 |   await page.goto("/inference/analyze");
   24 |   inferenceRunDrp = page.locator("#inferenceRunSelect");
   25 |   baselineScheduleDrp = page.locator("#baselineScheduleSelect");
   26 |   visitInferenceDashboardBtn = page.locator("#visitInferenceDashboard");
   27 |   visitGanttChartBtn = page.locator("#getGanttChart");
   28 |
   29 |   inferenceRunInfo = page.locator("#inferenceRunInfo");
   30 |   baselineScheduleInfo = page.locator("#baselineScheduleInfo");
   31 |   inferenceDashboardInfo = page.locator("#inferenceDashboardInfo");
   32 | });
   33 |
   34 | test("TC_ANALYZE_001  should test components are rendered correctly", async ({
   35 |   page,
   36 | }) => {
   37 |   await expect(inferenceRunDrp).toBeVisible();
   38 |   await expect(baselineScheduleDrp).toBeVisible();
   39 |   await expect(visitInferenceDashboardBtn).toBeVisible();
   40 |   await expect(visitGanttChartBtn).toBeVisible();
   41 |
   42 |   await expect(inferenceRunInfo).toBeVisible();
   43 |   await expect(baselineScheduleInfo).toBeVisible();
   44 |   await expect(inferenceDashboardInfo).toBeVisible();
   45 |
   46 |   await CheckHelperText({
   47 |     page: page,
   48 |     button: inferenceRunInfo,
   49 |     expectedText: configData.INFERENCE_RUN_DROPDOWN_INFO,
   50 |   });
   51 |
   52 |   await CheckHelperText({
   53 |     page: page,
   54 |     button: baselineScheduleInfo,
   55 |     expectedText: configData.BASELINE_SCENARIO_DROPDOWN_INFO,
   56 |   });
   57 |
   58 |   await CheckHelperText({
   59 |     page: page,
   60 |     button: inferenceDashboardInfo,
   61 |     expectedText: configData.INFERENCE_DASHBOARD_INFO,
   62 |   });
   63 | });
   64 |
   65 | test("TC_ANALYZE_002 -  should test dropdowns have correct options", async ({}) => {
   66 |   await inferenceRunDrp.click();
   67 |   expect(inferenceRunDrp.locator("option")).toHaveCount(2);
   68 |   const inferenceRunOptions = await inferenceRunDrp
   69 |     .locator("option")
   70 |     .allTextContents();
   71 |   expect(inferenceRunOptions).toContain("Inference Run 1");
   72 |
   73 |   await baselineScheduleDrp.click();
   74 |   expect(baselineScheduleDrp.locator("option")).toHaveCount(2);
   75 |   const baselineScheduleOptions = await baselineScheduleDrp
   76 |     .locator("option")
   77 |     .allTextContents();
   78 |   expect(baselineScheduleOptions).toContain("Baseline Schedule 1");
   79 | });
   80 |
   81 | test("TC_ANALYZE_003 - should test visit inference dashboard button works", async ({
   82 |   page,
   83 | }) => {
   84 |   await inferenceRunDrp.click();
   85 |   await inferenceRunDrp.selectOption("Inference Run 1");
   86 |
   87 |   await baselineScheduleDrp.click();
   88 |   await baselineScheduleDrp.selectOption("Baseline Schedule 1");
   89 |
   90 |   const [newPage] = await Promise.all([
>  91 |     page.waitForEvent("popup"),
      |          ^ Error: page.waitForEvent: Test timeout of 30000ms exceeded.
   92 |     visitInferenceDashboardBtn.click(),
   93 |   ]);
   94 |
   95 |   await expect(newPage).toHaveURL(
   96 |     "https://example.com/testing/inference/dashboard"
   97 |   );
   98 | });
   99 |
  100 | test("TC_ANALYZE_004 - should test visit gantt chart button works", async ({
  101 |   page,
  102 | }) => {
  103 |   await inferenceRunDrp.click();
  104 |   await inferenceRunDrp.selectOption("Inference Run 1");
  105 |   await baselineScheduleDrp.click();
  106 |   await baselineScheduleDrp.selectOption("Baseline Schedule 1");
  107 |
  108 |   await visitGanttChartBtn.click();
  109 |
  110 |   const iframe = page.locator("#ganttChartIframe");
  111 |   await expect(iframe).toBeVisible();
  112 | });
  113 |
```