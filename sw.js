importScripts('cache-polyfill.js');

var cacheName = 'shiningjason-v1';
var filesToCache = [
  '/',
  '/?homescreen=1',
  '/index.html',
  '/index.html?homescreen=1',
  '/styles/main.css',
  '/assets/4cats-logo.png',
  '/assets/dot.png',
  '/assets/hii-logo.png',
  '/assets/line.png',
  '/assets/typography1.jpg',
  '/assets/typography2.jpg'
];

self.addEventListener('install', function(e) {
  var promise = caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    });

  e.waitUntil(promise);
});

self.addEventListener('activate', function(e) {
  var promise = caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) return caches.delete(key);
      }));
    });

  e.waitUntil(promise);
});

self.addEventListener('fetch', function(e) {
  var promise = caches.match(e.request)
    .then(function(response) {
      return response || fetch(e.request);
    });

  e.respondWith(promise);
});
