/* eslint-disable no-undef */
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT
app.use(cors())
app.use(express.static('build'))

app.use(express.json()) // access the data with json parser
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
// custom token
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms  :body '))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  console.log(`Phonebook has info for ${persons.length} people`)
  response.send(`<div>Phonebook has info for ${persons.length} people</div>
  <div>${date}</div>`)
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(request.body)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }
  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const info = request.body

  const person = {
    name: info.name,
    number: info.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
