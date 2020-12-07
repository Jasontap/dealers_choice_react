const express = require('express');
const { static } = express;
const path = require('path');
const { syncAndSeed } = require('./server/db/index');

// const db = require('./server/db/db');
const List = require('./server/db/list');
const Reminder = require('./server/db/reminder');

const app = express();

app.use('/dist', static(path.join(__dirname, 'dist')));

app.use('/public', static(path.join(__dirname, 'public')));

app.use('/client', static(path.join(__dirname, 'client')));

app.use('./server/api', require('./server/api'))

// app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

// app.get('/api/lists', async(req, res, next) => {
//   try {
//     res.send(await List.findAll({
//       include: [
//         Reminder
//       ]
//     }));
//   }
//   catch(ex) {
//     next(ex)
//   }
// })

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 1337;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
}


init()