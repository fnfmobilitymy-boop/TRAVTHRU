import {locales,pageUrl,productionOrigin} from './seo.js';
export function updateSeo(language){const data=locales[language];const base=document.querySelector('meta[name="seo-site-base"]')?.content||productionOrigin+'/';document.title=data.title;
 const set=(selector,content)=>{const el=document.querySelector(selector);if(el)el.content=content};
 set('meta[name="description"]',data.description);set('meta[property="og:title"]',data.title);set('meta[property="og:description"]',data.description);set('meta[property="og:url"]',pageUrl(language,base));set('meta[property="og:locale"]',data.og);set('meta[name="twitter:title"]',data.title);set('meta[name="twitter:description"]',data.description);
 const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=pageUrl(language,base);
 for(const link of document.querySelectorAll('[data-locale]'))link.href=pageUrl(link.dataset.locale,base);
}
