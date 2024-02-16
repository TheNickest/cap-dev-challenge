const cds = require('@sap/cds')

cds.on('serving', (service) => {
  if (service.name === 'CatalogService') {
    console.log(service.endpoints[1]?.path)
    return service.endpoints[1]?.path
  }
})
cds.once('bootstrap', (app) => {
  app.serve('/graphql').from('@cap-js/graphql', 'app/graphql.html')
})
