const { validationResult } = require('express-validator/check');

const Todo = require('../models/todo');
const User = require('../models/user');

exports.getTodoList = (req, res, next) => {
  User.findById(req.userId)
    .populate('todolist')
    .lean()
    .then(user => {
      res.status(200).json({
        todos: user.todolist,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  const todo = new Todo({
    title: req.body.title,
    checked: false,
    owner: req.userId,
  });

  todo
    .save()
    .then(result => {
      User.findById(req.userId).then(user => {
        user.todolist.push(result._id);
        return user.save();
      });
    })
    .then(() => {
      res.status(201).json({
        message: 'created successfully!',
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  const todoId = req.params.todoId;
  const title = req.body.title;
  const checked = Boolean(req.body.checked);

  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        const error = new Error('No this todo');
        error.statusCode = 404;
        throw error;
      }
      if (todo.owner.toHexString() !== req.userId) {
        const error = new Error('Wrong user');
        error.statusCode = 403;
        throw error;
      }

      todo.title = title;
      todo.checked = checked;
      return todo.save();
    })
    .then(() => {
      res.status(200).json({ message: 'updated successfully!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        const error = new Error('No this todo');
        error.statusCode = 404;
        throw error;
      }
      if (todo.owner.toHexString() !== req.userId) {
        const error = new Error('Wrong user');
        error.statusCode = 403;
        throw error;
      }

      return Todo.findByIdAndRemove(todoId);
    })
    .then(() => {
      res.status(200).json({ message: 'deleted successfully!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
