const CACHE_NAME="my-cache-v3",urlsToCache=["/schoolworkforall","/schoolworkforall/index3.html"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(CACHE_NAME).then((e=>e.addAll(urlsToCache))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request).then((t=>{let l=t.clone();return e.waitUntil(caches.open(CACHE_NAME).then((t=>{t.put(e.request,l)}))),t})))))})),self.addEventListener("activate",(e=>{const t=[CACHE_NAME];e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!t.includes(e))return caches.delete(e)}))))))}));
