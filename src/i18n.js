import {englishCopy,syncEnglishHero} from './english-content.js';
import {ms} from './ms.js';
import {copy} from './translations.js';
import {updateSeo} from './seo-client.js';

let language='zh';
try { language=new URLSearchParams(location.search).get('lang') || (location.pathname.match(/\/(en|ms)\/?$/)?.[1]) || localStorage.getItem('travthru-language') || 'zh'; } catch {}
if(!['zh','en','ms'].includes(language))language='zh';
const reverse=new Map([...Object.entries(copy).map(([k,v])=>[v.trim(),k]),...Object.entries(englishCopy).map(([k,v])=>[v.trim(),k]),...Object.entries(copy).filter(([,v])=>ms[v]?.trim()).map(([k,v])=>[ms[v].trim(),k])]);
// Whitespace inside approved English phrases belongs to the translation, not
// the surrounding DOM. Avoid carrying it into Chinese when hydrating /en/.
function contentWhitespace(node,key){
 const value=englishCopy[key],text=node.textContent;
 if(value&&text.trim()===value.trim()&&text.includes(value)){
  const start=text.indexOf(value);
  return {leading:text.slice(0,start),trailing:text.slice(start+value.length)};
 }
 return {leading:text.match(/^\s*/)[0],trailing:text.match(/\s*$/)[0]};
}
const records=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){const node=walker.currentNode;if(node.parentElement.closest('script,style,pre'))continue;const raw=node.textContent.trim();if(!raw)continue;const declared=node.parentElement.getAttribute('data-copy-key');const key=copy[declared]?declared:copy[raw]?raw:reverse.get(raw);if(copy[key])records.push({node,key,...contentWhitespace(node,key)})}
const attributes=[];
document.querySelectorAll('[placeholder],[aria-label],[alt],[title]').forEach(el=>{for(const attr of ['placeholder','aria-label','alt','title']){const raw=el.getAttribute(attr);const key=copy[raw]?raw:reverse.get(raw);if(copy[key])attributes.push({el,attr,key})}});
// Values are stable identifiers, independent of the translated option labels.
document.querySelectorAll('option').forEach(option=>{if(!option.hasAttribute('value'))option.value=option.textContent});
export const t=key=>language==='ms'?(ms[copy[key]||key]||copy[key]||key):language==='en'?(englishCopy[key]||copy[key]||key):key;
export const isMalay=()=>language==='ms';
export const getLanguage=()=>language;
export const isEnglish=()=>language==='en';
export function applyLanguage(next){language=['en','ms'].includes(next)?next:'zh';document.documentElement.lang=language==='zh'?'zh-CN':language;records.forEach(({node,key,leading,trailing})=>{if(node.isConnected)node.textContent=leading+t(key)+trailing});attributes.forEach(({el,attr,key})=>el.setAttribute(attr,t(key)));
 syncEnglishHero(language);
 updateSeo(language);
 document.querySelector('#language-toggle').value=language;
 try{localStorage.setItem('travthru-language',language);const url=new URL(location.href);url.searchParams.delete('lang');url.pathname=url.pathname.replace(/(?:en|ms)\/?$/,'').replace(/index\.html$/,'').replace(/\/?$/,'/')+(language==='zh'?'':language+'/');history.replaceState(null,'',url)}catch{}
 document.dispatchEvent(new CustomEvent('languagechange',{detail:language}));
}
export function initLanguage(){applyLanguage(language);document.querySelector('#language-toggle').addEventListener('change',e=>applyLanguage(e.target.value))}
