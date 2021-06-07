const { default: axios } = require("axios")

module.exports = (req, res) => {
  axios('https://nweoo-developer.herokuapp.com/news/articles?limit=15&title=id,timestamp')
    .then(({ data }) => {
      const responses = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
      ];

      Object.values(data).forEach(article => {
        responses.push(`<url>
  <loc>https://www.nweoo.com/articles/${article.id}</loc>
  <lastmod>${new Date(article.timestamp).toISOString()}</lastmod>
</url>`);
      });

      responses.push('</urlset>');
      res.send(responses.join("\n"));
    }).catch((e) => res.json({
      error: e.message,
    }));
}
