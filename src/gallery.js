import {journeyPhotos} from './journey-photos.js';
import {getLanguage,t} from './i18n.js';
export function initGallery(){
 const section=document.querySelector('#real-journeys'),viewport=section.querySelector('.gallery-viewport'),ring=section.querySelector('.photo-ring'),cards=[...ring.querySelectorAll('.journey-card')],dialog=document.querySelector('#photo-dialog'),image=document.querySelector('#photo-dialog-image');
 const preference=matchMedia('(prefers-reduced-motion: reduce)'),step=360/cards.length;
 let angle=0,frame=0,last=0,visible=false,ready=false,paused=preference.matches,hover=false,focused=false,drag=null,ignoreClickUntil=0,opened=0;
 function label(i){return journeyPhotos[i][getLanguage()]}
 function current(){return ((Math.round(-angle/step)%cards.length)+cards.length)%cards.length}
 function render(){ring.style.transform=`translateZ(calc(-1 * var(--gallery-radius))) rotateY(${angle}deg)`;document.querySelector('#gallery-index').textContent=String(current()+1).padStart(2,'0')}
 function prepare(){if(ready)return;ready=true;viewport.classList.add('gallery-enhanced');cards.forEach((card,i)=>{card.style.transform=`rotateY(${i*step}deg) translateZ(var(--gallery-radius))`;card.querySelector('.base-photo').loading='eager'});render()}
 function shouldRun(){return ready&&visible&&!paused&&!hover&&!focused&&!drag&&!dialog.open&&!preference.matches&&!document.hidden}
 function tick(now){frame=0;if(!shouldRun()){last=0;return}const elapsed=last?Math.min(now-last,50):0;last=now;angle-=elapsed*.0045;render();frame=requestAnimationFrame(tick)}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(shouldRun())frame=requestAnimationFrame(tick)}
 function move(direction){prepare();paused=true;angle=-Math.round(-angle/step)*step-direction*step;render();updatePause();sync()}
 function updatePause(){const button=document.querySelector('#gallery-pause');button.textContent=t(paused?'继续旋转':'暂停旋转');button.setAttribute('aria-pressed',String(paused))}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)prepare();sync()},{rootMargin:'200px',threshold:0});observer.observe(viewport);
 viewport.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;sync()}});viewport.addEventListener('pointerleave',()=>{hover=false;sync()});viewport.addEventListener('focusin',e=>{focused=true;const card=e.target.closest('.journey-card');if(card&&card.matches(':focus-visible')){angle=-Number(card.dataset.photo)*step;render()}sync()});viewport.addEventListener('focusout',e=>{if(!viewport.contains(e.relatedTarget)){focused=false;sync()}});
 viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;prepare();drag={x:e.clientX,y:e.clientY,angle,moved:false};sync()});
 viewport.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.abs(dy)>Math.abs(dx)+10){drag=null;sync();return}if(Math.abs(dx)>8)drag.moved=true;if(drag.moved){angle=drag.angle+dx*.11;render()}});
 function finish(){if(!drag)return;if(drag.moved){ignoreClickUntil=performance.now()+300;paused=true;updatePause()}drag=null;sync()}
 window.addEventListener('pointerup',finish);viewport.addEventListener('pointercancel',finish);
 viewport.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
 document.querySelector('#gallery-prev').addEventListener('click',()=>move(-1));document.querySelector('#gallery-next').addEventListener('click',()=>move(1));document.querySelector('#gallery-pause').addEventListener('click',()=>{paused=!paused;updatePause();sync()});
 function showPhoto(index){opened=(index+cards.length)%cards.length;const photo=journeyPhotos[opened];const source=cards[opened].querySelector('.base-photo').src;image.src=new URL(photo.id+'.webp',source).href;image.alt=label(opened);document.querySelector('#photo-dialog-caption').textContent=label(opened);document.querySelector('#photo-dialog-index').textContent=`${String(opened+1).padStart(2,'0')} / ${cards.length}`;if(!dialog.open){dialog.showModal();document.body.classList.add('photo-viewing')}sync()}
 cards.forEach((card,i)=>card.addEventListener('click',()=>{if(performance.now()<ignoreClickUntil)return;showPhoto(i)}));
 document.querySelector('#photo-dialog-close').addEventListener('click',()=>dialog.close());document.querySelector('#photo-dialog-prev').addEventListener('click',()=>showPhoto(opened-1));document.querySelector('#photo-dialog-next').addEventListener('click',()=>showPhoto(opened+1));dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showPhoto(opened+(e.key==='ArrowRight'?1:-1))}});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.body.classList.remove('photo-viewing');image.removeAttribute('src');sync()});
 document.addEventListener('languagechange',()=>{updatePause();if(dialog.open)showPhoto(opened)});document.addEventListener('visibilitychange',sync);preference.addEventListener('change',()=>{if(preference.matches)paused=true;updatePause();sync()});
 updatePause();
}
