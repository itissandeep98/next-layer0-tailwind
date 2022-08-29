const Sitemap = () => {
  return null;
};

const getOrigin = (req) => {
  let origin;
  if (typeof window !== 'undefined') {
    origin = window.location.origin;
  }
  if (req) {
    let hostURL = req.headers['host'];
    if (hostURL) {
      hostURL = hostURL.replace('http://', '');
      hostURL = hostURL.replace('https://', '');
      if (hostURL.includes('localhost:') || hostURL.includes('127.0.0.1')) {
        origin = `http://${hostURL}`;
      } else {
        origin = `https://${hostURL}`;
      }
    }
  }
  return origin;
};

export const getServerSideProps = async ({ req, res }) => {
  const BASE_URL = getOrigin(req);
  const fs = await import('fs');
  const skipPages = { '/404': true, '/_error': true, '/500': true };
  const staticPaths = Object.keys(
    JSON.parse(
      fs.readFileSync('.next/serverless/pages-manifest.json', {
        encoding: 'utf8'
      })
    )
  )
    .filter((i) => !(skipPages.hasOwnProperty(i) && skipPages[i]))
    .map((staticPagePath) => `${BASE_URL}${staticPagePath}`);
  //   const dynamicPaths = [`${BASE_URL}/product/1`, `${BASE_URL}/product/2`];
  //   const allPaths = [...staticPaths, ...dynamicPaths];
  const allPaths = [...staticPaths];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return {
    props: {}
  };
};

export default Sitemap;
