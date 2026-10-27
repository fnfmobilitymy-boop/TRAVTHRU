import {test,expect} from '@playwright/test';

test('supplied hero film autoplays once and holds its final static frame',async({page})=>{
 await page.addInitScript(()=>{sessionStorage.setItem('travthru-welcome-seen','1');window.brandEnded=0;document.addEventListener('ended',e=>{if(e.target.id==='hero-brand-video')window.brandEnded++},true)});
 await page.goto('/?lang=en');
 const video=page.locator('#hero-brand-video'),frame=page.locator('#hero-branding');
 await expect(frame).toHaveAttribute('data-state','playing',{timeout:10000});
 expect(await video.evaluate(v=>({muted:v.muted,inline:v.playsInline,loop:v.loop,autoplay:v.autoplay,preload:v.preload}))).toEqual({muted:true,inline:true,loop:false,autoplay:true,preload:'none'});
 const bounds=await frame.boundingBox();expect(bounds.width).toBeLessThan(500);
 await expect(frame).toHaveAttribute('data-state','static',{timeout:10000});
 expect(await page.evaluate(()=>window.brandEnded)).toBe(1);
 await expect(frame.locator('img')).toBeVisible();
 await expect(video.locator('source[src]')).toHaveCount(0);
 await page.evaluate(()=>window.scrollTo({top:100,behavior:'instant'}));
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await expect(frame).toHaveAttribute('data-state','static');
});

test('MP4 remains playable when the WebM source is unavailable',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('travthru-welcome-seen','1'));
 await page.route('**/videos/*.webm',route=>route.abort());
 await page.goto('/?lang=en');
 await expect(page.locator('#hero-branding')).toHaveAttribute('data-state','playing',{timeout:10000});
 expect(await page.locator('#hero-brand-video').evaluate(video=>video.currentSrc)).toMatch(/\.mp4$/);
});

test('reduced motion uses the final image without requesting any video',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const requests=[];page.on('request',r=>{if(/\.(mp4|webm)(\?|$)/.test(r.url()))requests.push(r.url())});
 await page.goto('/?lang=en');
 await expect(page.locator('#hero-branding')).toHaveAttribute('data-state','static');
 await expect(page.locator('#hero-branding img')).toBeVisible();
 expect(await page.evaluate(()=>[...document.body.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).every(n=>!n.textContent.trim()))).toBe(true);
 expect(await page.locator('#hero-branding img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 await expect(page.locator('#hero-brand-video source[src]')).toHaveCount(0);
 await expect(page.locator('#welcome-booking')).toBeVisible();
 expect(requests).toEqual([]);
});

test('failed media preserves the logo and leaves booking and navigation working',async({page})=>{
 await page.route('**/videos/**',route=>route.abort());
 await page.goto('/?lang=en');
 await expect(page.locator('#hero-branding')).toHaveAttribute('data-state','static',{timeout:10000});
 await expect(page.locator('#hero-branding img')).toBeVisible();
 await expect(page.locator('#welcome-booking')).toBeVisible({timeout:11000});
 await page.locator('#close-welcome').click();
 await page.locator('.nav nav a[href="#fleet"]').click();
 await expect(page.locator('#fleet-name')).toBeVisible();
});

test('changing to reduced motion stops an active animation',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('travthru-welcome-seen','1'));
 await page.goto('/?lang=en');
 await expect(page.locator('#hero-branding')).toHaveAttribute('data-state','playing',{timeout:10000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('#hero-branding')).toHaveAttribute('data-state','static');
 await expect(page.locator('#hero-brand-video source[src]')).toHaveCount(0);
});
