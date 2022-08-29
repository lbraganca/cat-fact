/* eslint-disable no-restricted-globals */
import { clientsClaim, cacheNames, setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

/**
 * APP_VERSION: Basically the value from `package.json`'s version. It's used
 *              to update the cache so make sure to increment it every time you
 *              update your app.
 * LIVE_CACHE_NAME: Currently workbox does not support precaching for non cache-first
 *                  strategies.
 */
const APP_VERSION = process.env.REACT_APP_VERSION;
const LIVE_CACHE_NAME = `live-v${APP_VERSION}`;

/**
 * Overriding the default's precache name (this is optional, also
 * we don't need to attach the `APP_VERSION` as the updates are based
 * on the revision).
 */
setCacheNameDetails({
  prefix: '',
  suffix: `v${APP_VERSION}`,
  precache: 'base',
  runtime: 'runtime',
});

/**
 * Precache and add a CacheFirst route for the following files.
 * The `self.__WB_MANIFEST` is an array with the built files
 * (the file names could be dynamic).
 * For our files we use the `APP_VERSION` as the revision param.
 */
precacheAndRoute(self.__WB_MANIFEST.concat([
  { url: '/favicon.ico', revision: APP_VERSION },
  { url: '/manifest.json', revision: APP_VERSION },
  { url: '/logo96.png', revision: APP_VERSION },
  { url: '/logo192.png', revision: APP_VERSION },
  { url: '/logo512.png', revision: APP_VERSION },
  { url: '/service-worker.js', revision: APP_VERSION },
]));

/**
 * The live cache items (they're added separately so we're able to
 * prefetch the items when the service-worker is installed).
 */
const liveCacheItems = [
  'https://catfact.ninja/fact'
];

/**
 * Adding a `NetworkFirst` strategy-based route for all the
 * live items.
 */
registerRoute(
  ({ request, url }) => liveCacheItems.includes(url.href),
  new NetworkFirst({ cacheName: LIVE_CACHE_NAME })
);

/**
 * Precaching the live cache items.
 */
const populateLiveCache = async () => {
  const cache = await caches.open(LIVE_CACHE_NAME);
  await cache.addAll(liveCacheItems);
};
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(populateLiveCache());
});

/**
 * Old cache cleanup.
 */
const deleteOldCaches = async () => {
  const currentCacheNames = await caches.keys();
  await Promise.all(currentCacheNames.map((currentCacheName) => ![LIVE_CACHE_NAME, cacheNames.precache].includes(currentCacheName) ? caches.delete(currentCacheName) : null));
};
self.addEventListener("activate", (e) => {
  e.waitUntil(deleteOldCaches());
});

clientsClaim();
// Old cache cleanup for base cache
cleanupOutdatedCaches();
