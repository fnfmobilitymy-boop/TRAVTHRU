import {test,expect} from '@playwright/test';
test('three languages, Malay enquiry and localized date fields',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/?lang=ms');
 await expect(page.locator('html')).toHaveAttribute('lang','ms');
 await expect(page.locator('#language-toggle option')).toHaveCount(3);
 await expect(page.locator('.hero h1')).toContainText('Setiap perjalanan');
 await page.locator('#replay-welcome').click();await expect(page.locator('#welcome-booking')).toBeVisible();await page.locator('#close-welcome').click();
 await expect(page.locator('#booking-form .date-display')).toHaveText(/HH\/BB\/TTTT/);
 await page.locator('#language-toggle').selectOption('en');await expect(page.locator('#booking-form .date-display')).toHaveText(/DD\/MM\/YYYY/);
 await page.locator('#language-toggle').selectOption('zh');await expect(page.locator('#booking-form .date-display')).toHaveText(/年／月／日/);
 await page.locator('#language-toggle').selectOption('ms');
 await page.locator('#booking-form [name=name]').fill('Amin');await page.locator('#booking-form [name=email]').fill('amin@example.com');await page.locator('#booking-form [name=date]').fill('2027-03-24');await page.locator('#booking-form [name=message]').fill('KLIA ke KLCC');
 await page.locator('#booking-form button[type=submit]').click();await expect(page.locator('#trip-summary')).toContainText('Pertanyaan perjalanan');await expect(page.locator('#trip-summary')).toContainText('Nama: Amin');
 await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','ms');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
