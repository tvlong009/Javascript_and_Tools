import jwt from 'jsonwebtoken'
import User from '../models/user'

export default function (app) {
  app.use((req, res, next) => {
    const token = req.headers['authorization']

    if (token) {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          console.error(err)

          return res
            .status(404)
            .json({success: false, message: 'Failed to authenticate token'})
        }
        else {
          const username = decoded.username
          User.findOne({username}, (err, user) => {
            if (err || !user) {
              console.error(err)

              return res
                .status(404)
                .json({success: false, message: 'Failed to authenticate token'})
            }
            req.user = user
            next()
          })
        }
      })
    }
    else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  })
}
