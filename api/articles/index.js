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
          let title = data.title + ' | NweOo';
          let tags = document.querySelectorAll('meta');
          let meta = {
            'og:image:alt': data.title,
            'og:image': data.image,
            'og:url': `https://www.nweoo.com/articles/${data.id}`,
            'og:description': description,
            'og:title': title,
            'og:type': 'article',
            description,
            title,
          };
          let ld = {
            '@schema': 'https://schema.org',
            '@type': 'NewsArticle',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url + '/articles/' + id,
            },
            name: title,
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
          document.querySelector('script[type=application*]')?.remove();
          let script = document.createElement('script');
          script.type = 'application/ld+json';
          script.innerHTML = JSON.stringify(ld);
          for (let entry of Object.entries(meta)) {
            let el = document.createElement('meta');
            el.setAttribute('name', entry[0]);
            el.setAttribute('property', entry[0]);
            el.setAttribute('content', entry[1]);
            document.head.prepend(el);
          }
          for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            let prop = tag.getAttribute('property') || tag.name;
            (prop in meta) && tag.remove();
          }
          document.head.prepend(script);
          res.send('<!DOCTYPE html>' + document.querySelector('html').innerHTML);
        })
        .catch(e => {
          res.status(404).send('<!DOCTYPE html>' + document.querySelector('html').innerHTML);
        })
    );
};
