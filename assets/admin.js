(() => {
  const $=s=>document.querySelector(s);
  let token=sessionStorage.getItem('bishopAdminToken')||'';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const api=async(path,options={})=>{options.headers={...(options.headers||{}),Authorization:`Bearer ${token}`,'Content-Type':'application/json'};const r=await fetch(path,options);const d=await r.json();if(!r.ok)throw Error(d.error||'Request failed');return d};
  function showDashboard(){ $('#login').hidden=true; $('#dashboard').hidden=false; refreshCourses(); refreshEnquiries(); }
  async function login(){try{const key=$('#key').value;const d=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key})}).then(r=>r.json());if(!d.ok)throw Error(d.error||'Invalid key');token=d.token;sessionStorage.setItem('bishopAdminToken',token);showDashboard()}catch(e){$('#loginMsg').textContent=e.message}}
  async function refreshCourses(){try{const list=await api('/api/courses');$('#courseCount').textContent=`${list.length} course${list.length===1?'':'s'}`;$('#coursesList').innerHTML=list.map(c=>`<div class="card" style="margin:10px 0"><strong>${esc(c.name)}</strong><p class="small">${esc(c.category)} · ${esc(c.duration||'')}</p><button class="button secondary delete-course" data-slug="${esc(c.slug)}">Delete</button></div>`).join('');document.querySelectorAll('.delete-course').forEach(b=>b.onclick=async()=>{if(!confirm('Delete this course?'))return;await api('/api/admin/courses/'+encodeURIComponent(b.dataset.slug),{method:'DELETE'});refreshCourses()})}catch(e){$('#courseMsg').textContent=e.message}}
  async function refreshEnquiries(){try{const list=await api('/api/admin/enquiries');$('#enquiryCount').textContent=`${list.length} enquiry${list.length===1?'':'ies'}`;$('#enquiriesList').innerHTML=list.slice(0,20).map(x=>`<article class="card" style="margin:10px 0"><strong>${esc(x.name)}</strong><p>${esc(x.course||'General enquiry')}</p><p class="small">${esc(x.phone||x.email||'')} · ${esc(x.createdAt)}</p><p>${esc(x.message||'')}</p></article>`).join('')||'<p class="small">No enquiries yet.</p>'}catch(e){$('#enquiryCount').textContent='Unable to load'}}
  $('#loginBtn').onclick=login;
  $('#key').onkeydown=e=>{if(e.key==='Enter')login()};
  $('#logout').onclick=()=>{sessionStorage.removeItem('bishopAdminToken');location.reload()};
  $('#refreshCourses').onclick=refreshCourses;$('#refreshEnquiries').onclick=refreshEnquiries;
  $('#courseForm').onsubmit=async e=>{e.preventDefault();try{const d=Object.fromEntries(new FormData(e.target).entries());d.learn=(d.learn||'').split('\n').map(x=>x.trim()).filter(Boolean);d.featured=d.featured==='true';await api('/api/admin/courses',{method:'POST',body:JSON.stringify(d)});e.target.reset();$('#courseMsg').textContent='Course saved.';refreshCourses()}catch(err){$('#courseMsg').textContent=err.message}};
  if(token)showDashboard();
})();
