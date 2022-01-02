const express = require('express');
const users = require('../services/userService');

const router = new express.Router();


/**
 * The list of users can be filtered by their status.
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await users.listUsers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a user
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.createUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a user
 */
router.put('/:userId', async (req, res, next) => {
  const options = {
    body: req.body,
    userId: req.params['userId']
  };

  try {
    const result = await users.updateUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete the user
 * 
 */
router.delete('/:userId', async (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = await users.deleteUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
