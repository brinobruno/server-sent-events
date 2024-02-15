import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'

const app = fastify()

const CORS = {
  origin: '*',
  methods: 'GET',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: 'Authorization'
}

app.register(cors, CORS)

const ratesRoute = (_request: FastifyRequest, reply: FastifyReply) => {
  reply.headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })

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