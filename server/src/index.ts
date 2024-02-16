import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import { CORS } from './utils'

const app = fastify()

app.register(cors, CORS)

const ratesRoute = (_request: FastifyRequest, reply: FastifyReply) => {
  reply.raw.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // The following are vital for SSE to work as expected
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  })

  // flush the headers to establish SSE with client
  reply.raw.flushHeaders() 

  const interval = setInterval(() => {
    const stock1Rate = Math.floor(Math.random() * 100000)
    const stock2Rate = Math.floor(Math.random() * 60000)

    reply.raw.write(`data: ${JSON.stringify({ stock1Rate, stock2Rate })}\n\n`)
  }, 2000)

  reply.raw.on('close', () => {
    clearInterval(interval)
    reply.raw.end()
  })
}

app.get('/rates', ratesRoute)

app.listen({ port: 3000 }, (err, address) => {
  if (err) console.error(err)
  console.log(`app listening at ${address}`)
})