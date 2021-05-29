# [NweOo](https://nweoo.com)

[![CI [Production]](https://github.com/etherio/nwe-oo-vue/actions/workflows/production.yml/badge.svg)](https://github.com/etherio/nwe-oo-vue/actions/workflows/production.yml)

## Database

You can access data from [api.nweoo.com (API)](https://api.nweoo.com) by issuing `GET` request to its URL endpoint.

### Infrastructure

We can access the data from [Firebase Realtime Database (RTDB)](https://firebase.google.com/docs/database/rest/retrieve-data) with [Firebase Admin SDK (Admin)](https://firebase.google.com/docs/database/admin/start) to retrieve an array of articles.

### Queries

As far as our database is from [Firebase](https://firebase.google.com/docs/database), use wildcard (symbol: "****", hex: <kbd>\uf8ff</kbd>).

#### Retrieving Data

```yml
swagger: '2.0'
info:
  title: NweOo API
host: https://api.nweoo.com
paths:
  '/news/article':
    parameters:
      - in: query
        name: limit
        schema:
          type: integer
          format: int32
          default: 10
          maximum: 100
      - in: query
        name: paging
        schema:
          type: string
          format: byte
    responses:
      200:
        content:
          - json
        json:
          type: array
          items:
            '$ref': '#/components/schemas/Article'
```

In this example, let's request the list of latest news articles.

```http
GET https://api.nweoo.com/news/articles HTTP/2
```

```http
HTTP/2 200 OK
Cache-Control; public, max-age=900, s-max-age=900
Content-Type: application/json; charset=utf-8

[{...},{...},{...},{...},{...},{...},{...},{...},{...},{...}]
```

