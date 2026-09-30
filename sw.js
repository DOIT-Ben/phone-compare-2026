/* phone-compare-2026 Service Worker：HTML network-first，图片 cache-first */
const HTML_CACHE = 'pc26-html-v2';
const IMG_CACHE = 'pc26-img-v1';

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== HTML_CACHE && k !== IMG_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // 图片：缓存优先（内容不可变，改名即换新）
  if (/\/img\/[\w-]+\.webp$/.test(url.pathname)) {
    e.respondWith(
      caches.open(IMG_CACHE).then(c => c.match(e.request).then(r => r || fetch(e.request).then(res => {
        if (res.ok) c.put(e.request, res.clone());
        return res;
      })))
    );
    return;
  }

  // 页面：网络优先，离线回退缓存
  if (e.request.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname)) {
    e.respondWith(
      fetch(e.request).then(res => {
        caches.open(HTML_CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match(e.request))
    );
  }
});
