const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_KEY = process.env.ADMIN_KEY || 'CHANGE-ME-BEFORE-DEPLOY';
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const RUNTIME_FILE = path.join(DATA_DIR, 'runtime.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

fs.mkdirSync(DATA_DIR, { recursive: true });

function seedData() {
  const source = fs.readFileSync(path.join(ROOT, 'assets', 'data.js'), 'utf8');
  return vm.runInNewContext(`${source}\n;({site,categories,courses,faqs})`);
}

const seed = seedData();
function loadRuntime() {
  if (!fs.existsSync(RUNTIME_FILE)) return { ...seed, updatedAt: null };
  try { return JSON.parse(fs.readFileSync(RUNTIME_FILE, 'utf8')); }
  catch { return { ...seed, updatedAt: null }; }
}
function saveRuntime(data) {
  fs.writeFileSync(RUNTIME_FILE, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2));
}
function loadEnquiries() {
  if (!fs.existsSync(ENQUIRIES_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8')); }
  catch { return []; }
}
function saveEnquiries(items) { fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(items, null, 2)); }

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' });
  res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; if (raw.length > 1_000_000) req.destroy(); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}
function authorized(req) {
  return req.headers.authorization === `Bearer ${ADMIN_KEY}` || req.headers['x-admin-key'] === ADMIN_KEY;
}
function safeSlug(value) {
  return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const method = req.method || 'GET';

  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' });
    return res.end();
  }

  if (url.pathname === '/api/health') return send(res, 200, { ok: true, service: 'bishop-marine-api', time: new Date().toISOString() });

  if (url.pathname === '/api/site' && method === 'GET') {
    const data = loadRuntime(); return send(res, 200, data.site);
  }
  if (url.pathname === '/api/courses' && method === 'GET') {
    const data = loadRuntime(); return send(res, 200, data.courses);
  }
  if (url.pathname === '/api/faqs' && method === 'GET') {
    const data = loadRuntime(); return send(res, 200, data.faqs);
  }

  if (url.pathname === '/api/enquiries' && method === 'POST') {
    try {
      const body = await readBody(req);
      if (!body.name) return send(res, 400, { error: 'Name is required' });
      const items = loadEnquiries();
      const item = { id: `ENQ-${Date.now()}`, ...body, status: 'new', createdAt: new Date().toISOString() };
      items.unshift(item); saveEnquiries(items);
      return send(res, 201, { ok: true, enquiry: item });
    } catch (error) { return send(res, 400, { error: error.message }); }
  }

  if (url.pathname === '/api/admin/login' && method === 'POST') {
    try {
      const body = await readBody(req);
      if (body.key !== ADMIN_KEY) return send(res, 401, { error: 'Invalid admin key' });
      return send(res, 200, { ok: true, token: ADMIN_KEY });
    } catch (error) { return send(res, 400, { error: error.message }); }
  }

  if (url.pathname === '/api/admin/enquiries' && method === 'GET') {
    if (!authorized(req)) return send(res, 401, { error: 'Unauthorized' });
    return send(res, 200, loadEnquiries());
  }

  if (url.pathname === '/api/admin/courses' && method === 'POST') {
    if (!authorized(req)) return send(res, 401, { error: 'Unauthorized' });
    try {
      const body = await readBody(req);
      const data = loadRuntime();
      const course = { ...body, slug: safeSlug(body.slug || body.name) };
      if (!course.name || !course.category) return send(res, 400, { error: 'Course name and category are required' });
      if (!Array.isArray(course.learn)) course.learn = [];
      data.courses = [course, ...data.courses.filter(c => c.slug !== course.slug)];
      saveRuntime(data); return send(res, 201, course);
    } catch (error) { return send(res, 400, { error: error.message }); }
  }

  if (url.pathname.startsWith('/api/admin/courses/') && method === 'DELETE') {
    if (!authorized(req)) return send(res, 401, { error: 'Unauthorized' });
    const slug = decodeURIComponent(url.pathname.split('/').pop());
    const data = loadRuntime();
    const before = data.courses.length;
    data.courses = data.courses.filter(c => c.slug !== slug);
    if (data.courses.length === before) return send(res, 404, { error: 'Course not found' });
    saveRuntime(data); return send(res, 200, { ok: true });
  }

  if (url.pathname === '/api/admin/site' && method === 'PUT') {
    if (!authorized(req)) return send(res, 401, { error: 'Unauthorized' });
    try { const data = loadRuntime(); data.site = { ...data.site, ...(await readBody(req)) }; saveRuntime(data); return send(res, 200, data.site); }
    catch (error) { return send(res, 400, { error: error.message }); }
  }

  if (method === 'GET') {
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const file = path.resolve(ROOT, `.${pathname}`);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, { error: 'Not found' });
    const ext = path.extname(file).toLowerCase();
    const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ico':'image/x-icon' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    return fs.createReadStream(file).pipe(res);
  }
  return send(res, 404, { error: 'Not found' });
});

server.listen(PORT, HOST, () => console.log(`Bishop Marine server running on http://${HOST}:${PORT}`));
