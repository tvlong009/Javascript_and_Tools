import authenticate from './middleware/authenticate'
import auth from './controllers/auth'
import user from './controllers/user'

export default function (app) {
  auth(app)
  authenticate(app)
  user(app)
}
