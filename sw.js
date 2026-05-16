self.addEventListener('install', event => {
  console.log('installing[Service Worker]', event);

  event.waitUntil(
    caches.open('static')
    .then(cache => {
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll([
        '/', 
        '/index.html',
        '/favicon.ico',
        '/src/js/app.js',
        'src/js/chart.js',
        'src/js/README.md',
        'https://poludovmaksim03-debug.github.io/https-awsq.codeberg.page-chat-bot64-project-/'
      ]);
    }));
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(res => {
                return caches.open('dynamic')
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              });
          }
        })
    );
  });