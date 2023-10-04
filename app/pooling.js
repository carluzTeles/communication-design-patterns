const { randomUUID } = require('crypto')
const http = require('http')

const server = http.createServer().listen(8080, () => {
    console.log(`Server is listening on port ${8080}`)
})

const jobs = {}

server.on('request', (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)

    if(req.method === 'POST' && url.pathname === '/submit') {
        const jobId = `job:${randomUUID()}`

        updateJob(jobId, 0)

        res.end(jobId)
    }

    if(req.method === 'GET' && url.pathname === '/status') {
        const jobId = url.searchParams.get('id')
    
        res.end(`Job Status: ${jobs[jobId]}`)
    }
})


function updateJob(jobId, initialPrg) {
    jobs[jobId] = initialPrg

    if(jobs.jobId === 100) {
        return
    }

    this.setTimeout(() => updateJob(jobId, initialPrg + 10), 10000)
}
