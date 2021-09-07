// TODO: Create an express server
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const db = require('./db')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const PUBLIC_DIR = path.join(__dirname, '../client/dist')

app.use(express.static(PUBLIC_DIR))

const PORT = 2222;

app.listen(PORT, () => {
  console.log('App is listening on http://localhost:2222')
})


// Get All Pokemons with types, name and image
app.get('/pokemons', (req, res) => {
  let sql = `SELECT p.id, types.type, images.img, p.name FROM pokemon AS p JOIN (images, types) \
  ON (p.typeNum = types.id AND p.imageNum = images.id)`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(418)
    } else {
      res.send(result)
    }
  })
})

//Get Pokemon by type
app.get('/pokemons/:type', (req, res) => {
  let sql = `SELECT p.id, types.type, images.img, p.name FROM pokemon AS p JOIN (images, types) \
  ON (p.typeNum = types.id AND p.imageNum = images.id AND types.type = '${req.params.type}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(418)
    } else {
      res.send(result)
    }
  })
})

app.get('/types', (req, res) => {
  let sql = `SELECT type FROM types`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(418)
    } else {
      res.send(result)
    }
  })
})

app.put('/update/:id', (req, res) => {
  let sql = `UPDATE pokemon SET name = '${req.body.name}' WHERE id = '${req.params.id}' `
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(418)
    } else {
      res.send('Pokemon name updated!')
    }
  })
})

app.delete('/pokemons/:id', (req, res) => {
  let sql = `DELETE pokemon, images FROM pokemon INNER JOIN images ON pokemon.imageNum = images.id WHERE pokemon.id = '${req.params.id}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(418)
    } else {
      res.send('Pokemon Deleted!')
    }
  })
})