// The finished client animation plays at most once per placement, only in view.
// Keep the supplied final frame visible for reduced motion and media failures.
export function initBrandVideo(){
 const ready=[...document.querySelectorAll('.brand-video-frame')].map(initVideo);
 // Only header playback affects the existing welcome planner timing.
 return ready[0]||Promise.resolve();
}
function initVideo(frame){
 const video=frame.querySelector('video');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let started=false,finished=false,timer,resolveReady;
 const ready=new Promise(resolve=>resolveReady=resolve);
 function finish(){
  if(finished)return;
  finished=true;clearTimeout(timer);observer?.disconnect();video.pause();
  frame.dataset.state='static';
  // Release media requests, including when the preference changes while playing.
  video.querySelectorAll('source').forEach(source=>source.removeAttribute('src'));
  video.load();resolveReady();
 }
 const observer=new IntersectionObserver(entries=>{
  if(started||finished||!entries.some(entry=>entry.isIntersecting))return;
  started=true;observer.disconnect();
  video.muted=true;video.defaultMuted=true;
  for(const source of video.querySelectorAll('source'))source.src=source.dataset.src;
  video.load();
  // A slow or stalled connection must never leave an empty branding area.
  timer=setTimeout(finish,8000);
  video.play().catch(finish);
 },{threshold:.1});
 video.addEventListener('playing',()=>{if(!finished)frame.dataset.state='playing'});
 video.addEventListener('ended',finish,{once:true});
 video.addEventListener('error',finish,{once:true});
 preference.addEventListener('change',event=>{if(event.matches)finish()});
 if(preference.matches)finish();else observer.observe(frame);
 return ready;
}
