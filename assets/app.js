(() => {
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const wa=m=>`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(m||'Hello Bishop Marine Academy, I would like to make an enquiry.')}`;

  // The hero video is a scroll-scrubbed timeline: hero progress 0..1 maps directly
  // to video.currentTime 0..duration. requestAnimationFrame coalesces rapid scroll
  // events and a light interpolation keeps seeking elegant during fast scrolling.
  function initScrollVideo(){
    const section=$('#cinematic-hero'), video=$('#heroScrollVideo'), progress=$('.hero-cinematic-progress span');
    if(!section||!video||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let target=0, displayed=0, raf=0, ready=false;
    const clamp=v=>Math.max(0,Math.min(1,v));
    const updateTarget=()=>{
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      target=clamp(-rect.top/travel);
      if(!raf)raf=requestAnimationFrame(render);
    };
    const render=()=>{
      raf=0;
      displayed+=(target-displayed)*0.22;
      if(Math.abs(target-displayed)<0.001)displayed=target;
      if(ready&&Number.isFinite(video.duration)&&video.duration>0){
        const nextTime=displayed*video.duration;
        if(Math.abs(video.currentTime-nextTime)>0.015)video.currentTime=nextTime;
      }
      if(progress)progress.style.transform=`scaleX(${displayed})`;
      if(Math.abs(target-displayed)>0.001)raf=requestAnimationFrame(render);
    };
    video.addEventListener('loadedmetadata',()=>{ready=true;video.pause();updateTarget();},{once:true});
    video.addEventListener('error',()=>section.classList.add('cinematic-video-failed'),{once:true});
    window.addEventListener('scroll',updateTarget,{passive:true});
    window.addEventListener('resize',updateTarget,{passive:true});
    updateTarget();
  }

  async function loadRemoteData(){
    try{
      const [s,c,f]=await Promise.all([fetch('/api/site'),fetch('/api/courses'),fetch('/api/faqs')]);
      if(s.ok){const remote=await s.json();Object.assign(site,remote)}
      if(c.ok){const remote=await c.json();courses.splice(0,courses.length,...remote)}
      if(f.ok){const remote=await f.json();faqs.splice(0,faqs.length,...remote)}
      window.BISHOP_DYNAMIC=true;
    }catch{window.BISHOP_DYNAMIC=false}
  }
  function shell(){
    const n=$('#site-nav'); if(n)n.innerHTML=`<a href="index.html">Home</a><a href="about.html">About</a><a href="courses.html">Courses</a><a href="international.html">International</a><a href="admissions.html">Admissions</a><a href="contact.html">Contact</a>`;
    $('#menu')?.addEventListener('click',()=>n?.classList.toggle('open'));
    const f=$('#site-footer'); if(f)f.innerHTML=`<div><strong>${esc(site.name)}</strong><p>${esc(site.description)}</p></div><div><h4>Contact</h4><p>${site.phones.map(p=>`<a href="tel:${p}">${p}</a>`).join('<br>')}</p><p>${esc(site.address)}</p></div><div><h4>Explore</h4><p><a href="courses.html">Courses</a><br><a href="admissions.html">Admissions</a><br><a href="international.html">International</a></p></div>`;
    $$('.js-whatsapp').forEach(a=>a.href=wa(a.dataset.message));
  }
  const card=c=>`<article class="card course-card"><div class="course-icon">${esc(c.name?.[0]||'C')}</div><div><span class="eyebrow">${esc(c.category)}</span><h3>${esc(c.name)}</h3><p>${esc(c.short)}</p><p class="muted">Duration: ${esc(c.duration)}</p><a class="text-link" href="course.html?slug=${encodeURIComponent(c.slug)}">View course</a></div></article>`;
  function home(){
    const fc=$('#featured-courses'); if(fc)fc.innerHTML=courses.filter(c=>c.featured).map(card).join('');
    const cg=$('#category-grid'); if(cg)cg.innerHTML=categories.slice(0,6).map(c=>`<a class="card category-card" href="courses.html"><span class="eyebrow">Training</span><h3>${esc(c)}</h3><span class="text-link">Browse courses</span></a>`).join('');
    const fl=$('#faq-list'); if(fl)fl.innerHTML=faqs.slice(0,5).map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
    const dl=$('#destination-list'); if(dl)dl.innerHTML=site.destinations.map(x=>`<span>${esc(x)}</span>`).join('');
  }
  function coursesPage(){const g=$('#course-grid');if(!g)return;const s=$('#course-search'),f=$('#course-filter');f.innerHTML='<option value="">All categories</option>'+categories.map(x=>`<option>${esc(x)}</option>`).join('');const draw=()=>{const q=(s.value||'').toLowerCase(),cat=f.value;const list=courses.filter(c=>(!q||`${c.name} ${c.category} ${c.short}`.toLowerCase().includes(q))&&(!cat||c.category===cat));g.innerHTML=list.map(card).join('')||'<p>No courses match your search.</p>';$('#course-count').textContent=`${list.length} course${list.length===1?'':'s'}`};s.oninput=draw;f.onchange=draw;draw();}
  function detail(){const root=$('#course-detail');if(!root)return;const slug=new URLSearchParams(location.search).get('slug'),c=courses.find(x=>x.slug===slug)||courses[0];if(!c)return;document.title=`${c.name} | ${site.name}`;root.innerHTML=`<div class="detail-head"><span class="eyebrow">${esc(c.category)}</span><h1>${esc(c.name)}</h1><p>${esc(c.short)}</p><div class="actions"><a class="button" href="admissions.html?course=${encodeURIComponent(c.name)}">Register / Enquire</a><a class="button secondary" href="${wa(`Hello Bishop Marine Academy, I am interested in ${c.name} training. Please send me the current requirements, duration and fees.`)}">WhatsApp</a></div></div><div class="detail-grid"><section><h2>Course overview</h2><p>${esc(c.short)} Exact curriculum, dates, fees and certification information should be confirmed with the academy before enrolment.</p><h2>What you will learn</h2><ul>${(c.learn||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h2>Assessment & certification</h2><p>${esc(c.certification||'Details to be confirmed')}.</p></section><aside class="card"><h3>Course information</h3><dl><dt>Duration</dt><dd>${esc(c.duration||'To be confirmed')}</dd><dt>Requirements</dt><dd>${esc(c.requirements||'To be confirmed')}</dd><dt>Price</dt><dd>${esc(c.price||'To be confirmed')}</dd></dl></aside></div>`;}
  async function forms(){const s=$('#course');if(s)s.innerHTML='<option value="">Select a course</option>'+courses.map(c=>`<option>${esc(c.name)}</option>`).join('');const p=new URLSearchParams(location.search).get('course');if(p&&s)s.value=p;$$('.enquiry-form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form).entries());const message=`Hello Bishop Marine Academy, my name is ${d.name||''}. I am interested in ${d.course||'a training programme'}. Please send me the current requirements, duration, fees and next steps.`;try{if(window.BISHOP_DYNAMIC){await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})}}catch{}location.href=wa(message)}));}
  document.addEventListener('DOMContentLoaded',async()=>{await loadRemoteData();shell();home();coursesPage();detail();forms();initScrollVideo();});
})();
