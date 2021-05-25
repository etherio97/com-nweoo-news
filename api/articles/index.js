const { default: axios } = require('axios');
const { JSDOM } = require('jsdom');

module.exports = (req, res) => {
  const { id } = req.query;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const url = proto + '://' + host;
  axios(url)
    .then(({ data }) => new JSDOM(data))
    .then(({ window: { document } }) =>
      axios('https://api.nweoo.com/news/articles/' + id)
        .then(({ data }) => {
          let datetime = new Date(data.timestamp);
          let content = data.content.split("\n").filter(n => !!n);
          let ld = {
            '@schema': 'https://schema.org',
            '@type': 'NewsArticle',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url + '/articles/' + id,
            },
            headline: data.title,
            description: content[0],
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
            articleBody: content.join('\n\n'),
            creditText: 'Originally published from ' + data.source + ' at ' + data.link,
            dateCreated: datetime.toISOString(),
            dateModified: datetime.toISOString(),
            datePublished: datetime.toISOString(),
            inLanguage: 'my-MM',
          };
          let web = document.querySelector('script[type=application*]');
          let script = document.createElement('script');
          script.type = 'application/ld+json';
          script.innerHTML = JSON.stringify(ld);
          document.head.prepend(script);
          res.send('<!DOCTYPE html>' + document.querySelector('html').innerHTML);
        })
        .catch(e => {
          res.status(404).send('<!DOCTYPE html>' + document.querySelector('html').innerHTML);
        })
    );
};
