import StockServer from 'fake-stock-server'
import shared from './core/shared'
import ApiServer from './api/server'

const wsPort = process.env.WS_PORT || 8080
const stockServer = new StockServer(wsPort, shared.stockCodes)
stockServer.start()
console.log(`Start websocket server at port: ${wsPort}`)

shared.getPrice = ::stockServer.getPrice

const apiPort = process.env.PORT || 8081
const apiServer = new ApiServer(apiPort)
apiServer.start()
console.log(`Start API server at port: ${apiPort}`)
