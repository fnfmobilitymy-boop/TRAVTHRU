import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/noto-serif-sc/400.css';
import {t,isEnglish,initLanguage} from './i18n.js';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n,a=0,b=1) => Math.min(b,Math.max(a,n));
const smooth = n => {n=clamp(n);return n*n*(3-2*n)};
const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
$$('input[type="date"]').forEach(el=>el.min=today);
$('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});
$$('.reveal').forEach(el=>observer.observe(el));
function closeMenu(){$('.nav nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').setAttribute('aria-label',t('打开导航'));$('.menu-toggle').textContent='☰'}
$('.menu-toggle').addEventListener('click',()=>{const open=$('.nav nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',open);$('.menu-toggle').setAttribute('aria-label',t(open?'关闭导航':'打开导航'));$('.menu-toggle').textContent=open?'×':'☰'});
$$('.nav nav a').forEach(a=>a.addEventListener('click',closeMenu));
let toastTimer;
function toast(message){$('.toast').textContent=t(message);$('.toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').classList.remove('show'),4000)}
const dialog=$('#info-dialog');let dialogTarget='booking';
function showInfo(title,copy,target='booking'){dialogTarget=target;$('#dialog-title').textContent=t(title);$('#dialog-copy').textContent=t(copy);$('#dialog-action').textContent=t(target?'开始规划':'知道了');dialog.showModal()}
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
$('#dialog-action').addEventListener('click',()=>{dialog.close();if(dialogTarget)$('#'+dialogTarget).scrollIntoView({behavior:reduced?'instant':'smooth'})});
$('#privacy-button').addEventListener('click',()=>showInfo('你的行程，属于你。','此版本的行程表单只在当前浏览器中生成摘要，不会自动向服务器发送个人资料，也不会持久保存你的输入。当你选择 WhatsApp 咨询时，行程摘要会传递至 WhatsApp，由你核对后决定是否发送。复制或下载后，请自行妥善保管。',null));
const bookingForm=$('#booking-form');
function plan(service,message=''){if(service)bookingForm.elements.service.value=service;if(message)bookingForm.elements.message.value=message;$('#booking').scrollIntoView({behavior:reduced?'instant':'smooth'});}
$$('.service-card').forEach(card=>card.addEventListener('click',()=>plan(card.dataset.service)));
$$('.destination').forEach(card=>card.addEventListener('click',()=>plan('定制旅游',isEnglish()?`I would like to visit ${t(card.dataset.destination)}. Please suggest an itinerary and a suitable vehicle.`:`我想前往${card.dataset.destination}，请帮我规划路线及推荐合适的车型。`)));
$('#quick-submit').addEventListener('click',()=>{if($('#quick-date').value&&$('#quick-date').value<today){toast('请选择今天或之后的出发日期。');return}bookingForm.elements.date.value=$('#quick-date').value;const location=t($('#quick-location').value);plan($('#quick-service').value,isEnglish()?`Pick-up location: ${location}\nDestination: \nFlight / luggage: `:`出发地点：${location}\n目的地：\n航班 / 行李数量：`)});
const vehicles=[
{seat:'5',category:'COMPACT & EASY',name:'Perodua Myvi',subtitle:'轻松穿行城市，刚刚好的自在。',vehicle:'Perodua Myvi / 同级轿车',pos:'0% 0%',bags:'小型行李 · 依实际数量确认'},
{seat:'6',category:'BUSINESS CLASS',name:'Hyundai Staria',subtitle:'Staria / Starex，给旅程多一点空间。',vehicle:'Hyundai Staria / Starex',pos:'50% 0%',bags:'商务接待 · 配置需确认'},
{seat:'7',category:'EXECUTIVE MPV',name:'Toyota Alphard',subtitle:'Alphard / Vellfire，让每位同行者拥有贵宾席。',vehicle:'Toyota Alphard / Vellfire',pos:'100% 0%',bags:'行李空间按人数确认'},
{seat:'10',category:'TRAVEL TOGETHER',name:'Passenger Van',subtitle:'朋友同行，一路都有好风景。',vehicle:'10 座 VAN',pos:'50% 100%',bags:'团体出行 · 行李空间需确认'},
{seat:'16',category:'MORE ROOM TO EXPLORE',name:'Grand Passenger Van',subtitle:'更多同行的人，同样从容的旅程。',vehicle:'16 座 VAN',pos:'50% 100%',bags:'多人接送 · 以实际车型为准'},
{seat:'bus',category:'EVERYONE ON BOARD',name:'Touring Coach',subtitle:'一群人的旅行，每一位都被照顾。',vehicle:'旅游巴士',pos:'100% 100%',bags:'团队旅游 · 座位数另行确认'}
];

