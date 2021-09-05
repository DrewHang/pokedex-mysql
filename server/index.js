// TODO: Create an express server
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db')

const PORT = 1234;

const PATH_DIR = path.join(__dirname, '../client/dist')

app.use(express.json())
app.use(express.static(PATH_DIR))

app.listen(PORT, () => {
  console.log('App is listening to http://localhost:1234')
})

app.get('/getAll', (req, res) => {
  let sql = `SELECT pokemon.id, images.img, pokemon.name, types.type pokemon FROM pokemon JOIN \
  (types, images) ON (pokemon.typeNum = types.id AND pokemon.imageNum = images.id)`;

  db.query(sql, (err, result) => {
    if (err) {
      res.sendStatus(418)
    } else {
      res.send(result);
    }
  })
})

app.get('/filter/:type', (req, res) => {
  console.log(req.params.type)
  let sql = `SELECT pokemon.id, images.img, pokemon.name, types.type pokemon FROM pokemon JOIN \
  (types, images) ON (pokemon.typeNum = types.id AND pokemon.imageNum = images.id AND types.type = '${req.params.type}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send(result);
    }
  })
})

app.get('/type', (req, res) => {
  let sql = `SELECT type FROM types`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send(result);
    }
  })



})


app.put('/update/:id', (req, res) => {
  console.log(req.params.id)
  let sql = `UPDATE pokemon SET name = '${req.body.name}' WHERE id = '${req.params.id}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send('Name updated!');
    }
  })
})


app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id)
  let sql = `DELETE FROM pokemon WHERE id = '${req.params.id}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send('Pokemon Deleted!');
    }
  })
})


app.post('/addPokemon', (req, res) => {
  let sql = `INSERT INTO pokemon (name, typeNum, imageNum) VALUES ('${req.body.name}',(select id from types WHERE type='${req.body.type}'), (SELECT auto_increment FROM INFORMATION_SCHEMA.TABLES
  WHERE table_name = 'pokemon'))`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send('Pokemon Added!');
    }
  })
})


app.post('/addImage', (req, res) => {
  let sql = `INSERT INTO images (img) VALUES ('${req.body.imgUrl}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(418)
    } else {
      res.send('Pokemon Image Added!');
    }
  })
})


