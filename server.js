const cds = require('@sap/cds')
const graphql = require('@cap-js/graphql')

cds.on('serving', (service) => {
  if (service.name === 'CatalogService') {
    const provider = (entity) => {
      if (entity) return
      return { href: 'graphql', name: 'GraphQl', title: 'GraphQL' }
    }
    service.$linkProviders
      ? service.$linkProviders.push(provider)
      : (service.$linkProviders = [provider])
  }
})
// cds.once('bootstrap', (app) => {
//   app.serve('/graphql').from('@cap-js/graphql', 'app/graphql.html')
// })

module.exports = cds.server
