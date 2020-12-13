const express = require('express');
const { static } = express;
const path = require('path');
const { syncAndSeed } = require('./server/db/index');

// const db = require('./server/db/db');
const List = require('./server/db/list');
const Reminder = require('./server/db/reminder');

const app = express();

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('method-override')('_method'));

app.use('/dist', static(path.join(__dirname, 'dist')));

app.use('/public', static(path.join(__dirname, 'public')));

app.use('/client', static(path.join(__dirname, 'client')));

// app.use('./server/api', require('./server/api'))

// app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

app.get('/api/lists', async(req, res, next) => {
  try {
    res.send(await List.findAll({
      include: [
        Reminder
      ]
    }));
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/api/lists/:id', async(req, res, next) => {
  try{
    const reminder = await Reminder.findAll({
      where: {
        listId: req.params.id
      }
    })
    res.send(reminder);
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/api/lists/:id/active', async(req, res, next) => {
  try{
    const reminder = await Reminder.findAll({
      where: {
        listId: req.params.id,
        completed: 'false'
      }
    })
    res.send(reminder);
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/api/lists/:id/completed', async(req, res, next) => {
  try{
    const reminder = await Reminder.findAll({
      where: {
        listId: req.params.id,
        completed: 'true'
      }
    })
    res.send(reminder);
  }
  catch(ex) {
    next(ex)
  }
})

app.delete('/api/lists/:id', async(req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id);
    await list.destroy();
    res.redirect('/');
  }
  catch(ex) {
    next(ex)
  }
})

// deleting a LIST
app.delete('/api/lists/:id', async(req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id);
    await list.destroy();
    res.redirect('/#');
  }
  catch(ex) {
    next(ex)
  }
})

// deleting a REMINDER
app.delete('/api/lists/:id/:reminderId', async(req, res, next) => {
  try {
    const reminder = await Reminder.findByPk(req.params.reminderId);
    await reminder.destroy();
    res.redirect(`/#${ req.params.id }`);
    // res.send(req.params)
  }
  catch(ex) {
    next(ex)
  }
})

//posting a LIST
app.post('/api/lists', async(req, res, next) => {
  try {
    const list = await List.create(req.body);
    res.redirect('/#');
  }
  catch(ex) {
    next(ex)
  }

})

//posting a REMINDER
app.post('/api/lists/:id', async(req, res, next) => {
  try {
    const list = await Reminder.create({
      name: req.body.name,
      listId: req.params.id
    });
    res.redirect(`/#${ req.params.id }`);
  }
  catch(ex) {
    next(ex)
  }

})


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