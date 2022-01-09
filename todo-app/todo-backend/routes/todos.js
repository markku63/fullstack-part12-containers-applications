const express = require('express');
const redis = require('../redis')
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const counter = Number(await redis.getAsync('count'))
  await redis.setAsync('count', counter + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (req.body && req.body.done !== undefined) {
    req.todo.done = req.body.done
    const newTodo = await req.todo.save()
    res.json(newTodo)
  } else {
    res.sendStatus(400)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
