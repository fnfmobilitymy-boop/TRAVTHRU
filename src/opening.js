export function initOpening(){
 const panel=document.querySelector('#brand-opening'),video=document.querySelector('#opening-video');
 let resolve,timeout;
 function enableSound(event){if(!event.isTrusted||event.target.closest?.('#opening-skip')||panel.hidden)return;video.muted=false;video.play().catch(()=>{video.muted=true})}
 function close(){clearTimeout(timeout);panel.hidden=true;document.removeEventListener('pointerdown',enableSound,true);document.removeEventListener('keydown',enableSound,true);video.pause();video.muted=true;video.removeAttribute('src');video.load();resolve?.();resolve=null}
 function play(){
  close();panel.hidden=false;video.muted=false;video.volume=1;
  const ready=new Promise(done=>resolve=done);video.src=video.dataset.src;video.load();
  document.addEventListener('pointerdown',enableSound,true);document.addEventListener('keydown',enableSound,true);
  timeout=setTimeout(close,10000);
  video.play().catch(()=>{if(panel.hidden)return;video.muted=true;video.play().catch(close)});return ready;
 }
 video.addEventListener('ended',close);video.addEventListener('error',close);
 document.querySelector('#opening-skip').addEventListener('click',close);
 return {play,close};
}
