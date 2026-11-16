import {test,expect} from '@playwright/test';

test('approved English content survives language switches without changing Chinese or Malay branding',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/en/');
 await expect(page.locator('h1')).toHaveText('Premium Chauffeur Service in Kuala Lumpur');
 await expect(page.locator('.hero-brand-line')).toHaveText('Every journey, beautifully taken care of.');
 await expect(page.locator('#experience h2')).toHaveText('Private Chauffeur Service in Malaysia.');
 await expect(page.locator('#services .section-heading h2')).toHaveText('Professional Chauffeur Service in Kuala Lumpur');
 await expect(page.locator('.service-summary')).toContainText('hourly chauffeur service');
 await expect(page.locator('.service-summary')).toContainText('outstation transfer');
 await page.locator('#booking-form [name=name]').fill('Alex');
 await page.locator('#language-toggle').selectOption('zh');
 await expect(page.locator('h1')).toHaveText('每一程，都值得从容。');
 await expect(page.locator('.hero-brand-line,.hero-whatsapp')).toHaveCount(0);
 await expect(page.locator('#experience h2')).toHaveText('世界很大，美好从这一程开始。');
 await page.locator('#language-toggle').selectOption('ms');
 await expect(page.locator('h1')).toContainText('Setiap perjalanan');
 await expect(page.locator('.hero-brand-line,.hero-whatsapp')).toHaveCount(0);
 await page.locator('#language-toggle').selectOption('en');
 await expect(page.locator('h1')).toHaveText('Premium Chauffeur Service in Kuala Lumpur');
 await expect(page.locator('.hero-brand-line')).toHaveCount(1);
 await expect(page.locator('.hero-whatsapp')).toHaveCount(1);
 await expect(page.locator('#booking-form [name=name]')).toHaveValue('Alex');
});

test('direct WhatsApp enquiry works on mobile without completing either planner',async({page,context})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:390,height:844});
 await context.route('https://wa.me/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<p>Intercepted WhatsApp navigation; no message sent.</p>'}));
 await page.goto('/en/');
 await expect(page.locator('#booking-form [name=name]')).toHaveValue('');
 await expect(page.locator('#booking-form [name=email]')).toHaveValue('');
 await expect(page.locator('#form-result')).toBeHidden();
 const direct=page.locator('.hero-whatsapp');
 await expect(direct).toBeVisible();
 await expect(direct).toHaveAttribute('href','https://wa.me/60107198186');
 const popupPromise=page.waitForEvent('popup');
 await direct.click();
 const popup=await popupPromise;
 await expect(popup).toHaveURL('https://wa.me/60107198186');
 await popup.close();
 await expect(page.locator('#form-result')).toBeHidden();
 await expect(page.locator('.floating-contact')).toHaveAttribute('href','https://wa.me/60107198186');
});
