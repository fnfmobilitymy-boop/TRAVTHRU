import {getLanguage} from './i18n.js';
export function initDates(){
 const inputs=[...document.querySelectorAll('input[type=date]')];
 function render(input){const lang=getLanguage(),locale=lang==='zh'?'zh-CN':lang==='ms'?'ms-MY':'en-GB';input.lang=locale;const display=input.parentElement.querySelector('.date-display');display.textContent=input.value?new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(input.value+'T12:00:00')):lang==='zh'?'年／月／日':lang==='ms'?'HH/BB/TTTT':'DD/MM/YYYY';}
 for(const input of inputs){const wrap=document.createElement('span');wrap.className='localized-date';input.before(wrap);wrap.append(input);const display=document.createElement('span');display.className='date-display';display.setAttribute('aria-hidden','true');wrap.append(display);input.addEventListener('input',()=>render(input));input.addEventListener('change',()=>render(input));render(input)}
 document.addEventListener('languagechange',()=>inputs.forEach(render));
 // Programmatic values transferred from another planner also need an updated display.
 for(const input of inputs){const descriptor=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');Object.defineProperty(input,'value',{get(){return descriptor.get.call(this)},set(value){descriptor.set.call(this,value);render(this)}})}
}
