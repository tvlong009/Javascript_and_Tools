import jwt from 'jsonwebtoken'
import User from '../models/user'

export default function (app) {
  app.post('/register', (req, res) => {
    req.assert('username', 'required').notEmpty()
    req.assert('name', 'required').notEmpty()
    req.assert('password', '6 to 20 characters required').len(6, 20)

    const errors = req.validationErrors()
    if (errors) {
      return res.status(400).json({success: false, error: errors})
    }

    const user = new User({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      balance: 1000000
    })

    user.save((err) => {
      if (err) {
        if (err.code == 11000) {
          return res.status(400).json({
            success: false,
            error: {
              param: 'username',
              msg: 'not available'
            }
          })
        }
        else {
          console.error(err)

          return res.status(500).json({
            success: false,
            error: 'Server error'
          })
        }
      }
      res.json({success: true})
    })
  })

  app.post('/authenticate', (req, res) => {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) throw err

      if (!user) {
        res.json({success: false, message: 'Authentication failed. User not found.'})
      }
      else if (user) {
        if (user.password != req.body.password) {
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        }
        else {
          const {username, name} = user
          const token = jwt.sign({username, name}, app.get('superSecret'), {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          })

          res.json({
            success: true,
            message: 'Enjoy your token!',
            user,
            token
          })
        }
      }
    })
  })
}
