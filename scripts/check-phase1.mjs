import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {locales} from '../src/seo.js';

const origin = process.env.PHASE1_PREVIEW_URL || 'http://127.0.0.1:4173';
const artifactDir = process.env.PHASE1_ARTIFACT_DIR || 'artifacts/phase1';
fs.mkdirSync(artifactDir,{recursive:true});
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try {
 const noJs = await browser.newContext({javaScriptEnabled:false,userAgent:'Googlebot'});
 const raw = await noJs.newPage();
 for (const language of ['zh','en','ms']) {
  const response = await raw.goto(`${origin}/${locales[language].path}`);
  assert.equal(response.status(),200);
  const canon = await raw.locator('link[rel=canonical]').getAttribute('href');
  assert.equal(canon,`https://travthru.com/${locales[language].path}`);
  assert.deepEqual(await raw.locator('link[hreflang]').evaluateAll(nodes=>nodes.map(n=>[n.hreflang,n.getAttribute('href')])),[
   ['zh-CN','https://travthru.com/'],['en','https://travthru.com/en/'],['ms','https://travthru.com/ms/'],['x-default','https://travthru.com/'],
  ]);
  if (language==='en') {
   assert.equal(await raw.title(),'Chauffeur Service KL & Private Driver Malaysia | Travthru');
   assert.equal(await raw.locator('meta[name=description]').getAttribute('content'),locales.en.description);
   assert.equal((await raw.locator('h1').textContent()).replace(/\s+/g,' ').trim(),'Premium Chauffeur Service in Kuala Lumpur');
   assert(await raw.locator('.hero-brand-line').isVisible());
   assert(await raw.locator('.hero-whatsapp').isVisible());
   assert.equal(await raw.locator('.hero-whatsapp').getAttribute('href'),'https://wa.me/60107198186');
   assert((await raw.locator('.service-summary').textContent()).includes('outstation transfer'));
   assert((await raw.locator('.service-summary').textContent()).includes('hourly chauffeur service'));
   assert((await raw.locator('.service-card').allTextContents()).some(text=>text.includes('Corporate Chauffeur Service')));
   assert(!/24\s*(?:hour|\/7)|event transfers/i.test(await raw.locator('body').innerText()));
  } else {
   assert.equal(await raw.locator('.hero-brand-line,.hero-whatsapp').count(),0);
  }
 }
 await noJs.close();
 console.log('PASS Googlebot UA + no JavaScript: full English heading/copy/direct WhatsApp; all 3 canonical/hreflang sets unchanged');

 const context = await browser.newContext({reducedMotion:'reduce'});
 const page = await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const snapshots=[];
 for (const language of ['zh','en','ms']) {
  await page.goto(`${origin}/${locales[language].path}`);
  for (const [width,height] of [[320,740],[390,844],[768,1024],[1440,1000]]) {
   await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${language} ${width} overflow`);
   if(language==='en') {
    const h1=await page.locator('h1').boundingBox();
    const brand=await page.locator('.hero-brand-line').boundingBox();
    const link=await page.locator('.hero-whatsapp').boundingBox();
    const bottom=await page.locator('.hero-bottom').boundingBox();
    assert(h1.y+h1.height<=brand.y+1,`heading/brand overlap ${width}`);
    assert(link.y+link.height<bottom.y,`WhatsApp/hero footer overlap ${width}`);
    const imagePath=`${artifactDir}/english-${width}.png`;
    await page.screenshot({path:imagePath});
    snapshots.push({width,height,h1,brand,whatsapp:link,screenshot:imagePath});
   }
  }
 }
 // Check the built English hydration path, not only the Vite development server.
 await page.goto(`${origin}/en/`);
 await page.locator('#language-toggle').selectOption('zh');
 assert.equal(await page.locator('.hero-brand-line,.hero-whatsapp').count(),0);
 assert.equal(await page.locator('h1').textContent(),'每一程，都值得从容。');
 assert.equal(await page.locator('#experience h2').textContent(),'世界很大，美好从这一程开始。');
 await page.locator('#language-toggle').selectOption('ms');
 assert.equal(await page.locator('.hero-brand-line,.hero-whatsapp').count(),0);
 await page.locator('#language-toggle').selectOption('en');
 assert.equal((await page.locator('h1').textContent()).replace(/\s+/g,' ').trim(),'Premium Chauffeur Service in Kuala Lumpur');
 assert.equal(await page.locator('.hero-brand-line').count(),1);
 assert.deepEqual(errors,[]);
 fs.writeFileSync(`${artifactDir}/responsive-results.json`,JSON.stringify({snapshots,errors},null,2));
 console.log('PASS 3 languages x 4 viewports, hero layout, production-build language hydration and no pageerror');
 await context.close();
} finally { await browser.close(); }
