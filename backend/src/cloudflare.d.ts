// Cloudflare Workers extend the standard CacheStorage with a `.default` property.
// The DOM lib doesn't include this, so we declare it here.
interface CacheStorage {
  default: Cache;
}
