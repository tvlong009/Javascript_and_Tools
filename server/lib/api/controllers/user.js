import shared from '../../core/shared'
import User from '../models/user'

export default function (app) {
  app.get('/users', (req, res) => {
    User.find({}, '-_id username name balance', (err, users) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          success: false, error: 'Server error'
        })
      }
      res.json(users)
    })
  })

  app.post('/buy', (req, res) => {
    req.assert('code', 'required').notEmpty()
    req.assert('quantity', 'required').notEmpty()
    req.assert('quantity', 'must be integer and greater than zero').isInt().gte(0)

    const errors = req.validationErrors()
    if (errors) {
      return res.status(400).json({success: false, error: errors})
    }

    let {code, quantity} = req.body
    quantity = parseInt(quantity)

    const user = req.user

    if (!shared.stockCodes.includes(code)) {
      return res.status(400).json({
        success: false,
        error: {
          param: 'code', msg: 'not supported'
        }
      })
    }

    const price = shared.getPrice(code)

    if (price * quantity > user.balance) {
      return res.status(400).json({
        success: false,
        error: {
          param: 'quantity', msg: 'not enough balance'
        }
      })
    }

    let found = false
    for (const stock of user.stocks) {
      if (stock.code === code) {
        stock.quantity += quantity
        found = true
        break
      }
    }

    if (!found) {
      user.stocks.push({code: req.body.code, quantity: req.body.quantity})
    }
    
    user.balance = user.balance - price * quantity
    user.save((err) => {
      if (err) {
        console.error(err)

        return res.status(500).json({
          success: false,
          error: 'Server error'
        })
      }
      return res.json({success: true, user: {balance: user.balance, stocks: user.stocks}})
    })
  })

  app.post('/sell', (req, res) => {
    req.assert('code', 'required').notEmpty()
    req.assert('quantity', 'required').notEmpty()
    req.assert('quantity', 'must be integer and greater than zero').isInt().gte(0)

    const errors = req.validationErrors()
    if (errors) {
      return res.status(400).json({success: false, error: errors})
    }

    let {code, quantity} = req.body
    quantity = parseInt(quantity)

    const user = req.user

    if (!shared.stockCodes.includes(code)) {
      return res.status(400).json({
        success: false,
        error: {
          param: 'code', msg: 'not supported'
        }
      })
    }

    let foundStock
    for (const stock of user.stocks) {
      if (stock.code === code) {
        foundStock = stock
        break
      }
    }

    if (!foundStock) {
      return res.status(400).json({
        success: false,
        error: {
          param: 'code', msg: 'not have this stock'
        }
      })
    }

    if (foundStock.quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: {
          param: 'quantity', msg: 'not enough quantity'
        }
      })
    }

    const price = shared.getPrice(code)

    foundStock.quantity = foundStock.quantity - quantity
    user.balance = user.balance + (quantity * price)
    if (foundStock.quantity === 0) {
      user.stocks.splice(user.stocks.indexOf(foundStock), 1)
    }
    user.save((err) => {
      if (err) {
        console.error(err)

        return res.status(500).json({
          success: false,
          error: 'Server error'
        })
      }
      return res.json({success: true, user: {balance: user.balance, stocks: user.stocks}})
    })
  })
}
