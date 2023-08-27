'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"styles.css": "713d8c49627c44e221afff6b71d135b8",
"scripts/botd-1.1.0.js": "59799f492214d206697685b336ec3121",
"assets/fonts/GilroyMedium.otf": "9e12d6053ae1c539d9be9d6fa86d33a7",
"assets/fonts/GilroyUltraLight.otf": "7c721d9922be62a968d279c7cfef9bbb",
"assets/fonts/GilroySemiBold.otf": "5b057a227c11cb0c43e7502d7c3933b6",
"assets/fonts/GilroyExtraBold.otf": "01bee9655bf434da91a4f4f5eed32339",
"assets/fonts/GilroyBlack.otf": "19d313b9f58424237dea452a1da65cc0",
"assets/fonts/GilroyLight.otf": "d90fa984926d3745c7e68bc525692c26",
"assets/fonts/GilroyRegular.otf": "1e09f38cc59a3ccc24cd2d7d745566ac",
"assets/fonts/GilroyThin.otf": "7f7d0869706cb2bef1c125a7a4357e6c",
"assets/fonts/GilroyBold.otf": "7fb352649483a9aa67ca0731692e84a5",
"assets/fonts/MaterialIcons-Regular.otf": "78a0db30a920fe898706ec4322af0fbc",
"assets/images/safewalk.png": "116bb4b2a8d61e3e084bb4f694027943",
"assets/images/petdaycare.png": "752cc48a5f6d6dbca701769632ad3f30",
"assets/images/vichubWeb.jpg": "02d1bb42979aabc6ec40e93d9a7dca9e",
"assets/images/petdaycareWeb.png": "e778fed09e850cd47075c2da966eb322",
"assets/images/macGuy.png": "39465fab82ccd55a5157773b2415c69a",
"assets/images/vichub.png": "62aec119d737895da540cf35767b8c72",
"assets/images/macGuy.jpg": "56e3b5777248042e2b3db06bae83f4f9",
"assets/AssetManifest.json": "373310f5efaa67239765035a66bc1617",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "c2281cf0a22c29917ebf755ba9d11e50",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "7d8d4306237845212974af924b1ab33d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "8e0542a7d7eec9dbada78c8605db3ccd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "c2716c0888c37a8398f61cdb972c43e2",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "91f2aa6ee9c30c946ff0ea8d85b663fa",
"assets/FontManifest.json": "e274c036caf7a1ed31bfbc19bde9a19d",
"assets/NOTICES": "cc104c635c7158108611a61429d3a98c",
"version.json": "009c9e65172e010890f7f65fde438006",
"manifest.json": "dec943a19242276f39de05e4efe9e7db",
"index.html": "00978386b4629dc1f87fedbd76132956",
"/": "00978386b4629dc1f87fedbd76132956",
"favicon.png": "9c372d68a373b89db30c9b89c4f9a8ea",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"icons/Icon-192.png": "04237a90ee8b4f541b440e831ffa8434",
"icons/Icon-maskable-192.png": "aea6ba2b7e6cae9fc1c68b21c749f31d",
"icons/Icon-512.png": "5c3d45bcaddcf08b3681491809ab7b39",
"icons/Icon-maskable-512.png": "3666fc35959b311efeb57bc33dddbbb9",
"main.dart.js": "03491b18d23bab67756ccff30e17090f",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
