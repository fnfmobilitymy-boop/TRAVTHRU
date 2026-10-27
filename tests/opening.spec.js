import {test,expect} from '@playwright/test';

test('five-second opening has original audio, no sound button, then reveals the website',async({page})=>{
 await page.goto('/?lang=en');
 const video=page.locator('#opening-video');
 await expect(page.locator('#brand-opening')).toBeVisible();
 await expect(page.locator('#opening-sound')).toHaveCount(0);
 await expect.poll(()=>video.evaluate(v=>Number.isFinite(v.duration)?v.duration:0)).toBeGreaterThan(4.9);
 expect(await video.evaluate(v=>v.duration)).toBeLessThan(5.2);
 await video.click();
 await expect.poll(()=>video.evaluate(v=>!v.muted&&!v.paused)).toBe(true);
 const size=await page.locator('#brand-opening').boundingBox();expect(size.width).toBe(1440);expect(size.height).toBe(1000);
 await expect(page.locator('#brand-opening')).toBeHidden({timeout:10000});
 await expect(page.locator('#welcome-booking')).toBeHidden();
 await expect(page.locator('.hero h1')).toBeVisible();
 await expect(page.locator('#brand-opening')).toBeHidden();
 expect(await video.evaluate(v=>v.paused&&!v.hasAttribute('src'))).toBe(true);
 expect(await page.locator('#header-brand-video').evaluate(v=>v.muted)).toBe(true);
});

test('scrolling closes opening and stops sound without returning',async({page})=>{
 await page.goto('/?lang=en');
 await expect(page.locator('#brand-opening')).toBeVisible();
 await page.locator('#opening-video').click();
 await page.mouse.wheel(0,180);
 await expect(page.locator('#brand-opening')).toBeHidden();
 expect(await page.locator('#opening-video').evaluate(v=>v.paused&&!v.hasAttribute('src'))).toBe(true);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await expect(page.locator('#brand-opening')).toBeHidden();
 await page.locator('#replay-opening').click();
 await expect(page.locator('#brand-opening')).toBeVisible();
 await page.locator('#opening-skip').click();
 await expect(page.locator('#welcome-booking')).toBeHidden();
 await expect(page.locator('.hero h1')).toBeVisible();
});
