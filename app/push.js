const WebSocketServer = require('websocket').server
const http = require('http')

const server = http.createServer().listen(8080, () => {
    console.log(`Server is listening on port ${8080}`)
})

const wss = new WebSocketServer({ httpServer: server })

const peers = []

wss.on('request', (req) => {
    const connection = req.accept(null, req.origin)

    connection.on('message', (message) => {
        peers.forEach(c => c.send(`User ${c.socket.remotePort} says: ${message.utf8Data}`))      
    })

    peers.push(connection)

    peers.forEach(c => c.send(`User ${c.socket.remotePort} connected !!`))
})
