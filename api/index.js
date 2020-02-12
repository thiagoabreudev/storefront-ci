const express = require('express');
const github = require('./github');
const router = express.Router();


router.post('/generate', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'name is required!' })
  }
  try {
    const result = await github.generate(req.body);
    return res.send(result.data)
  } catch (error) {
    return res.send(error)
  }

})

module.exports = router