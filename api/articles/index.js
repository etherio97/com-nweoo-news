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
          let title = data.title + ' - ' + data.source;
          let tags = document.querySelectorAll('meta');
          let image = 'https://api.nweoo.com/open?url=' + encodeURIComponent(data.image);
          let meta = {
            'twitter:image': image,
            'twitter:url': url + '/articles/' + data.id,
            'twitter:description': content[0],
            'twitter:title': title,
            'twitter:card': 'summary_large_image',
            'og:image:alt': data.title,
            'og:image': image,
            'og:url': url + '/articles/' + data.id,
            'og:description': content[0],
            'og:title': title,
            'og:type': 'article',
            description: content[0],
            title,
          };
          let ld = {
            '@schema': 'https://schema.org',
            '@type': 'Article',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url + '/articles/' + data.id,
            },
            headline: data.title,
            description: content[0],
            image: {
              "@type": "ImageObject",
              url: data.image,
            },
            author: {
              "@type": "Organization",
              name: data.source,
            },
            publisher: {
              "@type": "Organization",
              name: data.source,
              logo: {
                '@type': "ImageObject",
                url: url + '/assets/images/logo/' + data.source.toLowerCase() + '.png'
              },
            },
            dateModified: datetime.toISOString(),
            datePublished: datetime.toISOString(),
          };
          let script = document.createElement('script');
          script.innerHTML = 'window.article=' + JSON.stringify(data) + ';';
          document.head.append(script);
          document.querySelector('title').textContent = title + ' | NweOo';
          for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            let name = tag.getAttribute('title');
            let prop = tag.getAttribute('property');
            if ((prop || name || '') in meta) {
              name && tag.setAttribute('name', name);
              prop && tag.setAttribute('property', prop);
              tag.setAttribute('content', meta[prop || name || '']);
              delete meta[prop];
            }
          }
          for (let entry of Object.entries(meta)) {
            let el = document.createElement('meta');
            el.setAttribute('name', entry[0]);
            el.setAttribute('property', entry[0]);
            el.setAttribute('content', entry[1]);
            document.head.prepend(el);
          }
          let el = document.querySelector('script#ld');
          if (el) {
            el.innerHTML = JSON.stringify(ld);
          } else {
            let rrt = document.createElement('script');
            rrt.type = 'application/ld+json';
            rrt.innerHTML = JSON.stringify(ld);
            document.head.prepend(rrt);
          }
          res.send('<!DOCTYPE html>' + document.querySelector('html').outerHTML);
        })
        .catch(e => {
          let script = document.createElement('script');
          script.innerHTML = 'console.warn(' + JSON.stringify(e.message) + ');';
          document.body.prepend(script);
          res.status(404).send('<!DOCTYPE html>' + document.querySelector('html').outerHTML);
        })
    );
};
