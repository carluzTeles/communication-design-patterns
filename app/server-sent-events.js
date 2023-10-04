const http = require('http')

// Client code 
// let sse = new EventSource('http://localhost:8080/stream')
// sse.onmessage = console.log

const server = http.createServer().listen(8080, () => {
    console.log(`Server is listening on port ${8080}`)
})

server.on('request', (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/stream' && req.method === 'GET') {
        res.setHeader("Content-Type", "text/event-stream");

        send(res)
    }

    res.end('Hello')
})

let i = 0

function send(res) {
    res.write("data: " + `hello from server ------- [${i++}]\n\n`)

    this.setTimeout(() => {
        send(res)
    }, 1000);
}