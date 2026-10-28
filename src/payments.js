export function initPayments(){
 const section=document.querySelector('.footer-utilities');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 section.querySelectorAll('.payment-badge').forEach((badge,index)=>badge.style.setProperty('--payment-index',index));
 let visible=false;
 const sync=()=>section.classList.toggle('payment-motion-active',visible&&!preference.matches&&!document.hidden);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.15}).observe(section);
 preference.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
}
