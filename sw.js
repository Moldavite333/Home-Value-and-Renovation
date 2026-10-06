const CACHE='juniper-home-tracker-v11';
const ASSETS=['./','./index.html','./styles.css','./app.js','./backend-auth-v2.js','./project-details.js','./manifest.json','./icon.svg'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

async function enhanceDocument(response){
  if(!response) return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;
  const text=await response.text();
  const enhanced=text.includes('project-details.js')
    ? text
    : text.replace('</body>','<script src="./project-details.js" defer></script></body>');
  const headers=new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  return new Response(enhanced,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const isDocument=event.request.mode==='navigate'||event.request.destination==='document';
  if(isDocument){
    event.respondWith((async()=>{
      try{
        const network=await fetch(event.request);
        const enhanced=await enhanceDocument(network);
        caches.open(CACHE).then(c=>c.put(event.request,enhanced.clone()));
        return enhanced;
      }catch(e){
        const cached=await caches.match(event.request)||await caches.match('./index.html');
        return enhanceDocument(cached);
      }
    })());
    return;
  }
  event.respondWith(
    fetch(event.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(event.request,copy));
      return resp;
    }).catch(()=>caches.match(event.request))
  );
});
