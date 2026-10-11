/* Ramakrishna Konda portfolio: 3D hero scene + contact form */
(function(){
function initScene(){
try{
const T=window.THREE,c=document.getElementById('scene'),root=document.getElementById('pf');
if(!T||!c||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const small=window.innerWidth<700;
const r=new T.WebGLRenderer({canvas:c,alpha:true,antialias:!small,powerPreference:'low-power'});
r.setPixelRatio(Math.min(window.devicePixelRatio||1,small?1.25:2));
const sc=new T.Scene(),cam=new T.PerspectiveCamera(45,1,.1,100);cam.position.z=11;
sc.add(new T.AmbientLight(0x6677ff,.6));
[[0x4a5cff,-6,4,5,3],[0x8b5cf6,6,-3,4,3],[0x22d3ee,0,5,-2,2.5]].forEach(a=>{const l=new T.PointLight(a[0],a[4],40);l.position.set(a[1],a[2],a[3]);sc.add(l);});
const g=new T.Group();sc.add(g);
const glass=(col,o)=>new T.MeshStandardMaterial({color:col,transparent:true,opacity:o,roughness:.12,metalness:.2});
const metal=new T.MeshStandardMaterial({color:0xd5dcff,metalness:.95,roughness:.28});
const ico=new T.Mesh(new T.IcosahedronGeometry(1.1,0),glass(0x6a7bff,.4));
ico.add(new T.LineSegments(new T.EdgesGeometry(ico.geometry),new T.LineBasicMaterial({color:0x67e8f9})));ico.position.set(5.2,2.6,-1);
const ring=new T.Mesh(new T.TorusGeometry(2.2,.12,24,96),metal);ring.position.set(3.4,0,-2);ring.rotation.x=1.1;
const ring2=new T.Mesh(new T.TorusGeometry(1.3,.08,20,80),metal);ring2.position.set(-5.2,-2.4,-1);
const ball=new T.Mesh(new T.SphereGeometry(.55,32,32),metal);ball.position.set(-3.6,2.8,0);
const cube=new T.Mesh(new T.BoxGeometry(1,1,1),glass(0x8b5cf6,.45));cube.position.set(1.2,3.6,-1);
g.add(ico,ring,ring2,ball,cube);
const av=new T.Group(),skin=new T.MeshStandardMaterial({color:0xc48a5f,roughness:.6}),shirt=new T.MeshStandardMaterial({color:0x14162e,roughness:.5,metalness:.15}),hairM=new T.MeshStandardMaterial({color:0x07070d,roughness:.4});
const head=new T.Mesh(new T.SphereGeometry(.85,32,32),skin);head.position.y=1.55;head.scale.set(.92,1,.95);
const hair=new T.Mesh(new T.SphereGeometry(.9,32,32,0,Math.PI*2,0,Math.PI*.55),hairM);hair.position.y=1.62;hair.rotation.x=-.3;
const eyeG=new T.SphereGeometry(.07,16,16),eyeM=new T.MeshBasicMaterial({color:0x0a0a12});
const eL=new T.Mesh(eyeG,eyeM);eL.position.set(-.3,1.62,.78);const eR=eL.clone();eR.position.x=.3;
const mus=new T.Mesh(new T.BoxGeometry(.4,.07,.06),hairM);mus.position.set(0,1.28,.8);
const neck=new T.Mesh(new T.CylinderGeometry(.22,.26,.4,20),skin);neck.position.y=.95;
const body=new T.Mesh(new T.CapsuleGeometry(.75,.9,8,24),shirt);body.position.y=-.1;body.scale.set(1.25,1,.8);
const armL=new T.Mesh(new T.CapsuleGeometry(.24,1,8,16),shirt);armL.position.set(-1.15,-.15,0);armL.rotation.z=.15;const armR=armL.clone();armR.position.x=1.15;armR.rotation.z=-.15;
av.add(head,hair,eL,eR,mus,neck,body,armL,armR);av.position.set(3.4,-1.4,0);av.scale.setScalar(1.25);g.add(av);
const rim=new T.PointLight(0x22d3ee,3,20);rim.position.set(5,1,-3);sc.add(rim);
const n=small?90:240,pos=new Float32Array(n*3);for(let i=0;i<n*3;i++)pos[i]=(Math.random()-.5)*20;
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pos,3));
const pts=new T.Points(pg,new T.PointsMaterial({color:0x67e8f9,size:.06,transparent:true,opacity:.8,blending:T.AdditiveBlending,depthWrite:false}));sc.add(pts);
const fit=()=>{const p=c.parentElement,w=p.clientWidth,h=p.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();};
fit();const ro=new ResizeObserver(fit);ro.observe(c.parentElement);
let mx=0,my=0,tx=0,ty=0,vis=true,raf=0,t=0;
window.addEventListener('pointermove',e=>{tx=(e.clientX/window.innerWidth-.5);ty=(e.clientY/window.innerHeight-.5);},{passive:true});
new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!raf)loop();}).observe(c.parentElement);
const loop=()=>{raf=0;if(!vis||document.hidden)return;t+=.01;mx+=(tx-mx)*.05;my+=(ty-my)*.05;
g.rotation.y=mx*.5;g.rotation.x=my*.3;ico.rotation.x+=.006;ico.rotation.y+=.008;ring.rotation.z+=.004;ring2.rotation.y+=.01;ring2.rotation.x+=.006;cube.rotation.x+=.007;cube.rotation.y+=.009;
ball.position.y=2.8+Math.sin(t*2)*.25;ico.position.y=2.6+Math.sin(t*1.6)*.3;pts.rotation.y=t*.08;av.rotation.y=mx*.9;av.position.y=-1.4+Math.sin(t*1.5)*.12;
r.render(sc,cam);raf=requestAnimationFrame(loop);};
loop();root.classList.add('gl');
}catch(e){}
}
function initForm(){
var f=document.getElementById('contact-form');if(!f)return;
var q=function(i){return document.getElementById(i)};
f.addEventListener('submit',function(ev){
ev.preventDefault();
var name=q('f-name').value.trim(),email=q('f-email').value.trim(),msg=q('f-msg').value.trim();
var okMail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
q('e-name').hidden=name.length>0;q('e-email').hidden=okMail;q('e-msg').hidden=msg.length>=10;
q('f-name').setAttribute('aria-invalid',String(!name));q('f-email').setAttribute('aria-invalid',String(!okMail));q('f-msg').setAttribute('aria-invalid',String(msg.length<10));
if(!name||!okMail||msg.length<10){q('ok').hidden=true;return;}
var u='mailto:kondaramakrishna541@gmail.com?subject='+encodeURIComponent('Portfolio message from '+name)+'&body='+encodeURIComponent(msg+'\n\n'+name+' ('+email+')');
q('ok').hidden=false;window.location.href=u;
});
}
document.addEventListener('DOMContentLoaded',function(){initForm();initScene();});
})();
