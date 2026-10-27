// Decorative flow follows native gestures; it never captures input or changes scroll position.
export function initAirflow(){
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const canvas=document.createElement('canvas');canvas.className='gesture-airflow';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let width=innerWidth,height=innerHeight,dpr=1,frame=0,lastTime=0,lastScroll=scrollY,lastScrollTime=0,lastGust=0,pointer={x:innerWidth*.7,y:innerHeight*.5,time:0},points=[],gusts=[];
 const compact=()=>width<761;
 function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,compact()?1.25:1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
 function start(){if(!preference.matches&&!document.hidden&&!frame)frame=requestAnimationFrame(draw)}
 function addPoint(x,y,kind){if(preference.matches)return;const now=performance.now(),distance=Math.hypot(x-pointer.x,y-pointer.y);pointer={x,y,time:now};if(distance<2&&kind!=='touch')return;points.push({x,y,time:now});if(points.length>30)points.shift();start()}
 function spawn(speed,direction=1){if(preference.matches)return;const now=performance.now();if(now-lastGust<35)return;lastGust=now;const count=compact()?2:3;for(let i=0;i<count;i++){const edge=i%2===0;gusts.push({x:edge?width*(.05+Math.random()*.18):width*(.78+Math.random()*.2),y:clamp(pointer.y+((Math.random()-.5)*height*.65),30,height-30),direction,speed:Math.min(Math.abs(speed),45),born:now,life:650+Math.random()*350,phase:Math.random()*Math.PI*2,side:edge?-1:1})}if(gusts.length>(compact()?16:26))gusts.splice(0,gusts.length-(compact()?16:26));start()}
 function clamp(n,a,b){return Math.min(b,Math.max(a,n))}
 function draw(now){frame=0;const delta=lastTime?Math.min(now-lastTime,40):16;lastTime=now;ctx.clearRect(0,0,width,height);if(preference.matches||document.hidden){points=[];gusts=[];return}
  points=points.filter(p=>now-p.time<650);gusts=gusts.filter(g=>now-g.born<g.life);
  const dark=document.elementFromPoint(clamp(pointer.x,1,width-1),clamp(pointer.y,1,height-1))?.closest('.hero,.journey-sequence,.statement,.booking,.brand-intro,.welcome-booking,.footer-utilities');
  const color=dark?'218,204,163':'107,137,102';
  if(points.length>2){const age=clamp(1-(now-points.at(-1).time)/650,0,1);for(let lane=-1;lane<=1;lane++){ctx.beginPath();const offset=lane*7;ctx.moveTo(points[0].x+offset,points[0].y);for(let i=1;i<points.length-1;i++){const p=points[i],next=points[i+1];ctx.quadraticCurveTo(p.x+offset,p.y,(p.x+next.x)/2+offset,(p.y+next.y)/2)}const end=points.at(-1);ctx.lineTo(end.x+offset,end.y);ctx.strokeStyle=`rgba(${color},${age*(lane===0?.25:.12)})`;ctx.lineWidth=lane===0?1:.55;ctx.stroke()}}
  for(const g of gusts){const progress=(now-g.born)/g.life,fade=Math.sin(progress*Math.PI)*.24;const travel=progress*(100+g.speed*5)*g.direction;const x=g.x+Math.sin(progress*2+g.phase)*20;const y=g.y-travel;const length=90+g.speed*5;for(let lane=0;lane<3;lane++){const offset=lane*9;ctx.beginPath();ctx.moveTo(x-g.side*length*.38,y+g.direction*length*.48+offset);ctx.bezierCurveTo(x-g.side*45,y+offset,x+g.side*70,y-g.direction*length*.35+offset,x+g.side*length,y-g.direction*length*.5+offset);ctx.strokeStyle=`rgba(${color},${fade*(1-lane*.28)})`;ctx.lineWidth=lane===0?.9:.5;ctx.stroke()}}
  if(points.length||gusts.length)frame=requestAnimationFrame(draw);else lastTime=0;
 }
 const onPointer=e=>{if(e.pointerType!=='touch')addPoint(e.clientX,e.clientY,'mouse')};
 const onTouch=e=>{const t=e.touches[0];if(t)addPoint(t.clientX,t.clientY,'touch')};
 const onScroll=()=>{const now=performance.now(),distance=scrollY-lastScroll,elapsed=now-lastScrollTime;lastScroll=scrollY;lastScrollTime=now;if(Math.abs(distance)>1)spawn(Math.abs(distance)*16/Math.max(16,elapsed),Math.sign(distance))};
 addEventListener('pointermove',onPointer,{passive:true});addEventListener('touchstart',onTouch,{passive:true});addEventListener('touchmove',onTouch,{passive:true});addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',resize,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;points=[];gusts=[];ctx.clearRect(0,0,width,height)}});
 preference.addEventListener('change',()=>{if(preference.matches){cancelAnimationFrame(frame);frame=0;points=[];gusts=[];ctx.clearRect(0,0,width,height)}});
 resize();
}
