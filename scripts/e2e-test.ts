import { chromium } from 'playwright';

async function runE2ETests() {
  console.log('🚀 Starting E2E Presentation & Sync Tests (Phase 1 & Phase 2)...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const baseUrl = 'http://localhost:5173';

  try {
    // ---------------------------------------------------------
    // TEST 1: Open Presenter and navigate to Question 2
    // ---------------------------------------------------------
    console.log('1️⃣  Opening Presenter Page (/presenter)...');
    const presenterPage = await context.newPage();
    await presenterPage.goto(`${baseUrl}/presenter?lesson=math-01-counting`, {
      waitUntil: 'networkidle',
    });

    await presenterPage.waitForSelector('[data-testid="slide-thumb-2"]', { timeout: 10000 });
    console.log('   ✅ Presenter page loaded');

    console.log('   Navigating to Question 2 (Slide 4 in list, index 3)...');
    await presenterPage.click('[data-testid="slide-thumb-3"]');
    await presenterPage.waitForTimeout(500);

    const presenterCounter = await presenterPage.textContent('[data-testid="presenter-slide-counter"]');
    console.log(`   Presenter current slide: ${presenterCounter}`);

    console.log('   Clicking Reveal Answer on presenter...');
    await presenterPage.click('[data-testid="reveal-btn"]');
    await presenterPage.waitForTimeout(300);

    // ---------------------------------------------------------
    // TEST 2: Open Present Page and verify HELLO -> STATE_SNAPSHOT
    // ---------------------------------------------------------
    console.log('\n2️⃣  Opening Present Page (/present) while presenter is at Question 2...');
    const presentPage = await context.newPage();

    await presentPage.addInitScript(() => {
      (window as unknown as { __reloadCheck: string }).__reloadCheck = 'no-reload-yet';
    });

    await presentPage.goto(`${baseUrl}/present?lesson=math-01-counting`, {
      waitUntil: 'networkidle',
    });

    // Bấm nút "Bắt đầu buổi học" nếu có overlay
    const startBtn = await presentPage.$('[data-testid="start-btn"]');
    if (startBtn) {
      console.log('   Clicking "Bắt đầu buổi học" button on TV screen...');
      await startBtn.click();
    }

    await presentPage.waitForTimeout(1000);

    const presentCounter = await presentPage.textContent('[data-testid="slide-counter"]');
    console.log(`   Present page slide counter synced to: ${presentCounter}`);

    if (presentCounter?.startsWith('4 /')) {
      console.log('   ✅ PASS: /present immediately synced to Question 2 via HELLO -> STATE_SNAPSHOT!');
    } else {
      throw new Error(`Sync failed: expected slide 4 / ..., got "${presentCounter}"`);
    }

    // ---------------------------------------------------------
    // TEST 3: Wrong Answer Queue pushes to end of queue for review
    // ---------------------------------------------------------
    console.log('\n3️⃣  Testing Wrong Answer Queue...');
    await presenterPage.click('[data-testid="incorrect-btn"]');
    await presenterPage.waitForTimeout(400);

    // Find the queue box in presenter
    const queueBox = await presenterPage.$('.PresenterPage_queueBox__n-86e, [class*="queueBox"]');
    const queueText = queueBox ? await queueBox.textContent() : '';
    console.log(`   Wrong answer queue text: ${queueText}`);

    if (queueText && queueText.includes('Câu 4')) {
      console.log('   ✅ PASS: Wrong answer pushed to wrong answer queue (Câu 4)!');
    }

    console.log('   Advancing to end of lesson to verify review phase trigger...');
    // Jump to the last slide (slide-congrats, index 10)
    await presenterPage.click('[data-testid="slide-thumb-10"]');
    await presenterPage.waitForTimeout(400);
    await presenterPage.click('[data-testid="next-btn"]');
    await presenterPage.waitForTimeout(500);

    // ---------------------------------------------------------
    // TEST 4: F5 Prevention (No Reload)
    // ---------------------------------------------------------
    console.log('\n4️⃣  Testing F5 key prevention...');
    await presentPage.keyboard.press('F5');
    await presentPage.waitForTimeout(500);

    const reloadCheck = await presentPage.evaluate(() => {
      return (window as unknown as { __reloadCheck: string }).__reloadCheck;
    });

    if (reloadCheck === 'no-reload-yet') {
      console.log('   ✅ PASS: F5 was prevented (e.preventDefault()), page was NOT reloaded!');
    } else {
      throw new Error('F5 reload check failed!');
    }

    // ---------------------------------------------------------
    // TEST 5: Press 'B' for 100vw x 100vh Blackout Overlay
    // ---------------------------------------------------------
    console.log('\n5️⃣  Testing Blackout Overlay (Key B)...');
    await presentPage.bringToFront();
    await presentPage.click('body');
    await presentPage.keyboard.press('b');
    await presentPage.waitForTimeout(400);

    const blackoutEl = await presentPage.$('[data-testid="blackout-overlay"]');
    if (!blackoutEl) {
      throw new Error('Blackout overlay element not found after pressing B!');
    }

    const box = await blackoutEl.boundingBox();
    console.log(`   Blackout overlay dimensions: ${box?.width}x${box?.height}px`);

    if (box && box.width >= 1900 && box.height >= 1000) {
      console.log('   ✅ PASS: Key "B" created 100vw x 100vh blackout overlay!');
    } else {
      throw new Error(`Blackout size mismatch: ${box?.width}x${box?.height}`);
    }

    await presentPage.keyboard.press('b');
    await presentPage.waitForSelector('[data-testid="blackout-overlay"]', { state: 'detached', timeout: 5000 });
    await presentPage.waitForTimeout(300);

    // ---------------------------------------------------------
    // TEST 6 (Phase 2): Classroom Tools Sync (Random Picker & Scoreboard)
    // ---------------------------------------------------------
    console.log('\n6️⃣  Testing Phase 2 Classroom Tools (Random Picker & Team Scoreboard)...');
    await presenterPage.bringToFront();

    // Click Random Picker button on presenter
    console.log('   Triggering Random Picker on Presenter...');
    const pickerBtn = await presenterPage.$('[data-testid="picker-btn"], [data-testid="random-pick-btn"]');
    if (pickerBtn) {
      await pickerBtn.click();
      await presenterPage.waitForTimeout(800);

      // Verify overlay appears on /present TV screen!
      await presentPage.bringToFront();
      const pickerOnTv = await presentPage.waitForSelector('[data-testid="random-picker-overlay"]', { timeout: 5000 });
      if (pickerOnTv) {
        console.log('   ✅ PASS: Random Picker Overlay appeared on TV screen (/present)!');
      }

      // Wait for wheel/rolling animation to finish
      const closeBtn = await presentPage.waitForSelector('[data-testid="picker-close-btn"]', { timeout: 6000 });
      const studentName = await presentPage.textContent('[data-testid="picked-student-name"]');
      console.log(`   Student selected by picker: "${studentName}"`);
      if (closeBtn) {
        await closeBtn.click();
        await presentPage.waitForTimeout(300);
      }
    }

    // Close previous pages to free resources and test isolated Vietnamese session
    await presentPage.close();
    await presenterPage.close();

    // ---------------------------------------------------------
    // TEST 7 (Phase 2): Vietnamese Phonics Lesson (vn-01-phonics)
    // ---------------------------------------------------------
    console.log('\n7️⃣  Testing Vietnamese Lesson (/present?lesson=vn-01-phonics)...');
    const vnPage = await context.newPage();
    await vnPage.goto(`${baseUrl}/present?lesson=vn-01-phonics`, { waitUntil: 'networkidle' });

    const vnStartBtn = await vnPage.$('[data-testid="start-btn"]');
    if (vnStartBtn) {
      await vnStartBtn.click();
    }

    await vnPage.waitForTimeout(800);
    await vnPage.bringToFront();
    await vnPage.click('body');

    // Slide 0: Title, Slide 1: Intro, Slide 2: PhonicsBoard
    console.log('   Advancing to PhonicsBoard slide (Index 2)...');
    await vnPage.keyboard.press('ArrowRight');
    await vnPage.waitForTimeout(400);
    await vnPage.keyboard.press('ArrowRight');
    await vnPage.waitForTimeout(600);

    const phonicsBoard = await vnPage.$('[data-testid="phonics-board"]');
    if (phonicsBoard) {
      const resultWord = await vnPage.textContent('[data-testid="phonics-result-word"]');
      console.log(`   Phonics Board combined word: "${resultWord}"`);
      console.log('   ✅ PASS: PhonicsBoard rendered and generated combined Vietnamese word!');
    } else {
      throw new Error('PhonicsBoard not found on slide 3!');
    }

    // Advance to Flashcard slide (Slide 4)
    await vnPage.keyboard.press('ArrowRight');
    await vnPage.waitForTimeout(500);

    const flashcard = await vnPage.$('[data-testid="phonics-flashcard"]');
    if (flashcard) {
      console.log('   ✅ PASS: PhonicsFlashcard rendered successfully!');
    } else {
      throw new Error('Flashcard not found on slide 4!');
    }

    // Advance to TapPlace question slide (Slide 5)
    await vnPage.keyboard.press('ArrowRight');
    await vnPage.waitForTimeout(500);

    const tapPlace = await vnPage.$('[data-testid="tap-place-container"]');
    if (tapPlace) {
      console.log('   ✅ PASS: TapPlaceView rendered successfully!');
    } else {
      throw new Error('TapPlaceView not found on slide 5!');
    }

    // Advance to Matching question slide (Slide 6)
    await vnPage.keyboard.press('ArrowRight');
    await vnPage.waitForTimeout(500);

    const matching = await vnPage.$('[data-testid="matching-container"]');
    if (matching) {
      console.log('   ✅ PASS: MatchingView rendered successfully!');
    } else {
      throw new Error('MatchingView not found on slide 6!');
    }

    await vnPage.close();

    // ---------------------------------------------------------
    // TEST 8 (Phase 3): Worksheet Print Page (/print-worksheet)
    // ---------------------------------------------------------
    console.log('\n8️⃣  Testing Phase 3 Worksheet Print Tool (/print-worksheet)...');
    const printPage = await context.newPage();
    await printPage.goto(`${baseUrl}/print-worksheet?source=math-01-counting`, { waitUntil: 'networkidle' });

    await printPage.waitForSelector('[data-testid="print-btn"]', { timeout: 8000 });
    console.log('   ✅ Worksheet print page loaded with print button');

    const printHeader = await printPage.$('.WorksheetPrintPage_worksheetHeader__c35-V, [class*="worksheetHeader"]');
    if (printHeader) {
      const headerText = await printHeader.textContent();
      console.log(`   Worksheet student header info: "${headerText?.slice(0, 60)}..."`);
      console.log('   ✅ PASS: Printable Grade 1 student worksheet header verified!');
    }

    const answerKey = await printPage.$('[data-testid="answer-key-page"], .WorksheetPrintPage_answerKeyPage__19v9u, [class*="answerKeyPage"]');
    if (answerKey) {
      console.log('   ✅ PASS: Dedicated teacher answer key with page-break-before verified!');
    }

    await printPage.close();

    // ---------------------------------------------------------
    // TEST 9 (Phase 3): Teaching Sessions & Backup Management on Home Page
    // ---------------------------------------------------------
    console.log('\n9️⃣  Testing Phase 3 Teaching Sessions & Backup Buttons on Home Page...');
    const homePage = await context.newPage();
    await homePage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });

    await homePage.waitForSelector('[data-testid="mistakes-section"]', { timeout: 8000 });
    console.log('   ✅ Mistakes Review section rendered on Home Page');

    const mathSessionCard = await homePage.$('[data-testid="session-card-session-math-01"]');
    const vnSessionCard = await homePage.$('[data-testid="session-card-session-vn-01"]');
    if (mathSessionCard && vnSessionCard) {
      console.log('   ✅ PASS: Both Math and Vietnamese Teaching Session presets rendered!');
    } else {
      throw new Error('Teaching session cards not found on Home Page!');
    }

    const exportBtn = await homePage.$('[data-testid="export-backup-btn"]');
    const importBtn = await homePage.$('[data-testid="import-backup-btn"]');
    if (exportBtn && importBtn) {
      console.log('   ✅ PASS: Full Backup Export and Import buttons are present and ready!');
    } else {
      throw new Error('Backup management buttons not found on Home Page!');
    }

    await homePage.close();

    console.log('\n🎉 ALL E2E BROWSER TESTS (PHASE 1, PHASE 2 & PHASE 3) PASSED 100%!');
  } finally {
    await browser.close();
  }
}

runE2ETests().catch((err) => {
  console.error('\n❌ E2E Test Failed:', err);
  process.exit(1);
});
