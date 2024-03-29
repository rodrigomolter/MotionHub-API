import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const db = new DatabaseMemory()

server.get('/videos', (req) => {
  const search = req.query.search
  return db.list(search)
})

server.post('/videos', (req, res) => {
  const {title, description, duration} = req.body
  db.create({
    title,
    description,
    duration
  })
  return res.status(201).send()
})

server.put('/videos/:id', (req, res) => {
  const {title, description, duration} = req.body
  db.update(req.params.id, {
    title,
    description,
    duration
  })
  return res.status(204).send()
})

server.delete('/videos/:id', (req, res) => {
  db.delete(req.params.id)
  return res.status(204).send()
})

server.listen({
  port: 3333
})