let selected=2,changeTimer,variant='alphard';
function renderVehicle(){const v=vehicles[selected],innova=selected===2&&variant==='innova';$('#fleet-category').textContent=v.category;$('#fleet-name').textContent=innova?'Toyota Innova':v.name;$('#fleet-subtitle').textContent=t(innova?'家庭出游，一路轻松相伴。':v.subtitle);$('#fleet-seats').textContent=v.seat==='bus'?t('巴士 · 按需求安排'):(isEnglish()?`${v.seat}-seat vehicle`:`${v.seat} 座车型`);$('#fleet-bags').textContent=t(v.bags);$('.fleet-number').textContent=v.seat==='bus'?'B':v.seat;$('#fleet-car').style.backgroundPosition=innova?'0% 100%':v.pos;$('#fleet-car').setAttribute('aria-label',(innova?'Toyota Innova':v.name)+(isEnglish()?' illustration':' 车型示意图'));$('#fleet-index').textContent=String(selected+1).padStart(2,'0');$('.fleet-variants').hidden=selected!==2;$$('[data-variant]').forEach(b=>b.classList.toggle('active',b.dataset.variant===variant));}
function chooseVehicle(index){selected=(index+vehicles.length)%vehicles.length;variant='alphard';$$('.fleet-tabs button').forEach((b,i)=>{b.classList.toggle('active',i===selected);b.setAttribute('aria-selected',i===selected);b.tabIndex=i===selected?0:-1});$('.fleet-tabs .active').scrollIntoView({behavior:reduced?'instant':'smooth',block:'nearest',inline:'nearest'});$('#fleet-car').classList.add('changing');renderVehicle();clearTimeout(changeTimer);changeTimer=setTimeout(()=>$('#fleet-car').classList.remove('changing'),reduced?0:180)}
$$('.fleet-tabs button').forEach((b,i)=>{b.tabIndex=i===selected?0:-1;b.addEventListener('click',()=>chooseVehicle(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();chooseVehicle(e.key==='Home'?0:e.key==='End'?5:selected+(e.key==='ArrowRight'?1:-1));$('.fleet-tabs .active').focus()}})});
$('#fleet-prev').addEventListener('click',()=>chooseVehicle(selected-1));$('#fleet-next').addEventListener('click',()=>chooseVehicle(selected+1));
$('#fleet-book').addEventListener('click',()=>{bookingForm.elements.vehicle.value=variant==='innova'?'Toyota Innova':vehicles[selected].vehicle;plan('私人包车')});
$$('[data-variant]').forEach(b=>b.addEventListener('click',()=>{variant=b.dataset.variant;renderVehicle()}));
let dragStart=null;
$('.fleet-stage').addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;dragStart=e.clientX});
window.addEventListener('pointerup',e=>{if(dragStart!==null&&Math.abs(e.clientX-dragStart)>45)chooseVehicle(selected+(e.clientX<dragStart?1:-1));dragStart=null});
$('.fleet-stage').addEventListener('pointercancel',()=>dragStart=null);
$('.fleet-stage').addEventListener('keydown',e=>{if(e.target!==$('.fleet-stage'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();chooseVehicle(selected+(e.key==='ArrowRight'?1:-1))}});
let summary='';
function renderSummary(){const f=Object.fromEntries(new FormData(bookingForm));summary=isEnglish()?`TRAVTHRU · Trip enquiry\n\nName: ${f.name.trim()}\nEmail: ${f.email}\nService: ${t(f.service)}\nDate: ${f.date}\nTravellers: ${f.passengers}\nVehicle: ${t(f.vehicle)}\n\nTravel plans:\n${f.message.trim()}\n\nThis is an enquiry, not a confirmed booking. Vehicle, price and arrangements are subject to confirmation.`:`TRAVTHRU · 行程咨询\n\n称呼：${f.name.trim()}\n邮箱：${f.email}\n服务：${f.service}\n日期：${f.date}\n同行人数：${f.passengers}\n车型：${f.vehicle}\n\n行程需求：\n${f.message.trim()}\n\n此摘要不是已确认订单，车型、报价及服务安排需另行确认。`;$('#trip-summary').textContent=summary;$('#whatsapp-trip').href='https://wa.me/60107198186?text='+encodeURIComponent(summary)}
bookingForm.addEventListener('submit',e=>{e.preventDefault();if(!bookingForm.reportValidity())return;if(bookingForm.elements.date.value<today){toast('请选择今天或之后的出发日期。');return}renderSummary();$('#form-result').hidden=false;$('#form-result').scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'})});
bookingForm.addEventListener('input',()=>{if(!$('#form-result').hidden)renderSummary()});
$('#copy-trip').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);toast('行程需求已复制。')}catch{const selection=getSelection();const range=document.createRange();range.selectNodeContents($('#trip-summary'));selection.removeAllRanges();selection.addRange(range);toast('已选中行程内容，请手动复制。')}});
$('#download-trip').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([summary],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=isEnglish()?'TRAVTHRU-trip-enquiry.txt':'TRAVTHRU-行程需求.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
$('.reveal-button').addEventListener('click',()=>{if(reduced){plan('私人包车');return}window.scrollTo({top:heroSequence.offsetTop+(heroSequence.offsetHeight-innerHeight)*.65,behavior:'smooth'})});
// Scroll-driven camera timeline. No wheel interception: native scrolling stays intact.
const heroSequence=$('.hero-sequence'),story=$('.journey-sequence'),captions=$$('.story-caption');
let ticking=false;
function updateScroll(){ticking=false;const vh=innerHeight,y=scrollY;const total=document.documentElement.scrollHeight-vh;$('.scroll-progress').style.width=`${clamp(y/total)*100}%`;if(reduced)return;
 const hr=heroSequence.getBoundingClientRect();const hp=clamp(-hr.top/(heroSequence.offsetHeight-vh));
 $('.hero-photo').style.transform=`scale(${1.04+smooth(hp)*.55}) translate3d(${-hp*3}%,${hp*2}%,0)`;
 $('.hero-photo').style.filter=`brightness(${1-hp*.45})`;
 const lift=smooth(hp/.6);$('.hero-cover').style.clipPath=`inset(0 0 ${lift*105}% 0)`;$('.hero-cover').style.transform=`scale(${1.04+smooth(hp)*.55}) translateY(${-lift*60}px)`;$('.hero-cover').style.opacity=1-smooth((hp-.45)/.15);$('.reveal-guide').style.opacity=1-smooth(hp*5);
 $('.hero-copy').style.transform=`translate3d(0,${-hp*100}px,0)`;$('.hero-copy').style.opacity=1-smooth(hp*1.5);
 $('.hero-model').style.opacity=1-smooth(hp*1.4);$('.hero-bottom').style.opacity=1-smooth(hp*1.8);
 const sr=story.getBoundingClientRect();const sp=clamp(-sr.top/(story.offsetHeight-vh));
 if(sr.top<vh&&sr.bottom>0){
  const portal=smooth((vh*.4-sr.top)/(vh*.4));$('.journey-sticky').style.transform=`translateY(${-Math.max(0,sr.top)}px)`;$('.journey-sticky').style.clipPath=`circle(${portal*115}% at 68% 55%)`;
  const entry=portal;$('.journey-world').style.transform=`scale(${1.15-sp*.22}) rotate(${sp*2-1}deg)`;
  $('.journey-image').style.transform=`scale(${1.45-sp*.25}) translate3d(${sp*-12}%,${sp*3}%,0)`;
  $('.journey-image').style.filter=`brightness(${.8-sp*.3})`;
  $('.journey-cabin').style.opacity=1-smooth((sp-.22)/.18);$('.journey-cabin').style.transform=`scale(${1.04+sp*.7}) translateX(${-sp*8}%)`;
  $('.journey-landscape').style.opacity=smooth((sp-.2)/.2);$('.journey-landscape').style.transform=`scale(${1.2-sp*.15}) translateX(${-sp*5}%)`;
  $('.journey-routes').style.transform=`translate3d(${(1-sp)*15}%,${-sp*7}%,0) rotate(${-sp*12}deg)`;
  $$('.journey-routes path').forEach((p,i)=>p.style.strokeDashoffset=2000-clamp(sp*1.5-i*.08)*2300);
  $('.journey-orbit').style.transform=`scale(${.6+sp*1.4}) rotate(${sp*80}deg)`;
  $('.journey-track i').style.transform=`scaleX(${sp})`;
  captions.forEach((el,i)=>{const local=sp*3-i;const enter=smooth((local+.17)/.35);const leave=smooth((local-.66)/.32);const opacity=enter*(1-leave)*entry;el.style.opacity=opacity;el.style.transform=`translate3d(${(1-enter)*65-leave*55}px,${(1-enter)*35-leave*35}px,0) scale(${1+(1-enter)*.035-leave*.035})`;el.style.pointerEvents=opacity>.6?'auto':'none';el.setAttribute('aria-hidden',opacity<.1)});
  $('#scene-count').textContent=`0${Math.min(3,Math.floor(sp*3)+1)} / 03`;
 }
 const statement=$('.statement').getBoundingClientRect();if(statement.top<vh&&statement.bottom>0){$('.statement-bg').style.transform=`translateY(${(statement.top/vh)*60}px) scale(1.12)`}
}
function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);updateScroll();


document.addEventListener('languagechange',()=>{renderVehicle();closeMenu();if(!$('#form-result').hidden)renderSummary();if(dialog.open)dialog.close()});
initLanguage();
