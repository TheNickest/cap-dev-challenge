const cds = require('@sap/cds')
const { Books } = cds.entities('sap.capire.bookshop')

class CatalogService extends cds.ApplicationService {
  async init() {
    // plugin services
    const audit = await cds.connect.to('audit-log')
    const alert = await cds.connect.to('notifications')

    // Reduce stock of ordered books if available stock suffices
    this.on('submitOrder', async (req) => {
      const { book, quantity } = req.data
      let { stock } = await SELECT`stock`.from(Books, book)
      if (stock >= quantity) {
        await UPDATE(Books, book).with(`stock -=`, quantity)
        await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
        await audit.log('DevChallenge', { description: 'Submit Order' })
        return { stock }
      } else
        return req.error(409, `${quantity} exceeds stock for book #${book}`)
    })

    // Add some discount for overstocked books
    this.after('READ', 'ListOfBooks', (each) => {
      if (each.stock > 111) {
        each.title += ` -- 11% discount!`

        alert.notify('ListOfBooksRead', {
          recipients: ['dev1@feb-challenge.com', 'dev2@feb-challenge.com'],
          type: 'ListOfBooksRead',
          priority: 'NEUTRAL',
          data: {
            ID: each.ID,
            user: cds.context.user.id,
            title: each.title,
            stock: each.stock,
          },
        })
      }
    })

    return super.init()
  }
}

module.exports = { CatalogService }
