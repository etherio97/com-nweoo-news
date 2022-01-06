const { default: axios } = require("axios")

module.exports = (req, res) => {
  axios('https://nweoo-developer.herokuapp.com/news/articles?limit=15&title=id,timestamp')
    .then(({ data }) => {
      const responses = [
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>https://news.nweoo.com/</loc>
  <lastmod>2021-06-09T20:30:28+00:00</lastmod>
  <changefreq>daily</changefreq>
  <priority>1</priority>
</url>
<url>
  <loc>https://news.nweoo.com/videos</loc>
  <changefreq>daily</changefreq>
  <priority>1</priority>
  <lastmod>2021-06-09T20:30:28+00:00</lastmod>
</url>
<url>
  <loc>https://news.nweoo.com/reports</loc>
  <lastmod>2021-06-09T20:30:28+00:00</lastmod>
  <changefreq>daily</changefreq>
  <priority>1</priority>
</url>
<url>
  <loc>https://news.nweoo.com/about</loc>
  <lastmod>2021-05-09T17:53:28+00:00</lastmod>
  <priority>1</priority>
  <lastmod>2021-06-09T20:30:28+00:00</lastmod>
</url>`];
      Object.values(data).map(article => {
        responses.push(`<url>
  <loc>https://news.nweoo.com/articles/${article.id}</loc>
  <lastmod>${new Date(article.timestamp).toISOString()}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1</priority>
</url>`);
      });
      responses.push(`<url>
  <loc>https://news.nweoo.com/terms-of-services</loc>
  <lastmod>2021-05-09T17:53:28+00:00</lastmod>
</url>
<url>
  <loc>https://news.nweoo.com/privacy-policy</loc>
  <lastmod>2021-05-09T17:53:28+00:00</lastmod>
</url>`)
      responses.push('</urlset>');
      res.setHeader('content-type', 'application/xml;charset=utf-8');
      res.send(responses.join("\n"));
    }).catch((e) => res.json({
      error: e.message,
    }));
}
