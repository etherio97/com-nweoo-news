const ejs = require('ejs');
const { readFileSync } = require('fs');
const { default: axios } = require('axios');


module.exports = (req, res) => {
  const { id } = req.query;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const url = proto + '://' + host;
  axios('https://nweoo-developer.herokuapp.com/news/articles/' + id)
    .then(({ data }) => {
      let title = data.title + ' - ' + data.source;
      let datetime = new Date(data.timestamp);
      let contents = data.content.split('\n').filter(n => !!n);
      let ld = {
        '@schema': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url + '/articles/' + id,
        },
        name: title,
        headline: data.title,
        description: contents[0],
        image: data.image,
        url: data.link,
        author: {
          "@type": "Organization",
          name: data.source,
        },
        publisher: {
          "@type": "Organization",
          name: data.source,
          logo: {
            '@type': "ImageObject",
            url: '/assets/images/logo/' + data.source.toLowerCase() + '.png'
          }
        },
        articleBody: contents.join('\n\n'),
        creditText: 'Originally published from ' + data.source + ' at ' + data.link,
        dateCreated: datetime.toISOString(),
        dateModified: datetime.toISOString(),
        datePublished: datetime.toISOString(),
        inLanguage: 'my-MM',
      };
      ejs.renderFile(__dirname + '/amp.ejs', {
        ...data,
        title,
        contents,
        url: url + '/articles/' + data.id,
        description: contents[0],
        content: contents.join('\n\n'),
        ld,
      }).then((html) => res.send(html))
        .catch(e => {
          console.error(e.response?.data || e.message);
          res.status(500);
          res.end();
        });
    })
    .catch((e) => {
      console.error(e.response?.data || e.message);
      res.status(404);
      res.end();
    });
};
