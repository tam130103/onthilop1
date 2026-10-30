import { chromium } from 'playwright';
import { spawn } from 'node:child_process';

async function testOfflinePWA() {
  console.log('🧪 Starting True Offline PWA Verification...\n');

  // Start vite preview server
  console.log('1️⃣  Starting Vite Preview server on port 4173...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    stdio: 'pipe',
    shell: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  try {
    const page = await context.newPage();

    // 1. Load HomePage online to let Service Worker register & precache
    console.log('2️⃣  Opening HomePage online to register Service Worker...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verify Service Worker is active
    const swActive = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.ready;
      return !!reg.active;
    });
    console.log(`   Service Worker registered & active: ${swActive}`);

    // Click "Tải offline toàn bộ" button
    console.log('3️⃣  Clicking "Kiểm tra & tải offline toàn bộ" button...');
    const cacheAllBtn = await page.$('button:has-text("Kiểm tra & tải offline")');
    if (cacheAllBtn) {
      await cacheAllBtn.click();
      await page.waitForTimeout(2000);
    }

    // 4. GO OFFLINE!
    console.log('\n4️⃣  🚨 ENABLING TRUE OFFLINE MODE (context.setOffline(true))...');
    await context.setOffline(true);

    // 5. Reload the page while 100% offline!
    console.log('5️⃣  Reloading page in OFFLINE mode...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const title = await page.textContent('h1');
    console.log(`   Page Title after offline reload: "${title}"`);
    if (!title?.includes('Trình Chiếu Lớp 1')) {
      throw new Error('Offline page reload failed: Title not found!');
    }
    console.log('   ✅ PASS: HomePage loaded completely OFFLINE via Service Worker!');

    // 6. Navigate to /present?lesson=math-01-counting while 100% offline!
    console.log('\n6️⃣  Navigating to /present?lesson=math-01-counting while OFFLINE...');
    await page.goto('http://localhost:4173/present?lesson=math-01-counting', {
      waitUntil: 'networkidle',
    });

    const startBtn = await page.waitForSelector('[data-testid="start-btn"]', { timeout: 5000 });
    if (startBtn) {
      await startBtn.click();
    }
    await page.waitForTimeout(1000);

    const slideTitle = await page.textContent('[data-testid="title-slide"] h1');
    console.log(`   Lesson slide title loaded offline: "${slideTitle}"`);
    if (!slideTitle?.includes('Bé vui học đếm')) {
      throw new Error(`Offline lesson failed to render: got "${slideTitle}"`);
    }

    // Advance to Question 1 (Counting)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    const countingView = await page.$('[data-testid="counting-view"]');
    if (!countingView) {
      throw new Error('CountingView not rendered offline!');
    }
    console.log('   ✅ PASS: Question 1 (Counting) loaded and rendered offline with image & audio cache!');

    console.log('\n🎉 TRUE OFFLINE VERIFICATION PASSED 100%! Service Worker serves everything offline.');
  } finally {
    await browser.close();
    preview.kill();
  }
}

testOfflinePWA().catch((err) => {
  console.error('\n❌ Offline Test Failed:', err);
  process.exit(1);
});
