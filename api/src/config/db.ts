import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { connect } from 'mongoose'
import Flashcard from '../models/flashcard'

const models = { Flashcard }
const uri = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/flashcards'

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  try {
    await (await connect(uri))

    fastify.decorate('db', { models })
  } catch (err) {
    console.error(err)
    throw err
  }
})