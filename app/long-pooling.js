const { randomUUID } = require('crypto')
const http = require('http')
const { resolve } = require('path')

const server = http.createServer().listen(8080, () => {
    console.log(`Server is listening on port ${8080}`)
})

const jobs = {}

server.on('request', async(req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)

    if(req.method === 'POST' && url.pathname === '/submit') {
        const jobId = `job:${randomUUID()}`

        updateJob(jobId, 0)

        res.end(jobId)
    }

    if(req.method === 'GET' && url.pathname === '/status') {
        const jobId = url.searchParams.get('id')
    
        while(await checkJobComplete(jobId) == false);

        res.end(`Job Status: ${jobs[jobId]}`)
    }
})

async function checkJobComplete(jobId) {
    return new Promise(() => {
        if(jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 1000)
        else
            resolve(true)
    })
}

function updateJob(jobId, initialPrg) {
    jobs[jobId] = initialPrg

    console.log(initialPrg)

    if(jobs.jobId === 100) {
        return
    }

    this.setTimeout(() => updateJob(jobId, initialPrg + 10), 1000)
}
