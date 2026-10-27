import {test,expect} from '@playwright/test';
test('real journey carousel, full photos and keyboard controls',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/?lang=en');await page.locator('#real-journeys').scrollIntoViewIfNeeded();
 await expect(page.locator('.journey-card')).toHaveCount(20);await expect(page.locator('.gallery-enhanced')).toBeVisible();
 await expect(page.locator('#gallery-pause')).toHaveAttribute('aria-pressed','true');
 await page.locator('.journey-card').first().click();await expect(page.locator('#photo-dialog')).toBeVisible();
 await expect(page.locator('#photo-dialog-image')).toHaveAttribute('src',/journey-01\.webp$/);
 expect(await page.locator('#photo-dialog-image').evaluate(img=>img.decode().then(()=>img.naturalWidth>0))).toBe(true);
 await page.keyboard.press('ArrowRight');await expect(page.locator('#photo-dialog-image')).toHaveAttribute('src',/journey-02\.webp$/);
 await page.keyboard.press('Escape');await expect(page.locator('#photo-dialog')).toBeHidden();
 await page.locator('#gallery-next').click();await expect(page.locator('#gallery-index')).toHaveText('02');
 await page.locator('#language-toggle').selectOption('ms');await expect(page.locator('#gallery-pause')).toHaveText('Sambung putaran');
 expect(errors).toEqual([]);
});
test('mobile horizontal photo drag preserves vertical page scrolling',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/?lang=zh');await page.locator('#real-journeys').scrollIntoViewIfNeeded();
 const v=page.locator('.gallery-viewport');await expect(v).toHaveClass(/gallery-enhanced/);await v.scrollIntoViewIfNeeded();const box=await v.boundingBox();
 await page.mouse.move(box.x+box.width*.75,box.y+box.height*.4);await page.mouse.down();await page.mouse.move(box.x+box.width*.15,box.y+box.height*.4,{steps:12});await page.mouse.up();
 await expect(page.locator('#gallery-index')).not.toHaveText('01');await expect(page.locator('#photo-dialog')).toBeHidden();
 expect(await v.evaluate(el=>getComputedStyle(el).touchAction)).toBe('pan-y');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
