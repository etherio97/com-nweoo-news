const e=require('express')
const a=e()

a.use((req, res, next) => console.log(req.path) || next())

a.use(e.static(__dirname + '/dist'))

a.listen(8080)
