# NweOo | နွေဦး

[![CI [Production]](https://github.com/etherio/nwe-oo-vue/actions/workflows/production.yml/badge.svg)](https://github.com/etherio/nwe-oo-vue/actions/workflows/production.yml)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###  Firebase Realtime Database [Queries]

#### Range Queries

`startAt`, `endAt`, and `equalTo`

```js
db.ref('...').orderByKey().startAt("abc_\uf8ff").get().then(...);
```
