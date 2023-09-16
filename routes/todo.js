const express = require('express');
const { body } = require('express-validator/check');

const todoController = require('../controllers/todo');
const isLogin = require('../middleware/isLogin');

const router = express.Router();

router.get('/list', isLogin, todoController.getTodoList);

router.post(
  '/create',
  isLogin,
  [body('title').trim().isLength({ min: 1 })],
  todoController.createTodo
);

router.put(
  '/:todoId',
  isLogin,
  [body('title').trim().isLength({ min: 1 })],
  todoController.updateTodo
);

router.delete('/:todoId', isLogin, todoController.deleteTodo);

module.exports = router;
