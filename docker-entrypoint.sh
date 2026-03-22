#!/bin/sh

# Docker entrypoint script for nginx with environment variable substitution

set -e

# Substitute environment variables in nginx configuration
if [ -n "$VITE_API_BASE_URL" ]; then
  echo "Substituting VITE_API_BASE_URL: $VITE_API_BASE_URL"
  sed -i "s|VITE_API_BASE_URL|$VITE_API_BASE_URL|g" /usr/share/nginx/html/assets/*.js 2>/dev/null || true
fi

# Generate robots.txt if not exists
if [ ! -f "/usr/share/nginx/html/robots.txt" ]; then
  cat > /usr/share/nginx/html/robots.txt << 'EOF'
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://emerhana-foundation.org/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1
EOF
fi

# Generate sitemap.xml if not exists
if [ ! -f "/usr/share/nginx/html/sitemap.xml" ]; then
  cat > /usr/share/nginx/html/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://emerhana-foundation.org/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/programs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/donate</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/news</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://emerhana-foundation.org/gallery</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
EOF
fi

# Execute the main command
exec "$@"