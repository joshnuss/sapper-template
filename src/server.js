import sirv from 'sirv'
import polka from 'polka'
import send from '@polka/send-type'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

function sendMiddleware(req, res, next) {
  res.send = send.bind(null, res)
  next()
}

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sendMiddleware,
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
