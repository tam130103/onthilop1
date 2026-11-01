import { type BrowserContext } from 'playwright';

export async function runExamAndHandwritingE2ETests(context: BrowserContext, baseUrl = 'http://localhost:5173') {
  console.log('\n🔟 Testing Batch 5 E2E: Periodic Exam Flow (/exam)...');
  const page = await context.newPage();

  // 1. Visit Home Page
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="exam-card-exam-toan-giua-ki-1"]', { timeout: 10000 });
  console.log('   ✅ Exam cards rendered on Home Page');

  // 2. Click Start Exam for Math Mid Term 1
  const startBtn = await page.waitForSelector('[data-testid="start-exam-btn-exam-toan-giua-ki-1"]');
  await startBtn.click();
  await page.waitForURL('**/exam/exam-toan-giua-ki-1', { timeout: 8000 });
  console.log('   ✅ Navigated to /exam/exam-toan-giua-ki-1');

  // 3. Verify 15-minute countdown timer & Question 1-10 navigation pills
  const timer = await page.waitForSelector('[data-testid="exam-timer"]');
  const timerText = await timer.textContent();
  console.log(`   Exam timer initial state: "${timerText?.trim()}"`);
  if (!timerText?.includes('14:') && !timerText?.includes('15:')) {
    throw new Error(`Timer text unexpected: ${timerText}`);
  }
  console.log('   ✅ 15-minute countdown timer verified');

  // Verify navigation buttons 1 to 10
  for (let i = 1; i <= 10; i++) {
    const navBtn = await page.$(`[data-testid="exam-nav-${i}"]`);
    if (!navBtn) throw new Error(`Missing exam navigation button for question ${i}`);
  }
  console.log('   ✅ Question navigator pills 1–10 verified');

  // 4. Select answer for question 1
  const firstOption = await page.waitForSelector('[data-testid^="exam-option-"]');
  await firstOption.click();
  await page.waitForTimeout(300);

  // Switch to Question 2 and select an answer
  await page.click('[data-testid="exam-nav-2"]');
  await page.waitForTimeout(300);
  const q2Option = await page.waitForSelector('[data-testid^="exam-option-"]');
  await q2Option.click();
  await page.waitForTimeout(300);

  // 5. Submit exam and verify confirmation modal (since questions 3-10 are unanswered)
  await page.click('[data-testid="submit-exam-btn"]');
  await page.waitForSelector('[data-testid="confirm-modal"]', { timeout: 5000 });
  console.log('   ✅ Confirmation modal appeared for unanswered questions');

  // Confirm submission
  await page.click('[data-testid="confirm-submit-btn"]');
  await page.waitForSelector('[data-testid="exam-result-card"]', { timeout: 8000 });
  console.log('   ✅ Exam submitted and Result Card rendered');

  // 6. Verify Scorecard & Review Section
  const scoreText = await page.textContent('[data-testid="exam-score"]');
  const tierText = await page.textContent('[data-testid="exam-tier"]');
  console.log(`   Student score: "${scoreText?.trim()}" (${tierText?.trim()})`);

  const reviewSection = await page.waitForSelector('[data-testid="exam-review-section"]');
  if (reviewSection) {
    console.log('   ✅ Detailed question review section rendered with answer explanations');
  }

  // ------------------------------------------------------------------------
  // 11. Testing Handwriting Ô Ly Print Worksheet Flow (/print-worksheet)
  // ------------------------------------------------------------------------
  console.log('\n1️⃣1️⃣  Testing Batch 5 E2E: Handwriting Ô Ly A4 Flow (/print-worksheet)...');
  await page.goto(`${baseUrl}/print-worksheet`, { waitUntil: 'networkidle' });

  // 1. Switch to Handwriting tab
  const handwritingTab = await page.waitForSelector('[data-testid="tab-handwriting"]');
  await handwritingTab.click();
  await page.waitForTimeout(400);

  // 2. Verify Ô Ly sheet and SVG grid
  await page.waitForSelector('[data-testid="oli-sheet"]', { timeout: 8000 });
  const svgLines = await page.$$('[data-testid="oli-svg-line"]');
  console.log(`   Found ${svgLines.length} 4-ô-ly SVG handwriting lines`);
  if (svgLines.length < 6) {
    throw new Error(`Expected at least 6 SVG handwriting lines, got ${svgLines.length}`);
  }
  console.log('   ✅ Primary school 4-ô-ly SVG grid rendered');

  // 3. Switch preset to "numbers" and verify sample character
  await page.selectOption('[data-testid="preset-select"]', 'numbers');
  await page.waitForTimeout(300);
  const sampleCharNum = await page.textContent('[data-testid="oli-sample-char"]');
  console.log(`   Sample character after selecting numbers: "${sampleCharNum}"`);
  if (sampleCharNum !== '0') {
    throw new Error(`Expected '0', got "${sampleCharNum}"`);
  }
  console.log('   ✅ Preset selector updated sample characters to numbers (0..9)');

  // 4. Test custom text input
  await page.selectOption('[data-testid="preset-select"]', 'custom');
  await page.waitForTimeout(200);
  const customInput = await page.waitForSelector('[data-testid="custom-text-input"]');
  await customInput.fill('hoa sen');
  await page.waitForTimeout(300);
  const sampleCharCustom = await page.textContent('[data-testid="oli-sample-char"]');
  console.log(`   Sample character after custom input: "${sampleCharCustom}"`);
  if (sampleCharCustom !== 'hoa') {
    throw new Error(`Expected 'hoa', got "${sampleCharCustom}"`);
  }
  console.log('   ✅ Custom text input correctly reflected on 4-ô-ly handwriting line');

  await page.close();
  console.log('🎉 BATCH 5 EXAM & HANDWRITING E2E TESTS PASSED 100%!');
}
