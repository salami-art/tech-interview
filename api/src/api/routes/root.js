const express = require('express');
const root = require('../services/rootService');

const router = new express.Router();


/**
 * Default operation to redirect to the UI index page.
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await root.redirectUsers(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
