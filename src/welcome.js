import {isEnglish,isMalay} from './i18n.js';
export function initWelcome({onPlan}){
 const intro=document.querySelector('#brand-intro'),envelope=document.querySelector('#welcome-envelope'),panel=document.querySelector('#welcome-booking'),form=document.querySelector('#welcome-form');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const storageKey='travthru-welcome-seen';
 let mode='transfer',generation=0,baseline=0,active=false;
 const timers=new Set();
 function schedule(fn,delay){const id=setTimeout(()=>{timers.delete(id);fn()},delay);timers.add(id)}
 function clearTimers(){timers.forEach(clearTimeout);timers.clear()}
 function remember(){try{sessionStorage.setItem(storageKey,'1')}catch{}}
 function close(){generation++;active=false;clearTimers();remember();intro.hidden=true;envelope.hidden=true;panel.classList.remove('is-visible');panel.hidden=true;document.body.classList.remove('welcome-active');}
 function reveal(){intro.classList.add('is-leaving');schedule(()=>intro.hidden=true,reduce?0:350);envelope.hidden=false;envelope.classList.remove('is-opening');void envelope.offsetWidth;envelope.classList.add('is-opening');schedule(()=>{if(!active)return;envelope.hidden=true;panel.hidden=false;document.body.classList.add('welcome-active');requestAnimationFrame(()=>panel.classList.add('is-visible'))},reduce?0:800)}
 function start(force=false){let seen=false;try{seen=sessionStorage.getItem(storageKey)==='1'}catch{}if(!force&&(seen||location.hash||scrollY>40))return;
  close();active=true;baseline=scrollY;intro.classList.remove('is-leaving');intro.hidden=false;panel.hidden=true;panel.classList.remove('is-visible');
  const current=generation;schedule(()=>{if(current===generation&&active)reveal()},reduce?100:1400);
 }
 document.querySelector('#skip-intro').addEventListener('click',()=>{clearTimers();reveal()});
 document.querySelector('#close-welcome').addEventListener('click',close);
 document.querySelector('#replay-welcome').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});start(true)});
 document.addEventListener('keydown',e=>{if(active&&e.key==='Escape')close()});
 addEventListener('scroll',()=>{if(active&&Math.abs(scrollY-baseline)>8)close()},{passive:true});
 const tabs=[...document.querySelectorAll('[data-welcome-mode]')];
 function setMode(next){mode=next;tabs.forEach(b=>{const chosen=b.dataset.welcomeMode===mode;b.setAttribute('aria-selected',chosen);b.tabIndex=chosen?0:-1});const hourly=mode==='hourly';document.querySelector('#welcome-to-label').hidden=hourly;document.querySelector('#welcome-hours-label').hidden=!hourly;document.querySelector('#swap-route').hidden=hourly;form.elements.to.required=!hourly;}
 tabs.forEach(b=>{b.addEventListener('click',()=>setMode(b.dataset.welcomeMode));b.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setMode(mode==='transfer'?'hourly':'transfer');tabs.find(b=>b.dataset.welcomeMode===mode).focus()}})});
 setMode('transfer');
 document.querySelector('#swap-route').addEventListener('click',()=>{const from=form.elements.from.value;form.elements.from.value=form.elements.to.value;form.elements.to.value=from});
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(Date.now()+86400000));form.elements.date.value=parts;
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));const service=mode==='hourly'?'按时包车':'点对点接送';
  const lines=isMalay()?[`Lokasi jemputan: ${data.from.trim()}`,mode==='hourly'?`Tempoh sewaan: ${data.hours} jam`:`Destinasi: ${data.to.trim()}`,`Masa jemputan: ${data.time} (waktu Malaysia)`,`Penumpang: ${data.people}`,`Bagasi: ${data.bags}`]:isEnglish()?[`Pick-up: ${data.from.trim()}`,mode==='hourly'?`Hire duration: ${data.hours} hours`:`Destination: ${data.to.trim()}`,`Pick-up time: ${data.time} (Malaysia time)`,`Guests: ${data.people}`,`Bags: ${data.bags}`]:[`出发地点：${data.from.trim()}`,mode==='hourly'?`包车时长：${data.hours} 小时`:`目的地：${data.to.trim()}`,`出发时间：${data.time}（马来西亚时间）`,`同行人数：${data.people}`,`行李数量：${data.bags}`];
  close();onPlan({service,date:data.date,people:data.people,message:lines.join('\n')});
 });
 // Reopening never restores personal input from storage; only the dismissal flag is retained.
 start();
}
